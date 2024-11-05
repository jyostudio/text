import overload from "@jyostudio/overload";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class DecoderFallbackBuffer {
    get remaining() {
        throw new Error("Not implemented");
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        DecoderFallbackBuffer[CONSTURCTOR_SYMBOL] = overload([], function () { });

        return DecoderFallbackBuffer[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        if (new.target === DecoderFallbackBuffer) {
            throw new TypeError("Cannot construct DecoderFallbackBuffer instances directly");
        }

        return DecoderFallbackBuffer[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    fallback(...params) {
        DecoderFallbackBuffer.prototype.fallback = overload()
            .add([Array, Number], function (charsUnknown, index) {
                throw new Error("Not implemented");
            });

        return DecoderFallbackBuffer.prototype.fallback.apply(this, params);
    }

    getNextChar(...params) {
        DecoderFallbackBuffer.prototype.getNextChar = overload([], function () {
            throw new Error("Not implemented");
        });

        return DecoderFallbackBuffer.prototype.getNextChar.apply(this, params);
    }

    movePrevious(...params) {
        DecoderFallbackBuffer.prototype.movePrevious = overload([], function () {
            throw new Error("Not implemented");
        });

        return DecoderFallbackBuffer.prototype.movePrevious.apply(this, params);
    }

    reset(...params) {
        DecoderFallbackBuffer.prototype.reset = overload([], function () {
            while (this.getNextChar() !== 0);
        });

        return DecoderFallbackBuffer.prototype.reset.apply(this, params);
    }
}