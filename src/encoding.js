import overload from "@jyostudio/overload";
import List from "@jyostudio/list";
import EncodingInfo from "./encodingInfo.js";
import EncoderFallback from "./encoderFallback.js";
import DecoderFallback from "./decoderFallback.js";
import InternalEncoderBestFitFallback from "./internalEncoderBestFitFallback.js";
import InternalDecoderBestFitFallback from "./internalDecoderBestFitFallback.js";
import DefaultDecoder from "./defaultDecoder.js";
import DefaultEncoder from "./defaultEncoder.js";

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

    #codePage = 0;

    #encoderFallback;

    #decoderFallback;

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

    get encoderFallback() {
        return this.#encoderFallback;
    }

    set innerEncoderFallback(value) {
        this.#encoderFallback = value;
    }

    set innerDecoderFallback(value) {
        this.#decoderFallback = value;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        Encoding[CONSTURCTOR_SYMBOL] = overload()
            .add([], function () {
                return Encoding[CONSTURCTOR_SYMBOL].call(this, 0);
            })
            .add([Number], function (codePage) {
                if (codePage < 0) {
                    throw new RangeError("codePage is out of range.");
                }

                this.#codePage = codePage;

                this.#setDefaultFallbacks();
            })
            .add([Number, EncoderFallback, DecoderFallback], function (codePage, encoderFallback, decoderFallback) {
                if (codePage < 0) {
                    throw new RangeError("codePage is out of range.");
                }

                this.#codePage = codePage;

                this.#encoderFallback = encoderFallback ?? new InternalEncoderBestFitFallback(this);
                this.#decoderFallback = decoderFallback ?? new InternalDecoderBestFitFallback(this);
            });

        return Encoding[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        if (new.target === Encoding) {
            throw new Error("Cannot create an instance of the abstract class Encoding.");
        }

        Object.defineProperties(this, {
            decoderFallback: {
                get: () => this.#decoderFallback,
                set: overload([[DecoderFallback, null]], function (value) {
                    if (this.isReadOnly) {
                        throw new Error("The Encoding is read-only.");
                    }

                    if (value == null) {
                        throw new TypeError("value is null.");
                    }

                    this.#decoderFallback = value;
                })
            }
        });

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
            .add([Encoding, Encoding, ArrayBuffer], function (srcEncoding, dstEncoding, bytes) {
                return Encoding.convert.call(this, srcEncoding, dstEncoding, bytes, 0, bytes.byteLength);
            })
            .add([Encoding, Encoding, ArrayBuffer, Number, Number], function (srcEncoding, dstEncoding, bytes, index, count) {
                return dstEncoding.getBytes(srcEncoding.getString(bytes, index, count));
            });

        return Encoding.convert.apply(this, params);
    }

    static getEncoding(...params) {
        Encoding.getEncoding = overload()
            .add([Number], function (codePage) {
                if (codePage < 0 || codePage > 65535) {
                    throw new RangeError("codePage is out of range.");
                }

                for (let i = 0; i < ENCODINGS.length; i++) {
                    if (ENCODINGS[i].codePage === codePage) {
                        return ENCODINGS[i].getEncoding();
                    }
                }

                throw new Error("Encoding not found.");
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

                throw new Error("Encoding not found.");
            });

        return Encoding.getEncoding.apply(this, params);
    }

    static getEncodings(...params) {
        Encoding.getEncodings = overload([], function () {
            return ENCODINGS;
        });

        return Encoding.getEncodings.apply(this, params);
    }

    #setDefaultFallbacks() {
        this.#encoderFallback = new InternalEncoderBestFitFallback(this);
        this.#decoderFallback = new InternalDecoderBestFitFallback(this);
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
            .add([ArrayBuffer], function (bytes) { })
            .add([ArrayBuffer, Number, Number], function (bytes, index, count) { });

        return Encoding.getCharCount.apply(this, params);
    }

    getPreamble(...params) {
        Encoding.getPreamble = overload([], function () { });

        return Encoding.getPreamble.apply(this, params);
    }

    getString(...params) {
        Encoding.getString = overload()
            .add([ArrayBuffer], function (bytes) { })
            .add([ArrayBuffer, Number, Number], function (bytes, index, count) { });

        return Encoding.getString.apply(this, params);
    }

    getDecoder(...params) {
        Encoding.getDecoder = overload([], function () {
            return new DefaultDecoder(this);
        });

        return Encoding.getDecoder.apply(this, params);
    }

    getEncoder(...params) {
        Encoding.getEncoder = overload([], function () {
            return new DefaultEncoder(this);
        });

        return Encoding.getEncoder.apply(this, params);
    }

    getMaxCharCount(...params) {
        Encoding.getMaxCharCount = overload([Number], function (byteCount) {
            throw new Error("Not implemented.");
        });

        return Encoding.getMaxCharCount.apply(this, params);
    }

    getMaxByteCount(...params) {
        Encoding.getMaxByteCount = overload([Number], function (charCount) {
            throw new Error("Not implemented.");
        });

        return Encoding.getMaxByteCount.apply(this, params);
    }

    getBestFitBytesToUnicodeData(...params) {
        Encoding.getBestFitBytesToUnicodeData = overload([], function () {
            return [];
        });

        return Encoding.getBestFitBytesToUnicodeData.apply(this, params);
    }

    GetBestFitUnicodeToBytesData(...params) {
        Encoding.GetBestFitUnicodeToBytesData = overload([], function () {
            return [];
        });

        return Encoding.GetBestFitUnicodeToBytesData.apply(this, params);
    }
}