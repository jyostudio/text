import overload from "@jyostudio/overload";
import DecoderFallback from "./decoderFallback.js";
import Encoding from "./encoding.js";
import InternalDecoderBestFitFallbackBuffer from "./internalDecoderBestFitFallbackBuffer.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class InternalDecoderBestFitFallback extends DecoderFallback {
    encoding = null;

    arrayBestFit = null;

    cReplacement = "?";

    get isMicrosoftBestFitFallback() {
        return true;
    }

    get maxCharCount() {
        return 1;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        InternalDecoderBestFitFallback[CONSTURCTOR_SYMBOL] = overload()
            .add([Encoding], function (encoding) {
                this.encoding = encoding;
            });

        return InternalDecoderBestFitFallback[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        super();

        return InternalDecoderBestFitFallback[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    createFallbackBuffer(...params) {
        InternalDecoderBestFitFallback.prototype.createFallbackBuffer = overload()
            .add([], function () {
                return new InternalDecoderBestFitFallbackBuffer(this);
            });

        return InternalDecoderBestFitFallback.prototype.createFallbackBuffer.apply(this, params);
    }
}