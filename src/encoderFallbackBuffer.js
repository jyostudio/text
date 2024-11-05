import overload from "@jyostudio/overload";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class EncoderFallbackBuffer {
    get remaining() {
        throw new Error("Not implemented");
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        EncoderFallbackBuffer[CONSTURCTOR_SYMBOL] = overload([], function () { });

        return EncoderFallbackBuffer[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        if (new.target === EncoderFallbackBuffer) {
            throw new TypeError("Cannot construct EncoderFallbackBuffer instances directly");
        }

        return EncoderFallbackBuffer[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    fallback(...params) {
        EncoderFallbackBuffer.prototype.fallback = overload()
            .add([String, Number], function (charUnknown, index) {
                throw new Error("Not implemented");
            })
            .add([String, String, Number], function (charUnknownHigh, charUnknownLow, index) {
                throw new Error("Not implemented");
            });

        return EncoderFallbackBuffer.prototype.fallback.apply(this, params);
    }

    getNextChar(...params) {
        EncoderFallbackBuffer.prototype.getNextChar = overload([], function () {
            throw new Error("Not implemented");
        });

        return EncoderFallbackBuffer.prototype.getNextChar.apply(this, params);
    }

    movePrevious(...params) {
        EncoderFallbackBuffer.prototype.movePrevious = overload([], function () {
            throw new Error("Not implemented");
        });

        return EncoderFallbackBuffer.prototype.movePrevious.apply(this, params);
    }

    reset(...params) {
        EncoderFallbackBuffer.prototype.reset = overload([], function () {
            while (this.getNextChar() !== 0);
        });

        return EncoderFallbackBuffer.prototype.reset.apply(this, params);
    }
}