import overload from "@jyostudio/overload";
import Encoding from "./encoding.js";
import EncodingInfo from "./encodingInfo.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class ASCIIEncoding extends Encoding {
    static #ASCII_CODEPAGE = 20127;

    static #NAME = "us-ascii";

    static #DISPLAY_NAME = "US-ASCII";

    static #NAMES = ["ascii", "us-ascii", "us_ascii"];

    get codePage() {
        return ASCIIEncoding.#ASCII_CODEPAGE;
    }

    get bodyName() {
        return ASCIIEncoding.#NAME;
    }

    get encodingName() {
        return ASCIIEncoding.#DISPLAY_NAME;
    }

    get headerName() {
        return ASCIIEncoding.#NAME;
    }

    get isBrowserDisplay() {
        return false;
    }

    get isBrowserSave() {
        return false;
    }

    get isMailNewsDisplay() {
        return true;
    }

    get isMailNewsSave() {
        return true;
    }

    get isReadOnly() {
        return true;
    }

    get isSingleByte() {
        return true;
    }

    get webName() {
        return ASCIIEncoding.#NAME;
    }

    get windowsCodePage() {
        return 1252;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        ASCIIEncoding[CONSTURCTOR_SYMBOL] = overload([], function () { });

        return ASCIIEncoding[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        super();

        return ASCIIEncoding[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    static #stringToUint8Array(str) {
        const buffer = new Uint8Array(str.length);
        const view = new DataView(buffer.buffer);
        for (let i = 0; i < str.length; i++) {
            let code = str[i].charCodeAt();
            if (code > 0x80) {
                code = 63;
            }
            view.setUint8(i, code);
        }
        return buffer;
    }

    static #uint8ArrayToString(arr) {
        let str = "";
        for (let i = 0; i < arr.byteLength; i++) {
            str += String.fromCharCode(arr[i]);
        }
        return str;
    }

    getByteCount(...params) {
        ASCIIEncoding.prototype.getByteCount = overload([String], function (str) {
            return this.getBytes(str).byteLength;
        });

        return ASCIIEncoding.prototype.getByteCount.apply(this, params);
    }

    getBytes(...params) {
        ASCIIEncoding.prototype.getBytes = overload()
            .add([String], function (str) {
                return ASCIIEncoding.#stringToUint8Array(str);
            })
            .add([String, Number, Number], function (str, index, count) {
                if (index < 0 || count < 0 || index + count > str.length) {
                    throw new RangeError("索引或数量超出范围。");
                }

                return ASCIIEncoding.#stringToUint8Array(str.substring(index, index + count));
            });

        return ASCIIEncoding.prototype.getBytes.apply(this, params);
    }

    getCharCount(...params) {
        ASCIIEncoding.prototype.getCharCount = overload()
            .add([Uint8Array], function (bytes) {
                return this.getString(bytes).length;
            })
            .add([Uint8Array, Number, Number], function (bytes, index, count) {
                if (index < 0 || count < 0 || index + count > bytes.length) {
                    throw new RangeError("索引或数量超出范围。");
                }

                return this.getString(bytes, index, count).length;
            });

        return ASCIIEncoding.prototype.getCharCount.apply(this, params);
    }

    getString(...params) {
        ASCIIEncoding.prototype.getString = overload()
            .add([Uint8Array], function (bytes) {
                return ASCIIEncoding.#uint8ArrayToString(bytes);
            })
            .add([Uint8Array, Number, Number], function (bytes, index, count) {
                if (index < 0 || count < 0 || index + count > bytes.byteLength) {
                    throw new RangeError("索引或数量超出范围。");
                }

                return ASCIIEncoding.#uint8ArrayToString(new Uint8Array(bytes.buffer, index, count));
            });

        return ASCIIEncoding.prototype.getString.apply(this, params);
    }

    static {
        Encoding.registerEncoding(new EncodingInfo(ASCIIEncoding.#ASCII_CODEPAGE, ASCIIEncoding.#NAME, ASCIIEncoding.#DISPLAY_NAME, ASCIIEncoding.#NAMES, new ASCIIEncoding()));
    }
}