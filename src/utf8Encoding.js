import overload from "@jyostudio/overload";
import Encoding from "./encoding.js";
import EncodingInfo from "./encodingInfo.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class UTF8Encoding extends Encoding {
    static #UTF8_CODEPAGE = 65001;

    static #NAME = "utf-8";

    static #DISPLAY_NAME = "Unicode (UTF-8)";

    static #NAMES = ["utf-8", "utf8", "utf_8"];

    #emitUTF8Identifier = false;

    get codePage() {
        return UTF8Encoding.#UTF8_CODEPAGE;
    }

    get bodyName() {
        return UTF8Encoding.#NAME;
    }

    get encodingName() {
        return UTF8Encoding.#DISPLAY_NAME;
    }

    get headerName() {
        return UTF8Encoding.#NAME;
    }

    get isBrowserDisplay() {
        return true;
    }

    get isBrowserSave() {
        return true;
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
        return false;
    }

    get webName() {
        return UTF8Encoding.#NAME;
    }

    get windowsCodePage() {
        return 1200;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        UTF8Encoding[CONSTURCTOR_SYMBOL] = overload()
            .add([], function () {
                return UTF8Encoding[CONSTURCTOR_SYMBOL].call(this, false);
            })
            .add([Boolean], function (encoderShouldEmitUTF8Identifier) {
                this.#emitUTF8Identifier = encoderShouldEmitUTF8Identifier;
            });

        return UTF8Encoding[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        super();

        return UTF8Encoding[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    static #stringToUnit8Array(str) {
        const utf8 = [];
        for (let i = 0; i < str.length; i++) {
            let charCode = str.charCodeAt(i);
            if (charCode < 0x80) {
                utf8.push(charCode);
            } else if (charCode < 0x800) {
                utf8.push(0xc0 | (charCode >> 6),
                    0x80 | (charCode & 0x3f));
            } else if (charCode < 0x10000) {
                utf8.push(0xe0 | (charCode >> 12),
                    0x80 | ((charCode >> 6) & 0x3f),
                    0x80 | (charCode & 0x3f));
            } else {
                utf8.push(0xf0 | (charCode >> 18),
                    0x80 | ((charCode >> 12) & 0x3f),
                    0x80 | ((charCode >> 6) & 0x3f),
                    0x80 | (charCode & 0x3f));
            }
        }
        return new Uint8Array(utf8);
    }

    static #uint8ArrayToString(arr) {
        let out, i, len, c;
        let char2, char3;

        out = "";
        len = arr.length;
        i = 0;
        while (i < len) {
            c = arr[i++];
            switch (c >> 4) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
                case 12: case 13:
                    // 110x xxxx 10xx xxxx
                    char2 = arr[i++];
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx 10xx xxxx 10xx xxxx
                    char2 = arr[i++];
                    char3 = arr[i++];
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }

        return out;
    }

    getByteCount(...params) {
        UTF8Encoding.prototype.getByteCount = overload([String], function (s) {
            return this.getBytes(s).byteLength;
        });

        return UTF8Encoding.prototype.getByteCount.apply(this, params);
    }

    getBytes(...params) {
        UTF8Encoding.prototype.getBytes = overload()
            .add([String], function (s) {
                return UTF8Encoding.#stringToUnit8Array(s);
            })
            .add([String, Number, Number], function (s, index, count) {
                if (index < 0 || count < 0 || index + count > s.length) {
                    throw new RangeError("索引或数量超出范围。");
                }

                return UTF8Encoding.#stringToUnit8Array(s.substring(index, index + count));
            });

        return UTF8Encoding.prototype.getBytes.apply(this, params);
    }

    getCharCount(...params) {
        UTF8Encoding.prototype.getCharCount = overload()
            .add([Uint8Array], function (bytes) {
                return this.getString(bytes).length;
            })
            .add([Uint8Array, Number, Number], function (bytes, index, count) {
                if (index < 0 || count < 0 || index + count > bytes.length) {
                    throw new RangeError("索引或数量超出范围。");
                }

                return this.getString(bytes, index, count).length;
            });

        return UTF8Encoding.prototype.getCharCount.apply(this, params);
    }

    getPreamble(...params) {
        UTF8Encoding.prototype.getPreamble = overload([], function () {
            return this.#emitUTF8Identifier ? [0xEF, 0xBB, 0xBF] : [];
        });

        return UTF8Encoding.prototype.getPreamble.apply(this, params);
    }

    getString(...params) {
        UTF8Encoding.prototype.getString = overload()
            .add([Uint8Array], function (bytes) {
                return UTF8Encoding.#uint8ArrayToString(bytes);
            })
            .add([Uint8Array, Number, Number], function (bytes, index, count) {
                if (index < 0 || count < 0 || index + count > bytes.byteLength) {
                    throw new RangeError("索引或数量超出范围。");
                }

                return UTF8Encoding.#uint8ArrayToString(new Uint8Array(bytes.buffer, index, count));
            });

        return UTF8Encoding.prototype.getString.apply(this, params);
    }

    static {
        Encoding.registerEncoding(new EncodingInfo(this.#UTF8_CODEPAGE, this.#DISPLAY_NAME, this.#NAME, this.#NAMES, new UTF8Encoding()));
    }
}