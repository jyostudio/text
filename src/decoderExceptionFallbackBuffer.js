import List from "@jyostudio/list";
import DecoderFallbackBuffer from "./decoderFallbackBuffer.js";
import StringBuilder from "./stringBuilder.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class DecoderExceptionFallbackBuffer extends DecoderFallbackBuffer {
    get remaining() {
        return 0;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        DecoderExceptionFallbackBuffer[CONSTURCTOR_SYMBOL] = overload([], function () { });

        return DecoderExceptionFallbackBuffer[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        super();

        return DecoderExceptionFallbackBuffer[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    #throw(bytesUnknown, index) {
        let strBytes = new StringBuilder(bytesUnknown.length * 3);

        let i;
        for (i = 0; i < bytesUnknown.length && i < 20; i++) {
            strBytes.append("[");
            strBytes.append(bytesUnknown[i].toString(16).padStart(2, "0"));
            strBytes.append("]");
        }

        if (i == 20) {
            strBytes.append(" ...");
        }

        throw new Error(`Cannot decode the bytes ${strBytes.toString()} at index ${index}.`);
    }

    fallback(...params) {
        DecoderExceptionFallbackBuffer.prototype.fallback = overload()
            .add([[List.T(Number), Array], Number], function (byteUnknown, index) {
                this.#throw(byteUnknown, index);
                return true;
            });

        return DecoderExceptionFallbackBuffer.prototype.fallback.apply(this, params);
    }

    getNextChar(...params) {
        DecoderExceptionFallbackBuffer.prototype.getNextChar = overload([], function () {
            return "\0";
        });

        return DecoderExceptionFallbackBuffer.prototype.getNextChar.apply(this, params);
    }

    movePrevious(...params) {
        DecoderExceptionFallbackBuffer.prototype.movePrevious = overload([], function () {
            return false;
        });

        return DecoderExceptionFallbackBuffer.prototype.movePrevious.apply(this, params);
    }
}