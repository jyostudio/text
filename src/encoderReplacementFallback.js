import overload from "@jyostudio/overload";
import EncoderFallback, { REGISTER_SYMBOL } from "./encoderFallback.js";
import EncoderReplacementFallbackBuffer from "./encoderReplacementFallbackBuffer.js";
import CharHelper from "./charHelper.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class EncoderReplacementFallback extends EncoderFallback {
    #strDefault = "";

    get defaultString() {
        return this.#strDefault;
    }

    get maxCharCount() {
        return this.#strDefault.length;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        EncoderReplacementFallback[CONSTURCTOR_SYMBOL] = overload()
            .add([], function () {
                return EncoderReplacementFallback[CONSTURCTOR_SYMBOL].call(this, "?");
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

        return EncoderReplacementFallback[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        super();

        return EncoderReplacementFallback[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    createFallbackBuffer(...params) {
        EncoderReplacementFallback.prototype.createFallbackBuffer = overload([], function () {
            return new EncoderReplacementFallbackBuffer(this);
        });

        return this.createFallbackBuffer.apply(this, params);
    }

    static {
        EncoderFallback[REGISTER_SYMBOL].encoderReplacementFallback = EncoderReplacementFallback;
    }
}