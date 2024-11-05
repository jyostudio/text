import overload from "@jyostudio/overload";
import Encoding from "./encoding.js";
import EncodingInfo from "./encodingInfo.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class UTF32Encoding extends Encoding {
    static #NAME = "utf-32";

    static #DISPLAY_NAME = "Unicode (UTF-32)";

    static #NAMES = ["utf-32", "utf32", "utf_32"];

    #bigEndian = false;

    #byteOrderMark = true;

    get codePage() {
        return this.#bigEndian ? 12001 : 12000;
    }

    get bodyName() {
        return UTF32Encoding.#NAME;
    }

    get encodingName() {
        return UTF32Encoding.#DISPLAY_NAME;
    }

    get headerName() {
        return UTF32Encoding.#NAME;
    }

    get isBrowserDisplay() {
        return false;
    }

    get isBrowserSave() {
        return false;
    }

    get isMailNewsDisplay() {
        return false;
    }

    get isMailNewsSave() {
        return false;
    }

    get isReadOnly() {
        return true;
    }

    get isSingleByte() {
        return false;
    }

    get webName() {
        return UTF32Encoding.#NAME;
    }

    get windowsCodePage() {
        return 1200;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        UTF32Encoding[CONSTURCTOR_SYMBOL] = overload()
            .add([], function () {
                return UTF32Encoding[CONSTURCTOR_SYMBOL].call(this, false, true);
            })
            .add([Boolean, Boolean], function (bigEndian, byteOrderMark) {
                this.#bigEndian = bigEndian;
                this.#byteOrderMark = byteOrderMark;
            });

        return UTF32Encoding[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        super();

        return UTF32Encoding[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    static #stringToUnit32Array(str, isBig) {
        const buffer = new Uint8Array(str.length * 4);
        const view = new DataView(buffer.buffer);
        for (let i = 0; i < str.length; i++) {
            view.setUint32(i * 4, str.charCodeAt(i), !isBig);
        }
        return buffer;
    }

    static #unit32ArrayToString(arr, isBig) {
        const view = new DataView(arr.buffer);
        let result = '';
        for (let i = 0; i < arr.byteLength / 4; i++) {
            result += String.fromCharCode(view.getUint32(i * 4, !isBig));
        }
        return result;
    }

    getByteCount(...params) {
        UTF32Encoding.prototype.getByteCount = overload([String], function (s) {
            return this.getBytes(s).byteLength;
        });

        return UTF32Encoding.prototype.getByteCount.apply(this, params);
    }

    getBytes(...params) {
        UTF32Encoding.prototype.getBytes = overload()
            .add([String], function (s) {
                return UTF32Encoding.#stringToUnit32Array(s, this.#bigEndian);
            })
            .add([String, Number, Number], function (s, index, count) {
                if (index < 0 || count < 0 || index + count > s.length) {
                    throw new RangeError("index or count is out of range.");
                }

                return UTF32Encoding.#stringToUnit32Array(s.substring(index, index + count), this.#bigEndian);
            });

        return UTF32Encoding.prototype.getBytes.apply(this, params);
    }

    getCharCount(...params) {
        UTF32Encoding.prototype.getCharCount = overload()
            .add([Uint8Array], function (bytes) {
                return this.getString(bytes).length;
            })
            .add([Uint8Array, Number, Number], function (bytes, index, count) {
                if (index < 0 || count < 0 || index + count > bytes.length) {
                    throw new RangeError("index or count is out of range.");
                }

                return this.getString(bytes, index, count).length;
            });

        return UTF32Encoding.prototype.getCharCount.apply(this, params);
    }

    getPreamble(...params) {
        UTF32Encoding.prototype.getPreamble = overload([], function () {
            return this.#byteOrderMark ? (this.#bigEndian ? [0xFE, 0xFF] : [0xFF, 0xFE]) : [];
        });

        return UTF32Encoding.prototype.getPreamble.apply(this, params);
    }

    getString(...params) {
        UTF32Encoding.prototype.getString = overload()
            .add([Uint8Array], function (bytes) {
                return UTF32Encoding.#unit32ArrayToString(bytes, this.#bigEndian);
            })
            .add([Uint8Array, Number, Number], function (bytes, index, count) {
                if (index < 0 || count < 0 || index + count > bytes.byteLength) {
                    throw new RangeError("index or count is out of range.");
                }

                return UTF32Encoding.#unit32ArrayToString(new Uint8Array(bytes.buffer, index, count), this.#bigEndian);
            });

        return UTF32Encoding.prototype.getString.apply(this, params);
    }

    static {
        Encoding.registerEncoding(new EncodingInfo(12000, this.#DISPLAY_NAME, this.#NAME, this.#NAMES.concat(["utf32le", "utf32-le", "utf32_le", "utf-32le", "utf-32-le", "utf_32_le", "utf-32_le", "utf_32-le"]), new UTF32Encoding(false, true)));
        Encoding.registerEncoding(new EncodingInfo(12001, this.#DISPLAY_NAME, this.#NAME, this.#NAMES.concat(["utf32be", "utf32-be", "utf32_be", "utf-32be", "utf-32-be", "utf_32_be", "utf-32_be", "utf_32-be"]), new UTF32Encoding(true, true)));
    }
}