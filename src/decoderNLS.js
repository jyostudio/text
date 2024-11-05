import overload from "@jyostudio/overload";
import Decoder from "./decoder.js";
import Encoding from "./encoding.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class DecoderNLS extends Decoder {
    get hasState() {
        return false;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        DecoderNLS[CONSTURCTOR_SYMBOL] = overload()
            .add([], function () {
                this.reset();
            })
            .add([Encoding], function (encoding) {
                this.fallback = encoding.decoderFallback;
                this.reset();
            });

        return DecoderNLS[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        super();

        return DecoderNLS[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    reset(...params) {
        DecoderNLS.prototype.reset = overload([], function () {
            this.fallbackBuffer?.reset();
        });

        return DecoderNLS.prototype.reset.apply(this, params);
    }
}