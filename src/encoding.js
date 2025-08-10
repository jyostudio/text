import overload from "@jyostudio/overload";
import List from "@jyostudio/list";
import EncodingInfo from "./encodingInfo.js";

const CONSTURCTOR_SYMBOL = Symbol("constructor");
const ENCODINGS = new List(EncodingInfo);

export default class Encoding {
    static get ascii() {
        return Encoding.getEncoding("us-ascii");
    }

    static get utf8() {
        return Encoding.getEncoding("utf-8");
    }

    static get utf32() {
        return Encoding.getEncoding("utf-32");
    }

    static get unicode() {
        return Encoding.getEncoding("utf-16-le");
    }

    static get bigEndianUnicode() {
        return Encoding.getEncoding("utf-16-be");
    }

    get bodyName() {
        return "";
    }

    get codePage() {
        return 0;
    }

    get encodingName() {
        return "";
    }

    get headerName() {
        return "";
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
        return "";
    }

    get windowsCodePage() {
        return 0;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        Encoding[CONSTURCTOR_SYMBOL] = overload([], function () { });

        return Encoding[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        if (new.target === Encoding) {
            throw new Error("无法创建抽象类 Encoding 的实例。");
        }

        return Encoding[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    static registerEncoding(...params) {
        Encoding.registerEncoding = overload([EncodingInfo], function (encodingInfo) {
            ENCODINGS.add(encodingInfo);
        });

        return Encoding.registerEncoding.apply(this, params);
    }

    static convert(...params) {
        Encoding.convert = overload()
            .add([Encoding, Encoding, Uint8Array], function (srcEncoding, dstEncoding, bytes) {
                return Encoding.convert.call(this, srcEncoding, dstEncoding, bytes, 0, bytes.byteLength);
            })
            .add([Encoding, Encoding, Uint8Array, Number, Number], function (srcEncoding, dstEncoding, bytes, index, count) {
                return dstEncoding.getBytes(srcEncoding.getString(bytes, index, count));
            });

        return Encoding.convert.apply(this, params);
    }

    static getEncoding(...params) {
        Encoding.getEncoding = overload()
            .add([Number], function (codePage) {
                if (codePage < 0 || codePage > 65535) {
                    throw new RangeError("codePage 超出范围。");
                }

                for (let i = 0; i < ENCODINGS.length; i++) {
                    if (ENCODINGS[i].codePage === codePage) {
                        return ENCODINGS[i].getEncoding();
                    }
                }

                throw new Error("未找到编码。");
            })
            .add([String], function (name) {
                for (let i = 0; i < ENCODINGS.length; i++) {
                    const _name = name.toLowerCase();
                    for (let n = 0; n < ENCODINGS[i].names.length; n++) {
                        if (ENCODINGS[i].names[n] === _name) {
                            return ENCODINGS[i].getEncoding();
                        }
                    }
                }

                throw new Error("未找到编码。");
            });

        return Encoding.getEncoding.apply(this, params);
    }

    static getEncodings(...params) {
        Encoding.getEncodings = overload([], function () {
            return ENCODINGS;
        });

        return Encoding.getEncodings.apply(this, params);
    }

    equals(...params) {
        Encoding.equals = overload([Encoding], function (value) {
            return this === value;
        }).any(() => false);

        return Encoding.equals.apply(this, params);
    }

    getByteCount(...params) {
        Encoding.getByteCount = overload([String], function (s) { });

        return Encoding.getByteCount.apply(this, params);
    }

    getBytes(...params) {
        Encoding.getBytes = overload()
            .add([String], function (s) { })
            .add([String, Number, Number], function (s, index, count) { });

        return Encoding.getBytes.apply(this, params);
    }

    getCharCount(...params) {
        Encoding.getCharCount = overload()
            .add([Uint8Array], function (bytes) { })
            .add([Uint8Array, Number, Number], function (bytes, index, count) { });

        return Encoding.getCharCount.apply(this, params);
    }

    getPreamble(...params) {
        Encoding.getPreamble = overload([], function () { });

        return Encoding.getPreamble.apply(this, params);
    }

    getString(...params) {
        Encoding.getString = overload()
            .add([Uint8Array], function (bytes) { })
            .add([Uint8Array, Number, Number], function (bytes, index, count) { });

        return Encoding.getString.apply(this, params);
    }
}