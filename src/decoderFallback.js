import overload from "@jyostudio/overload";
import List from "@jyostudio/list";
import StringBuilder from "./stringBuilder.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");
export const REGISTER_SYMBOL = Symbol("register");

export default class DecoderFallback {
    static [REGISTER_SYMBOL] = {};

    static #exceptionFallback;

    static #replacementFallback;

    static get exceptionFallback() {
        if (!DecoderFallback.#exceptionFallback) {
            DecoderFallback.#exceptionFallback = new DecoderFallback[REGISTER_SYMBOL].decoderExceptionFallback();
        }

        return DecoderFallback.#exceptionFallback;
    }

    static get replacementFallback() {
        if (!DecoderFallback.#replacementFallback) {
            DecoderFallback.#replacementFallback = new DecoderFallback[REGISTER_SYMBOL].decoderReplacementFallback();
        }

        return DecoderFallback.#replacementFallback;
    }

    get isMicorsoftBestFitFallback() {
        return false;
    }

    get maxCharCount() {
        throw new Error("Not implemented");
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        DecoderFallback[CONSTURCTOR_SYMBOL] = overload([], function () { });

        return DecoderFallback[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        if (new.target === DecoderFallback) {
            throw new TypeError("Cannot construct DecoderFallback instances directly");
        }

        return DecoderFallback[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    createFallbackBuffer(...params) {
        DecoderFallback.prototype.createFallbackBuffer = overload([], function () {
            throw new Error("Not implemented");
        });

        return this.createFallbackBuffer.apply(this, params);
    }

    throwLastBytesRecursive(...params) {
        DecoderFallback.prototype.throwLastBytesRecursive = overload([[List.T(Number), Array]], function (bytesUnknown) {
            let strBytes = new StringBuilder(bytesUnknown.length * 3);
            let i;
            for (i = 0; i < bytesUnknown.length && i < 20; i++) {
                if (strBytes.length > 0) {
                    strBytes.append(" ");
                }

                strBytes.append(`\\x${bytesUnknown[i].toString(16)}`);
            }

            if (i == 20) {
                strBytes.append(" ...");
            }

            throw new Error(`${strBytes.toString()} cannot be looped back.`);
        });

        return this.throwLastBytesRecursive.apply(this, params);
    }
}