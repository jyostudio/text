import overload from "@jyostudio/overload";
import List from "@jyostudio/list";
import DecoderFallbackBuffer from "./decoderFallbackBuffer.js";
import DecoderReplacementFallback from "./decoderReplacementFallback.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class DecoderReplacementFallbackBuffer extends DecoderFallbackBuffer {
    #strDefault = "";

    #fallbackCount = -1;

    #fallbackIndex = -1;

    get remaining() {
        return (this.#fallbackCount < 0) ? 0 : this.#fallbackCount;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        DecoderReplacementFallbackBuffer[CONSTURCTOR_SYMBOL] = overload()
            .add([DecoderReplacementFallback], function (fallback) {
                this.#strDefault = fallback.defaultString;
            });

        return DecoderReplacementFallbackBuffer[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        super();

        return DecoderReplacementFallbackBuffer[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    fallback(...params) {
        DecoderReplacementFallbackBuffer.prototype.fallback = overload()
            .add([[List.T(Number), Array], Number], function (bytesUnknown, index) {
                if (this.#fallbackCount >= 1) {
                    this.throwLastBytesRecursive(bytesUnknown);
                }

                if (this.#strDefault.length == 0) {
                    return false;
                }

                this.#fallbackCount = this.#strDefault.length;
                this.#fallbackIndex = -1;

                return true;
            });

        return DecoderReplacementFallbackBuffer.prototype.fallback.apply(this, params);
    }

    getNextChar(...params) {
        DecoderReplacementFallbackBuffer.prototype.getNextChar = overload([], function () {
            this.#fallbackCount--;
            this.#fallbackIndex++;

            if (this.#fallbackCount < 0) {
                return "\0";
            }

            if (this.#fallbackCount == Number.MAX_SAFE_INTEGER) {
                this.#fallbackCount = -1;
                return "\0";
            }

            return this.#strDefault[this.#fallbackIndex];
        });

        return DecoderReplacementFallbackBuffer.prototype.getNextChar.apply(this, params);
    }

    movePrevious(...params) {
        DecoderReplacementFallbackBuffer.prototype.movePrevious = overload([], function () {
            if (this.#fallbackCount >= -1 && this.#fallbackIndex >= 0) {
                this.#fallbackIndex--;
                this.#fallbackCount++;
                return true;
            }

            return false;
        });

        return DecoderReplacementFallbackBuffer.prototype.movePrevious.apply(this, params);
    }

    reset(...params) {
        DecoderReplacementFallbackBuffer.prototype.reset = overload([], function () {
            this.#fallbackCount = -1;
            this.#fallbackIndex = -1;
        });

        return DecoderReplacementFallbackBuffer.prototype.reset.apply(this, params);
    }
}