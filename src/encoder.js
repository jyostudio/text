import overload from "@jyostudio/overload";
import List from "@jyostudio/list";
import EncoderFallback from "./encoderFallback.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class Encoder {
    #fallback;

    #fallbackBuffer;

    get internalHasFallbackBuffer() {
        return !!this.#fallbackBuffer;
    }

    get fallbackBuffer() {
        if (!this.#fallbackBuffer) {
            if (this.#fallback) {
                this.#fallbackBuffer = this.#fallback.createFallbackBuffer();
            } else {
                this.#fallbackBuffer = EncoderFallback.replacementFallback.createFallbackBuffer();
            }
        }

        return this.#fallbackBuffer;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        Encoder[CONSTURCTOR_SYMBOL] = overload([], function () { });

        return Encoder[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        if (new.target === Encoder) {
            throw new TypeError("Cannot construct Encoder instances directly");
        }

        Object.defineProperties(this, {
            fallback: {
                get: () => this.#fallback,
                set: overload([EncoderFallback], value => {
                    if (!value) {
                        throw new TypeError("value cannot be null");
                    }

                    if (this.#fallbackBuffer?.remaining > 0) {
                        throw new Error("A fallback buffer is active.");
                    }

                    this.#fallback = value;
                    this.#fallbackBuffer = null;
                })
            }
        });

        return Encoder[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    reset(...params) {
        Encoder.prototype.reset = overload([], function () {
            let byteTemp = [];
            let charTemp = new Array(this.getCharCount(byteTemp, 0, 0, true));
            this.getChars(byteTemp, 0, 0, charTemp, 0, true);
            if (this.#fallbackBuffer) {
                this.#fallbackBuffer.reset();
            }
        });

        return this.reset.apply(this, params);
    }

    getByteCount(...params) {
        Encoder.prototype.getByteCount = overload()
            .add([[Array, List.T(String)], Number, Number, Boolean], function (chars, index, count, flush) {
                throw new Error("Not implemented");
            })
            .add([String, Number, Boolean], function (chars, count, flush) {
                if (count < 0) {
                    throw new RangeError("count is less than 0.");
                }

                let charArray = new Array(count);
                for (let i = 0; i < count; i++) {
                    charArray[i] = chars[i];
                }
                return this.getByteCount(charArray, 0, count, flush);
            });

        return this.getByteCount.apply(this, params);
    }

    getBytes(...params) {
        Encoder.prototype.getBytes = overload()
            .add([[Array, List.T(String)], Number, Number, Uint8Array, Number, Boolean], function (chars, charIndex, charCount, bytes, byteIndex, flush) {
                throw new Error("Not implemented");
            })
            .add([String, Number, Uint8Array, Number, Boolean], function (chars, charCount, bytes, byteCount, flush) {
                if (charCount < 0 || byteCount < 0) {
                    throw new RangeError("charCount or byteCount is less than 0.");
                }

                let charArray = new Array(charCount);
                for (let i = 0; i < charCount; i++) {
                    charArray[i] = chars[i];
                }
                let byteArray = new Uint8Array(byteCount);
                let result = this.getBytes(charArray, 0, charCount, byteArray, 0, flush);
                if (result < byteCount) byteCount = result;
                for (let i = 0; i < byteCount; i++) {
                    bytes[i] = byteArray[i];
                }
                return byteCount;
            });

        return this.getBytes.apply(this, params);
    }

    convert(...params) {
        Encoder.prototype.convert = overload()
            .add([[Array, List.T(String)], Number, Number, Uint8Array, Number, Number, Boolean, Object], function (chars, charIndex, charCount, bytes, byteIndex, byteCount, flush, obj) {
                if (charIndex < 0 || charCount < 0) {
                    throw new Error("charIndex or charCount is less than 0.");
                }

                if (byteIndex < 0 || byteCount < 0) {
                    throw new Error("byteIndex or byteCount is less than 0.");
                }

                if (chars.length - charIndex < charCount) {
                    throw new Error("The number of elements from charIndex to the end of the array is less than charCount.");
                }

                if (bytes.length - byteIndex < byteCount) {
                    throw new Error("The number of elements from byteIndex to the end of the array is less than byteCount.");
                }

                obj.charsUsed = charCount;

                while (obj.charsUsed > 0) {
                    if (this.getByteCount(chars, charIndex, obj.charsUsed, flush) <= byteCount) {
                        obj.bytesUsed = this.getBytes(chars, charIndex, obj.charsUsed, bytes, byteIndex, flush);
                        obj.completed = (obj.charsUsed == charCount &&
                            (this.#fallbackBuffer == null || this.#fallbackBuffer.remaining == 0));
                        return;
                    }

                    flush = false;
                    obj.charsUsed /= 2;
                }

                throw new Error("Insufficient space to encode charCount characters.");
            })
            .add([String, Number, Uint8Array, Number, Number, Boolean, Object], function (chars, charCount, bytes, byteIndex, byteCount, flush, obj) {
                if (charCount < 0) {
                    throw new RangeError("charCount is less than 0.");
                }

                let charArray = new Array(charCount);
                for (let i = 0; i < charCount; i++) {
                    charArray[i] = chars[i];
                }

                return this.convert(charArray, 0, charCount, bytes, byteIndex, byteCount, flush, obj);
            });

        return Encoder.prototype.convert.call(this, ...params);
    }
}