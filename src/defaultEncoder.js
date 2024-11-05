import overload from "@jyostudio/overload";
import Encoder from "./encoder.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class DefaultEncoder extends Encoder {
    #encoding;

    static [CONSTURCTOR_SYMBOL](...params) {
        DefaultEncoder[CONSTURCTOR_SYMBOL] = overload()
            .add([Encoding], function (encoding) {
                this.#encoding = encoding;
            });

        return DefaultEncoder[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        super();

        return DefaultEncoder[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    getByteCount(...params) {
        DefaultEncoder.prototype.getByteCount = overload()
            .add([String, Number, Number, Boolean], function (chars, charIndex, charCount, flush) {
                return this.#encoding.getByteCount(chars, charIndex, charCount);
            })
            .add([String, Number, Boolean], function (chars, charCount, flush) {
                if (charCount < 0) {
                    throw new RangeError("charCount is less than 0.");
                }

                return this.getByteCount(chars, 0, charCount, flush);
            });

        return DefaultEncoder.prototype.getByteCount.apply(this, params);
    }

    getBytes(...params) {
        DefaultEncoder.prototype.getBytes = overload()
            .Add([String, Number, Number, Uint8Array, Number, Boolean], function (chars, charIndex, charCount, bytes, byteIndex, flush) {
                return this.#encoding.getBytes(chars, charIndex, charCount, bytes, byteIndex);
            })
            .Add([String, Number, Uint8Array, Number, Boolean], function (chars, charCount, bytes, byteIndex, flush) {
                if (charCount < 0) {
                    throw new RangeError("charCount is less than 0.");
                }

                return this.getBytes(chars, 0, charCount, bytes, byteIndex, flush);
            });

        return DefaultEncoder.prototype.getBytes.apply(this, params);
    }
}