import overload from "@jyostudio/overload";
import DecoderFallbackBuffer from "./decoderFallbackBuffer.js";
import InternalDecoderBestFitFallback from "./internalDecoderBestFitFallback.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class InternalDecoderBestFitFallbackBuffer extends DecoderFallbackBuffer {
    #cBestFit = "\0";

    #iCount = -1;

    #iSize = 0;

    #oFallback = null;

    get remaining() {
        return (this.#iCount > 0) ? this.#iCount : 0;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        InternalDecoderBestFitFallbackBuffer[CONSTURCTOR_SYMBOL] = overload()
            .add([InternalDecoderBestFitFallback], function (fallback) {
                this.#oFallback = fallback;

                if (this.#oFallback.arrayBestFit == null) {
                    this.#oFallback.arrayBestFit = fallback.encoding.getBestFitBytesToUnicodeData();
                }
            });

        return InternalDecoderBestFitFallbackBuffer[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        super();

        return InternalDecoderBestFitFallbackBuffer[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    fallback(...params) {
        InternalDecoderBestFitFallbackBuffer.prototype.fallback = overload()
            .add([Number, Number], function (bytesUnknown, index) {
                this.#cBestFit = this.tryBestFit(bytesUnknown);
                if (this.#cBestFit == "\0") {
                    this.#cBestFit = this.#oFallback.cReplacement;
                }

                this.#iCount = this.#iSize = 1;

                return true;
            });

        return InternalDecoderBestFitFallbackBuffer.prototype.fallback.apply(this, params);
    }

    getNextChar(...params) {
        InternalDecoderBestFitFallbackBuffer.prototype.getNextChar = overload()
            .add([], function () {
                this.#iCount--;

                if (this.#iCount < 0) {
                    return "\0";
                }

                if (this.#iCount == Number.MAX_SAFE_INTEGER) {
                    this.#iCount = -1;
                    return "\0";
                }

                return this.#cBestFit;
            });

        return InternalDecoderBestFitFallbackBuffer.prototype.getNextChar.apply(this, params);
    }

    movePrevious(...params) {
        InternalDecoderBestFitFallbackBuffer.prototype.movePrevious = overload()
            .add([], function () {
                if (this.#iCount >= 0) {
                    this.#iCount++;
                }

                return (this.#iCount >= 0 && this.#iCount <= this.#iSize);
            });

        return InternalDecoderBestFitFallbackBuffer.prototype.movePrevious.apply(this, params);
    }

    reset(...params) {
        InternalDecoderBestFitFallbackBuffer.prototype.reset = overload()
            .add([], function () {
                this.#iCount = -1;
            });

        return InternalDecoderBestFitFallbackBuffer.prototype.reset.apply(this, params);
    }

    internalFallback(...params) {
        InternalDecoderBestFitFallbackBuffer.prototype.internalFallback = overload()
            .add([Uint8Array, Uint8Array], function (bytes, pBytes) {
                return 1;
            });

        return InternalDecoderBestFitFallbackBuffer.prototype.internalFallback.apply(this, params);
    }

    tryBestFit(...params) {
        InternalDecoderBestFitFallbackBuffer.prototype.tryBestFit = overload()
            .add([Uint8Array], function (bytesCheck) {
                let lowBound = 0;
                let highBound = this.#oFallback.arrayBestFit.length;
                let index;
                let cCheck;

                if (highBound == 0) {
                    return "\0";
                }

                if (bytesCheck.length == 0 || bytesCheck.length > 2) {
                    return "\0";
                }

                if (bytesCheck.length == 1) {
                    cCheck = bytesCheck[0];
                } else {
                    cCheck = ((bytesCheck[0] << 8) + bytesCheck[1]);
                }

                if (cCheck < this.#oFallback.arrayBestFit[0] || cCheck > this.#oFallback.arrayBestFit[highBound - 2]) {
                    return "\0";
                }

                let iDiff;
                while ((iDiff = (highBound - lowBound)) > 6) {
                    index = ((iDiff / 2) + lowBound) & 0xFFFE;

                    let cTest = this.#oFallback.arrayBestFit[index];
                    if (cTest == cCheck) {
                        return this.#oFallback.arrayBestFit[index + 1];
                    } else if (cTest < cCheck) {
                        lowBound = index;
                    } else {
                        highBound = index;
                    }
                }

                for (index = lowBound; index < highBound; index += 2) {
                    if (this.#oFallback.arrayBestFit[index] == cCheck) {
                        return this.#oFallback.arrayBestFit[index + 1];
                    }
                }

                return "\0";
            });

        return InternalDecoderBestFitFallbackBuffer.prototype.tryBestFit.apply(this, params);
    }
}