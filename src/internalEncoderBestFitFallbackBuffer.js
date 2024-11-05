import overload from "@jyostudio/overload";
import EncoderFallbackBuffer from "./encoderFallbackBuffer.js";
import InternalEncoderBestFitFallback from "./internalEncoderBestFitFallback.js";
import CharHelper from "./charHelper.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class InternalEncoderBestFitFallbackBuffer extends EncoderFallbackBuffer {
    #cBestFit = "\0";

    #iCount = -1;

    #iSize = 0;

    #oFallback;

    get remaining() {
        return (this.#iCount > 0) ? this.#iCount : 0;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        InternalEncoderBestFitFallbackBuffer[CONSTURCTOR_SYMBOL] = overload()
            .add([InternalEncoderBestFitFallback], function (fallback) {
                this.#oFallback = fallback;
                this.#oFallback.arrayBestFit ??= fallback.encoding.getBestFitUnicodeToBytesData();
            });

        return InternalEncoderBestFitFallbackBuffer[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        super();

        return InternalEncoderBestFitFallbackBuffer[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    fallback(...params) {
        InternalEncoderBestFitFallbackBuffer.prototype.fallback = overload()
            .add([String, Number], function (charUnknown, index) {
                this.#iCount = this.#iSize = 1;
                this.#cBestFit = this.tryBestFit(charUnknown);
                if (this.#cBestFit == "\0") this.#cBestFit = "?";
                return true;
            })
            .add([String, String, Number], function (charUnknownHigh, charUnknownLow, index) {
                if (!CharHelper.isHighSurrogate(charUnknownHigh)) {
                    throw new Error("charUnknownHigh not in 0xD800-0xDBFF range.");
                }

                if (!CharHelper.isLowSurrogate(charUnknownLow)) {
                    throw new Error("charUnknownLow not in 0xDC00-0xDFFF range.");
                }

                this.#cBestFit = "?";
                this.#iCount = this.#iSize = 2;
                return true;
            });

        return InternalEncoderBestFitFallbackBuffer.prototype.fallback.apply(this, params);
    }

    getNextChar(...params) {
        InternalEncoderBestFitFallbackBuffer.prototype.getNextChar = overload([], function () {
            this.#iCount--;
            if (this.#iCount < 0) return "\0";
            if (this.#iCount === Number.MAX_SAFE_INTEGER) {
                this.#iCount = -1;
                return "\0";
            }
            return this.#cBestFit;
        });

        return InternalEncoderBestFitFallbackBuffer.prototype.getNextChar.apply(this, params);
    }

    movePrevious(...params) {
        InternalEncoderBestFitFallbackBuffer.prototype.movePrevious = overload([], function () {
            if (this.#iCount >= 0) this.#iCount++;
            return (this.#iCount >= 0 && this.#iCount <= this.#iSize);
        });

        return InternalEncoderBestFitFallbackBuffer.prototype.movePrevious.apply(this, params);
    }

    reset(...params) {
        InternalEncoderBestFitFallbackBuffer.prototype.reset = overload([], function () {
            this.#iCount = -1;
        });

        return InternalEncoderBestFitFallbackBuffer.prototype.reset.apply(this, params);
    }

    tryBestFit(...params) {
        InternalEncoderBestFitFallbackBuffer.prototype.tryBestFit = overload([String], function (cUnknown) {
            if (cUnknown.length !== 1) {
                throw new Error("cUnknown must be a single character.");
            }

            let lowBound = 0;
            let highBound = this.#oFallback.arrayBestFit.length;
            let index;

            let iDiff;
            while ((iDiff = (highBound - lowBound)) > 6) {
                index = ((iDiff / 2) + lowBound) & 0xFFFE;

                let cTest = this.#oFallback.arrayBestFit[index];
                if (cTest == cUnknown) {
                    return this.#oFallback.arrayBestFit[index + 1];
                } else if (cTest < cUnknown) {
                    lowBound = index;
                } else {
                    highBound = index;
                }
            }

            for (index = lowBound; index < highBound; index += 2) {
                if (this.#oFallback.arrayBestFit[index] == cUnknown) {
                    return this.#oFallback.arrayBestFit[index + 1];
                }
            }

            return "\0";
        });

        return InternalEncoderBestFitFallbackBuffer.prototype.tryBestFit.apply(this, params);
    }
}