import overload from "@jyostudio/overload";
import CharHelper from "./charHelper.js";
import DecoderFallback, { REGISTER_SYMBOL } from "./decoderFallback.js";
import DecoderReplacementFallbackBuffer from "./decoderReplacementFallbackBuffer.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class DecoderReplacementFallback extends DecoderFallback {
    #strDefault = "";

    get defaultString() {
        return this.#strDefault;
    }

    get maxCharCount() {
        return this.#strDefault.length;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        DecoderReplacementFallback[CONSTURCTOR_SYMBOL] = overload()
            .add([], function () {
                return DecoderReplacementFallback[CONSTURCTOR_SYMBOL].call(this, "?");
            })
            .add([String], function (replacement) {
                let bFoundHigh = false;
                for (let i = 0; i < replacement.length; i++) {
                    if (CharHelper.isSurrogate(replacement, i)) {
                        if (CharHelper.isHighSurrogate(replacement, i)) {
                            if (bFoundHigh) {
                                break;
                            }

                            bFoundHigh = true;
                        } else {
                            if (!bFoundHigh) {
                                bFoundHigh = true;
                                break;
                            }

                            bFoundHigh = false;
                        }
                    } else if (bFoundHigh) {
                        break;
                    }
                }

                if (bFoundHigh) {
                    throw new Error("string induced invalid unicode point.");
                }

                this.#strDefault = replacement;
            });

        return DecoderReplacementFallback[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        super();

        return DecoderReplacementFallback[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    createFallbackBuffer(...params) {
        DecoderReplacementFallback.prototype.createFallbackBuffer = overload()
            .add([], function () {
                return new DecoderReplacementFallbackBuffer(this);
            });

        return this.createFallbackBuffer.apply(this, params);
    }

    static {
        DecoderFallback[REGISTER_SYMBOL].decoderReplacementFallback = DecoderReplacementFallback;
    }
}