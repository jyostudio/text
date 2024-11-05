import overload from "@jyostudio/overload";
import Encoding from "./encoding.js";
import EncodingInfo from "./encodingInfo.js";
import DecoderNLS from "./decoderNLS.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class UnicodeEncoding extends Encoding {
    static #NAME = "utf-16";

    static #DISPLAY_NAME = "Unicode";

    static #NAMES = ["unicode", "utf16", "utf-16", "utf_16"];

    #bigEndian = false;

    #byteOrderMark = true;

    static get charSize() {
        return 2;
    }

    get codePage() {
        return this.#bigEndian ? 1201 : 1200;
    }

    get bodyName() {
        return UnicodeEncoding.#NAME;
    }

    get encodingName() {
        return UnicodeEncoding.#DISPLAY_NAME;
    }

    get headerName() {
        return UnicodeEncoding.#NAME;
    }

    get isBrowserDisplay() {
        return false;
    }

    get isBrowserSave() {
        return true;
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
        return UnicodeEncoding.#NAME;
    }

    get windowsCodePage() {
        return 1200;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        UnicodeEncoding[CONSTURCTOR_SYMBOL] = overload()
            .add([], function () {
                return UnicodeEncoding[CONSTURCTOR_SYMBOL].call(this, false, true);
            })
            .add([Boolean, Boolean], function (bigEndian, byteOrderMark) {
                this.#bigEndian = bigEndian;
                this.#byteOrderMark = byteOrderMark;
            });

        return UnicodeEncoding[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        super();

        return UnicodeEncoding[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    static #stringToUint16Array(str, isBig) {
        const buffer = new Uint8Array(str.length * UnicodeEncoding.charSize);
        const view = new DataView(buffer.buffer);
        for (let i = 0; i < str.length; i++) {
            view.setUint16(i * UnicodeEncoding.charSize, str.charCodeAt(i), !isBig);
        }
        return buffer;
    }

    static #uint16ArrayToString(arr, isBig) {
        const view = new DataView(arr.buffer);
        let result = '';
        for (let i = 0; i < arr.byteLength / UnicodeEncoding.charSize; i++) {
            result += String.fromCharCode(view.getUint16(i * UnicodeEncoding.charSize, !isBig));
        }
        return result;
    }

    getByteCount(...params) {
        UnicodeEncoding.prototype.getByteCount = overload([String], function (str) {
            return this.getBytes(str).byteLength;
        });

        return UnicodeEncoding.prototype.getByteCount.apply(this, params);
    }

    getBytes(...params) {
        UnicodeEncoding.prototype.getBytes = overload()
            .add([String], function (str) {
                return UnicodeEncoding.#stringToUint16Array(str, this.#bigEndian);
            })
            .add([String, Number, Number], function (str, index, count) {
                if (index < 0 || count < 0 || index + count > str.length) {
                    throw new RangeError("index or count is out of range.");
                }

                return UnicodeEncoding.#stringToUint16Array(str.substring(index, index + count), this.#bigEndian);
            });

        return UnicodeEncoding.prototype.getBytes.apply(this, params);
    }

    getCharCount(...params) {
        UnicodeEncoding.prototype.getCharCount = overload()
            .add([Uint8Array], function (bytes) {
                return this.getString(bytes).length;
            })
            .add([Uint8Array, Number, Number], function (bytes, index, count) {
                if (index < 0 || count < 0 || index + count > bytes.length) {
                    throw new RangeError("index or count is out of range.");
                }

                return this.getString(bytes, index, count).length;
            });

        return UnicodeEncoding.prototype.getCharCount.apply(this, params);
    }

    getPreamble(...params) {
        UnicodeEncoding.prototype.getPreamble = overload([], function () {
            return this.#byteOrderMark ? (this.#bigEndian ? [0xFE, 0xFF] : [0xFF, 0xFE]) : [];
        });

        return UnicodeEncoding.prototype.getPreamble.apply(this, params);
    }

    getString(...params) {
        UnicodeEncoding.prototype.getString = overload()
            .add([Uint8Array], function (bytes) {
                return UnicodeEncoding.#uint16ArrayToString(bytes, this.#bigEndian);
            })
            .add([Uint8Array, Number, Number], function (bytes, index, count) {
                if (index < 0 || count < 0 || index + count > bytes.length) {
                    throw new RangeError("index or count is out of range.");
                }

                return UnicodeEncoding.#uint16ArrayToString(new Uint8Array(bytes.buffer, index, count), this.#bigEndian);
            });

        return UnicodeEncoding.prototype.getString.apply(this, params);
    }

    getDecoder(...params) {
        UnicodeEncoding.prototype.getDecoder = overload([], function () {
            return new UnicodeDecoder(this);
        });

        return UnicodeEncoding.prototype.getDecoder.apply(this, params);
    }

    getMaxCharCount(...params) {
        UnicodeEncoding.prototype.getMaxCharCount = overload([Number], function (byteCount) {
            if (byteCount < 0) {
                throw new RangeError("byteCount is less than 0.");
            }

            let charCount = (byteCount >> 1) + (byteCount & 1) + 1;

            if (this.decoderFallback.maxCharCount > 1) {
                charCount *= this.decoderFallback.maxCharCount;
            }

            if (charCount > 0x7fffffff) {
                throw new RangeError("byteCount is out of range.");
            }

            return charCount;
        });

        return UnicodeEncoding.prototype.getMaxCharCount.apply(this, params);
    }

    static {
        Encoding.registerEncoding(new EncodingInfo(1200, this.#DISPLAY_NAME, this.#NAME, this.#NAMES.concat(["utf16le", "utf16-le", "utf16_le", "utf-16le", "utf-16-le", "utf_16_le", "utf-16_le", "utf_16-le"]), new UnicodeEncoding(false, true)));
        Encoding.registerEncoding(new EncodingInfo(1201, this.#DISPLAY_NAME, this.#NAME, this.#NAMES.concat(["utf16be", "utf16-be", "utf16_be", "utf-16be", "utf-16-be", "utf_16_be", "utf-16_be", "utf_16-be"]), new UnicodeEncoding(true, true)));
    }
}

export class UnicodeDecoder extends DecoderNLS {
    lastByte = -1;

    lastChar = "\0";

    get hasState() {
        return (this.lastByte != -1 || this.lastChar != "\0");
    }

    reset(...params) {
        UnicodeDecoder.prototype.reset = overload()
            .add([], function () {
                this.lastByte = -1;
                this.lastChar = "\0";
                this.fallbackBuffer?.reset();
            });

        return UnicodeDecoder.prototype.reset.apply(this, params);
    }
}