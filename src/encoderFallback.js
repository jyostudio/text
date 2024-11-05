import overload from "@jyostudio/overload";

const CONSTURCTOR_SYMBOL = Symbol("constructor");
export const REGISTER_SYMBOL = Symbol("register");

export default class EncoderFallback {
    static [REGISTER_SYMBOL] = {};

    static #exceptionFallback;

    static #replacementFallback;

    static get exceptionFallback() {
        if (!EncoderFallback.#exceptionFallback) {
            EncoderFallback.#exceptionFallback = new EncoderFallback[REGISTER_SYMBOL].encoderExceptionFallback();
        }

        return EncoderFallback.#exceptionFallback;
    }

    static get replacementFallback() {
        if (!EncoderFallback.#replacementFallback) {
            EncoderFallback.#replacementFallback = new EncoderFallback[REGISTER_SYMBOL].encoderReplacementFallback();
        }

        return EncoderFallback.#replacementFallback;
    }

    get isMicorsoftBestFitFallback() {
        return false;
    }

    get maxCharCount() {
        throw new Error("Not implemented");
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        EncoderFallback[CONSTURCTOR_SYMBOL] = overload([], function () { });

        return EncoderFallback[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        if (new.target === EncoderFallback) {
            throw new TypeError("Cannot construct EncoderFallback instances directly");
        }

        return EncoderFallback[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    createFallbackBuffer(...params) {
        EncoderFallback.prototype.createFallbackBuffer = overload([], function () {
            throw new Error("Not implemented");
        });

        return this.createFallbackBuffer.apply(this, params);
    }
}