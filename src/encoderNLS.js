import overload from "@jyostudio/overload";
import Encoder from "./encoder.js";
import Encoding from "./encoding.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class EncoderNLS extends Encoder {
    charLeftOver = 0;

    get hasState() {
        return false;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        EncoderNLS[CONSTURCTOR_SYMBOL] = overload()
            .add([], function () {
                this.reset();
            })
            .add([Encoding], function (encoding) {
                this.fallback = encoding.encoderFallback;
                this.reset();
            });

        return EncoderNLS[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        super();

        return EncoderNLS[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    reset(...params) {
        EncoderNLS.prototype.reset = overload([], function () {
            this.charLeftOver = 0;
            this.fallbackBuffer?.reset();
        });

        return EncoderNLS.prototype.reset.apply(this, params);
    }
}