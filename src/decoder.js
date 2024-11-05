import overload from "@jyostudio/overload";
import DecoderFallback from "./decoderFallback.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class Decoder {
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
                this.#fallbackBuffer = DecoderFallback.replacementFallback.createFallbackBuffer();
            }
        }

        return this.#fallbackBuffer;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        Decoder[CONSTURCTOR_SYMBOL] = overload([], function () { });

        return Decoder[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        if (new.target === Decoder) {
            throw new TypeError("Cannot construct Decoder instances directly");
        }

        Object.defineProperties(this, {
            fallback: {
                get: () => this.#fallback,
                set: overload([DecoderFallback], value => {
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

        return Decoder[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    reset(...params) {
        Decoder.prototype.reset = overload([], function () {
            let byteTemp = [];
            let charTemp = new Array(this.getCharCount(byteTemp, 0, 0, true));
            this.getChars(byteTemp, 0, 0, charTemp, 0, true);
            this.#fallbackBuffer?.reset();
        });

        return Decoder.prototype.reset.apply(this, params);
    }

    getCharCount(...params) {
        Decoder.prototype.getCharCount = overload()
            .add([Uint8Array, Number, Number], function (bytes, index, count) {
                return this.fallback.encoding.getCharCount(bytes, index, count);
            })
            .add([Uint8Array, Number, Number, Boolean], function (bytes, index, count, flush) {
                return this.getCharCount(bytes, index, count);
            })
            .add([Uint8Array, Number, Boolean], function (bytes, count, flush) {
                if (count < 0) {
                    throw new RangeError("count is less than 0.");
                }

                let arrbyte = new Array(count);
                let index;

                for (index = 0; index < count; index++) {
                    arrbyte[index] = bytes[index];
                }

                return this.getCharCount(arrbyte, 0, count);
            });

        return Decoder.prototype.getCharCount.apply(this, params);
    }

    getChars(...params) {
        Decoder.prototype.getChars = overload()
            .add([Uint8Array, Number, Number, String, Number], function (bytes, byteIndex, byteCount, chars, charIndex) {
                return this.fallback.encoding.getChars(bytes, byteIndex, byteCount, chars, charIndex);
            })
            .add([Uint8Array, Number, Number, String, Number, Boolean], function (bytes, byteIndex, byteCount, chars, charIndex, flush) {
                return this.getChars(bytes, byteIndex, byteCount, chars, charIndex);
            })
            .add([Uint8Array, Number, String, Number, Boolean], function (bytes, byteCount, chars, charCount, flush) {
                if (byteCount < 0 || charCount < 0) {
                    throw new RangeError(`${byteCount < 0 ? "byteCount" : "charCount"} is less than 0.`);
                }

                let arrByte = new Array(byteCount);

                let index;
                for (index = 0; index < byteCount; index++) {
                    arrByte[index] = bytes[index];
                }

                let arrChar = new Array(charCount);

                let result = this.getChars(arrByte, 0, byteCount, arrChar, 0, flush);

                if (result < charCount) {
                    charCount = result;
                }

                for (index = 0; index < charCount; index++) {
                    chars[index] = arrChar[index];
                }

                return charCount;
            });

        return Decoder.prototype.getChars.apply(this, params);
    }

    convert(...params) {
        Decoder.prototype.convert = overload()
            .add([Uint8Array, Number, Number, String, Number, Number, Boolean, Object], function (bytes, byteIndex, byteCount, chars, charIndex, charCount, flush, out) {
                if (byteIndex < 0 || byteCount < 0) {
                    throw new RangeError(`${byteIndex < 0 ? "byteIndex" : "byteCount"} is less than 0.`);
                }

                if (charIndex < 0 || charCount < 0) {
                    throw new RangeError(`${charIndex < 0 ? "charIndex" : "charCount"} is less than 0.`);
                }

                if (bytes.length - byteIndex < byteCount) {
                    throw new RangeError("bytes is out of range.");
                }

                if (chars.length - charIndex < charCount) {
                    throw new RangeError("chars is out of range.");
                }

                obj.bytesUsed = byteCount;

                while (obj.bytesUsed > 0) {
                    if (this.getCharCount(bytes, byteIndex, obj.bytesUsed, flush) <= charCount) {
                        obj.charsUsed = this.getChars(bytes, byteIndex, obj.bytesUsed, chars, charIndex, flush);
                        obj.completed = (obj.bytesUsed == byteCount &&
                            (this.#fallbackBuffer == null || this.#fallbackBuffer.remaining == 0));
                        return;
                    }

                    flush = false;
                    obj.bytesUsed /= 2;
                }

                throw new Error("Conversion error.");
            })
            .add([Uint8Array, Number, String, Number, Boolean, Object], function (bytes, byteCount, chars, charCount, flush, out) {
                if (byteCount < 0 || charCount < 0) {
                    throw new RangeError(`${byteCount < 0 ? "byteCount" : "charCount"} is less than 0.`);
                }

                obj.bytesUsed = byteCount;

                while (obj.bytesUsed > 0) {
                    if (this.getCharCount(bytes, obj.bytesUsed, flush) <= charCount) {
                        obj.charsUsed = this.getChars(bytes, obj.bytesUsed, chars, charCount, flush);
                        obj.completed = (obj.bytesUsed == byteCount &&
                            (this.#fallbackBuffer == null || this.#fallbackBuffer.remaining == 0));
                        return;
                    }

                    flush = false;
                    obj.bytesUsed /= 2;
                }

                throw new Error("Conversion error.");
            });

        return Decoder.prototype.convert.apply(this, params);
    }
}