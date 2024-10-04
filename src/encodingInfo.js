import overload from "@jyostudio/overload";
import Encoding from "./encoding.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class EncodingInfo {
    #codePage = 0;

    #displayName = "";

    #name = "";

    #names = null;

    #encoding = null;

    get codePage() {
        return this.#codePage;
    }

    get displayName() {
        return this.#displayName;
    }

    get name() {
        return this.#name;
    }

    get names() {
        return this.#names;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        EncodingInfo[CONSTURCTOR_SYMBOL] = overload([Number, String, String, Array, Encoding], function (codePage, displayName, name, names, encoding) {
            this.#codePage = codePage;
            this.#displayName = displayName;
            this.#name = name;
            this.#names = names;
            this.#encoding = encoding;
        });

        return EncodingInfo[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        return EncodingInfo[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    getEncoding(...params) {
        EncodingInfo.prototype.getEncoding = overload([], function () {
            return this.#encoding;
        });

        return EncodingInfo.prototype.getEncoding.apply(this, params);
    }

    equals(...params) {
        EncodingInfo.prototype.equals = overload([EncodingInfo], function (other) {
            return (this.#codePage === other.#codePage) &&
                (this.#displayName === other.#displayName) &&
                (this.#name === other.#name) &&
                (this.#names.equals(other.#names)) &&
                (this.#encoding === other.#encoding);
        }).any(() => false);

        return EncodingInfo.prototype.equals.apply(this, params);
    }
}