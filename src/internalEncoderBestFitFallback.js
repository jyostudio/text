import overload from "@jyostudio/overload";
import Encoding from "./encoding.js";
import InternalEncoderBestFitFallbackBuffer from "./internalEncoderBestFitFallbackBuffer.js";
import EncoderFallback from "./encoderFallback.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class InternalEncoderBestFitFallback extends EncoderFallback {
    encoding;

    arrayBestFit;

    get isMicorsoftBestFitFallback() {
        return true;
    }

    get maxCharCount() {
        return 1;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        InternalEncoderBestFitFallback[CONSTURCTOR_SYMBOL] = overload()
            .add([Encoding], function (encoding) {
                this.encoding = encoding;
            });

        return InternalEncoderBestFitFallback[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        super();

        return InternalEncoderBestFitFallback[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    createFallbackBuffer(...params) {
        InternalEncoderBestFitFallback.prototype.createFallbackBuffer = overload([], function () {
            return new InternalEncoderBestFitFallbackBuffer(this);
        });

        return this.createFallbackBuffer.apply(this, params);
    }
}