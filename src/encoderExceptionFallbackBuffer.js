import CharHelper from "./charHelper.js";
import EncoderFallbackBuffer from "./encoderFallbackBuffer.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class EncoderExceptionFallbackBuffer extends EncoderFallbackBuffer {
    get remaining() {
        return 0;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        EncoderExceptionFallbackBuffer[CONSTURCTOR_SYMBOL] = overload([], function () { });

        return EncoderExceptionFallbackBuffer[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        return EncoderExceptionFallbackBuffer[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    fallback(...params) {
        EncoderExceptionFallbackBuffer.prototype.fallback = overload()
            .add([String, Number], function (charUnknown, index) {
                throw new Error("Invalid code point: " + charUnknown.codePointAt(0).toString(16).toUpperCase());
            })
            .add([String, String, Number], function (charUnknownHigh, charUnknownLow, index) {
                if (!CharHelper.isHighSurrogate(charUnknownHigh)) {
                    throw new Error("charUnknownHigh not in 0xD800-0xDBFF range.");
                }

                if (!CharHelper.isLowSurrogate(charUnknownLow)) {
                    throw new Error("charUnknownLow not in 0xDC00-0xDFFF range.");
                }

                let iTemp = CharHelper.convertToUtf32(charUnknownHigh, charUnknownLow);

                throw new Error(`Unable to translate Unicode character \\u${iTemp.toString(16).toUpperCase()} at index ${index} to specified code page.`)
            });
    }

    getNextChar(...params) {
        EncoderExceptionFallbackBuffer.prototype.getNextChar = overload([], function () {
            return "\0";
        });

        return EncoderExceptionFallbackBuffer.prototype.getNextChar.apply(this, params);
    }

    movePrevious(...params) {
        EncoderExceptionFallbackBuffer.prototype.movePrevious = overload([], function () {
            return false;
        });

        return EncoderExceptionFallbackBuffer.prototype.movePrevious.apply(this, params);
    }
}