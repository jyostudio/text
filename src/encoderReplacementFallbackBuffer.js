import overload from "@jyostudio/overload";
import EncoderFallbackBuffer from "./encoderFallbackBuffer.js";
import EncoderReplacementFallback from "./encoderReplacementFallback.js";
import CharHelper from "./charHelper.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class EncoderReplacementFallbackBuffer extends EncoderFallbackBuffer {
    #strDefault = "";

    #fallbackCount = -1;

    #fallbackIndex = -1;

    get remaining() {
        return (this.#fallbackCount < 0) ? 0 : this.#fallbackCount;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        EncoderReplacementFallbackBuffer[CONSTURCTOR_SYMBOL] = overload()
            .add([EncoderReplacementFallback], function (fallback) {
                this.#strDefault = fallback.defaultString + fallback.defaultString;
            });

        return EncoderReplacementFallbackBuffer[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        super();

        return EncoderReplacementFallbackBuffer[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    fallback(...params) {
        EncoderReplacementFallbackBuffer.prototype.fallback = overload()
            .add([String, Number], function (charUnknown, index) {
                if (this.#fallbackCount >= 1) {
                    if (CharHelper.isHighSurrogate(charUnknown) && this.#fallbackCount >= 0 &&
                        CharHelper.isLowSurrogate(this.#strDefault[this.#fallbackIndex + 1])) {
                        this.throwLastCharRecursive(CharHelper.convertToUtf32(charUnknown, this.#strDefault[this.#fallbackIndex + 1]));
                    }

                    this.throwLastCharRecursive(charUnknown.charCodeAt());
                }

                this.#fallbackCount = this.#strDefault.length / 2;
                this.#fallbackIndex = -1;

                return this.#fallbackCount != 0;
            })
            .add([String, String, Number], function (charUnknownHigh, charUnknownLow, index) {
                if (!CharHelper.isHighSurrogate(charUnknownHigh)) {
                    throw new Error("charUnknownHigh not in 0xD800-0xDBFF range.");
                }

                if (!CharHelper.isLowSurrogate(charUnknownLow)) {
                    throw new Error("charUnknownLow not in 0xDC00-0xDFFF range.");
                }

                if (this.#fallbackCount >= 1) this.throwLastCharRecursive(CharHelper.convertToUtf32(charUnknownHigh, charUnknownLow));

                this.#fallbackCount = this.#strDefault.length;
                this.#fallbackIndex = -1;

                return this.#fallbackCount != 0;
            });

        return EncoderReplacementFallbackBuffer.prototype.fallback.apply(this, params);
    }

    getNextChar(...params) {
        EncoderReplacementFallbackBuffer.prototype.getNextChar = overload([], function () {
            this.#fallbackCount--;
            this.#fallbackIndex++;

            if (this.#fallbackCount < 0) return "\0";

            if (this.#fallbackCount == Number.MAX_SAFE_INTEGER) {
                this.#fallbackCount = -1;
                return "\0";
            }

            return this.#strDefault[this.#fallbackIndex];
        });

        return EncoderReplacementFallbackBuffer.prototype.getNextChar.apply(this, params);
    }

    movePrevious(...params) {
        EncoderReplacementFallbackBuffer.prototype.movePrevious = overload([], function () {
            if (this.#fallbackCount >= -1 && this.#fallbackIndex >= 0) {
                this.#fallbackIndex--;
                this.#fallbackCount++;
                return true;
            }

            return false;
        });

        return EncoderReplacementFallbackBuffer.prototype.movePrevious.apply(this, params);
    }

    reset(...params) {
        EncoderReplacementFallbackBuffer.prototype.reset = overload([], function () {
            this.#fallbackCount = -1;
            this.#fallbackIndex = 0;
        });

        return EncoderReplacementFallbackBuffer.prototype.reset.apply(this, params);
    }
}