import overload from "@jyostudio/overload";
import EncoderFallback, { REGISTER_SYMBOL } from "./encoderFallback.js";
import EncoderExceptionFallbackBuffer from "./encoderExceptionFallbackBuffer.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class EncoderExceptionFallback extends EncoderFallback {
    get maxCharCount() {
        return 0;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        EncoderExceptionFallback[CONSTURCTOR_SYMBOL] = overload([], function () { });

        return EncoderExceptionFallback[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        super();

        return EncoderExceptionFallback[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    createFallbackBuffer(...params) {
        EncoderExceptionFallback.prototype.createFallbackBuffer = overload([], function () {
            return new EncoderExceptionFallbackBuffer();
        });

        return this.createFallbackBuffer.apply(this, params);
    }

    static {
        EncoderFallback[REGISTER_SYMBOL].encoderExceptionFallback = EncoderExceptionFallback;
    }
}