import overload from "@jyostudio/overload";
import DecoderFallback, { REGISTER_SYMBOL } from "./decoderFallback.js";
import DecoderExceptionFallbackBuffer from "./decoderExceptionFallbackBuffer.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class DecoderExceptionFallback extends DecoderFallback {
    get maxCharCount() {
        return 0;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        DecoderExceptionFallback[CONSTURCTOR_SYMBOL] = overload([], function () { });

        return DecoderExceptionFallback[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        super();

        return DecoderExceptionFallback[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    createFallbackBuffer(...params) {
        DecoderExceptionFallback.prototype.createFallbackBuffer = overload([], function () {
            return new DecoderExceptionFallbackBuffer();
        });

        return this.createFallbackBuffer.apply(this, params);
    }

    static {
        DecoderFallback[REGISTER_SYMBOL].decoderExceptionFallback = DecoderExceptionFallback;
    }
}