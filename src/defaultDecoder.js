import overload from "@jyostudio/overload";
import Decoder from "./decoder.js";
import Encoding from "./encoding.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class DefaultDecoder extends Decoder {
    #encoding;

    static [CONSTURCTOR_SYMBOL](...params) {
        DefaultDecoder[CONSTURCTOR_SYMBOL] = overload()
            .add([Encoding], function (encoding) {
                this.#encoding = encoding;
            });

        return DefaultDecoder[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        super();

        return DefaultDecoder[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    getCharCount(...params) {
        DefaultDecoder.prototype.getCharCount = overload()
            .add([Uint8Array, Number, Number], function (bytes, index, count) {
                return this.getCharCount(bytes, index, count, false);
            })
            .add([Uint8Array, Number, Number, Boolean], function (bytes, index, count, flush) {
                return this.#encoding.getCharCount(bytes, index, count);
            })
            .add([Uint8Array, Number, Boolean], function (bytes, count, flush) {
                return this.#encoding.getCharCount(bytes, 0, count);
            });

        return DefaultDecoder.prototype.getCharCount.apply(this, params);
    }

    getChars(...params) {
        DefaultDecoder.prototype.getChars = overload()
            .add([Uint8Array, Number, Number, String, Number], function (bytes, byteIndex, byteCount, chars, charIndex) {
                return this.getChars(bytes, byteIndex, byteCount, chars, charIndex, false);
            })
            .add([Uint8Array, Number, Number, String, Number, Boolean], function (bytes, byteIndex, byteCount, chars, charIndex, flush) {
                return this.#encoding.getChars(bytes, byteIndex, byteCount, chars, charIndex);
            })
            .add([Uint8Array, Number, String, Number, Boolean], function (bytes, byteCount, chars, charCount, flush) {
                return this.#encoding.getChars(bytes, byteIndex, byteCount, chars, charIndex);
            });

        return DefaultDecoder.prototype.getChars.apply(this, params);
    }
}