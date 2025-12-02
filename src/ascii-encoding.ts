import overload from "@jyostudio/overload";
import Encoding from "./encoding";
import EncodingInfo from "./encoding-info";

const CONSTRUCTOR_SYMBOL = Symbol("constructor");

/**
 * 表示 Unicode 字符的 ASCII 字符编码。
 */
export default class ASCIIEncoding extends Encoding {
    /**
     * [私有]ASCII 编码的代码页标识符。
     */
    static #ASCII_CODEPAGE = 20127;

    /**
     * [私有]ASCII 编码的名称。
     */
    static #NAME = "us-ascii";

    /**
     * [私有]ASCII 编码的用户可读说明。
     */
    static #DISPLAY_NAME = "US-ASCII";

    /**
     * [私有]ASCII 编码的别名名称列表。
     */
    static #NAMES = ["ascii", "us-ascii", "us_ascii"];

    /**
     * 获取 ASCII 编码的代码页标识符。
     * @returns ASCII 编码的代码页标识符。
     */
    public override get codePage() {
        return ASCIIEncoding.#ASCII_CODEPAGE;
    }

    /**
     * 获取 ASCII 编码的名称。
     * @returns ASCII 编码的名称。
     */
    public override get bodyName() {
        return ASCIIEncoding.#NAME;
    }

    /**
     * 获取 ASCII 编码的显示名称。
     * @returns ASCII 编码的显示名称。
     */
    public override get encodingName() {
        return ASCIIEncoding.#DISPLAY_NAME;
    }

    /**
     * 获取与邮件代理头标记一起使用的当前编码的名称。
     * @return 与邮件代理头标记一起使用的当前 Encoding 的名称。 - 或 - 如果当前 Encoding 无法使用，则为空字符串 ("")。
     */
    public override get headerName() {
        return ASCIIEncoding.#NAME;
    }

    /**
     * 获取一个值，该值指示浏览器客户端是否可以使用当前的编码显示内容。
     * @returns 如果浏览器客户端可以使用当前编码显示内容，则为 true；否则为 false。
     */
    public override get isBrowserDisplay() {
        return false;
    }

    /**
     * 获取一个值，该值指示浏览器客户端是否可以使用当前的编码保存内容。
     * @returns 如果浏览器客户端可以使用当前编码保存内容，则为 true；否则为 false。
     */
    public override get isBrowserSave() {
        return false;
    }

    /**
     * 获取一个值，该值指示邮件和新闻客户端是否可以使用当前的编码显示内容。
     * @returns 如果邮件和新闻客户端可以使用当前编码显示内容，则为 true；否则为 false。
     */
    public override get isMailNewsDisplay() {
        return true;
    }

    /**
     * 获取一个值，该值指示邮件和新闻客户端是否可以使用当前的编码保存内容。
     * @returns 如果邮件和新闻客户端可以使用当前编码保存内容，则为 true；否则为 false。
     */
    public override get isMailNewsSave() {
        return true;
    }

    /**
     * 获取一个值，该值指示当前的编码是否为只读。
     * @returns 如果当前编码为只读，则为 true；否则为 false。默认值为 true。
     */
    public override get isReadOnly() {
        return true;
    }

    /**
     * 获取一个值，该值指示当前的编码是否使用单字节码位。
     * @returns 此属性恒为 true。
     */
    public override get isSingleByte() {
        return true;
    }

    /**
     * 获取与 Internet 分配号机构 (IANA) 注册的编码的名称。
     * @returns 与 IANA 注册的编码的名称。
     */
    public override get webName() {
        return ASCIIEncoding.#NAME;
    }

    /**
     * 获取当前编码的 Windows 代码页标识符。
     * @returns 与当前编码最紧密对应的 Windows 操作系统代码页。 - 或 - 如果没有对应的代码页，则为 0。
     */
    public override get windowsCodePage() {
        return 1252;
    }

    /**
     * 初始化 ASCIIEncoding 类的新实例。
     */
    public constructor();
    public constructor(...params: any) {
        super();
        this[CONSTRUCTOR_SYMBOL].apply(this, params);
    }

    [CONSTRUCTOR_SYMBOL](...params: any): void {
        ASCIIEncoding.prototype[CONSTRUCTOR_SYMBOL] = overload([], function () { });
        this[CONSTRUCTOR_SYMBOL].apply(this, params);
    };

    /**
     * 将字符串转换为 Uint8Array。
     * @param str 要转换的字符串。
     * @returns 包含字符串编码结果的 Uint8Array。
     */
    static #stringToUint8Array(str: string): Uint8Array {
        const buffer = new Uint8Array(str.length);
        const view = new DataView(buffer.buffer);
        for (let i = 0; i < str.length; i++) {
            let code = str[i].charCodeAt(0);
            if (code > 0x7F) {  // ASCII 字符范围是 0-127 (0x7F)
                code = 63;      // 使用 '?' (ASCII 63) 替换非 ASCII 字符
            }
            view.setUint8(i, code);
        }
        return buffer;
    }

    /**
     * 将 Uint8Array 转换为字符串。
     * @param arr 要转换的 Uint8Array。
     * @returns 包含字符串解码结果的字符串。
     */
    static #uint8ArrayToString(arr: Uint8Array): string {
        let str = "";
        for (let i = 0; i < arr.byteLength; i++) {
            str += String.fromCharCode(arr[i]);
        }
        return str;
    }

    /**
     * 计算对指定 String 中的字符进行编码时所产生的字节数。
     * @param s 包含要编码的字符集的字符串。
     * @returns 对指定字符进行编码后生成的字节数。
     */
    public override getByteCount(s: string): number;

    public getByteCount(...params: any): any {
        ASCIIEncoding.prototype.getByteCount = overload([String], function (this: ASCIIEncoding, s: string): number {
            return this.getBytes(s).byteLength;
        });

        return ASCIIEncoding.prototype.getByteCount.apply(this, params);
    }

    /**
     * 将指定字符串中的所有字符编码为一个字节序列。
     * @param s 包含要编码的字符的字符串。
     * @returns 一个字节数组，包含对指定的字符集进行编码的结果。
     */
    public override getBytes(s: string): Uint8Array;
    /**
     * 将指定字符串中的一组字符编码为一个字节序列。
     * @param s 包含要编码的字符的字符串。
     * @param index 第一个要编码的字符的索引。
     * @param count 要编码的字符的数目。
     * @returns 一个字节数组，包含对指定的字符集进行编码的结果。
     * @throws {RangeError} index 或 count 也不可小于零。 - 或 - index 和 count 不表示 s 中的有效范围。
     */
    public override getBytes(s: string, index: number, count: number): Uint8Array;
    public override getBytes(...params: any): any {
        ASCIIEncoding.prototype.getBytes = overload()
            .add([String], function (s: string) {
                return ASCIIEncoding.#stringToUint8Array(s);
            })
            .add([String, Number, Number], function (s: string, index: number, count: number): Uint8Array {
                if (index < 0 || count < 0 || index + count > s.length) {
                    throw new RangeError("索引或数量超出范围。");
                }

                return ASCIIEncoding.#stringToUint8Array(s.substring(index, index + count));
            });

        return ASCIIEncoding.prototype.getBytes.apply(this, params);
    }

    /**
     * 计算对指定字节数组中的所有字节进行解码所产生的字符数。
     * @param bytes 包含要解码的字节序列的字节数组。
     * @returns 对指定字节序列进行解码所产生的字符数。
     */
    public override getCharCount(bytes: Uint8Array): number;
    /**
     * 计算对字节序列（从指定字节数组开始）进行解码所产生的字符数。
     * @param bytes 包含要解码的字节序列的字节数组。
     * @param index 第一个要解码的字节的索引。
     * @param count 要解码的字节数。
     * @returns 对指定字节序列进行解码所产生的字符数。
     * @throws {RangeError} index 或 count 也不可小于零。 - 或 - index 和 count 不表示 bytes 中的有效范围。
     */
    public override getCharCount(bytes: Uint8Array, index: number, count: number): number;
    public override getCharCount(...params: any): any {
        ASCIIEncoding.prototype.getCharCount = overload()
            .add([Uint8Array], function (this: ASCIIEncoding, bytes: Uint8Array): number {
                return this.getString(bytes).length;
            })
            .add([Uint8Array, Number, Number], function (this: ASCIIEncoding, bytes: Uint8Array, index: number, count: number): number {
                if (index < 0 || count < 0 || index + count > bytes.length) {
                    throw new RangeError("索引或数量超出范围。");
                }

                return this.getString(bytes, index, count).length;
            });

        return ASCIIEncoding.prototype.getCharCount.apply(this, params);
    }

    /**
     * 将指定字节数组中的所有字节解码为一个字符串。
     * @param bytes 包含要解码的字节序列的字节数组。
     * @returns 解码后的字符串。
     */
    public override getString(bytes: Uint8Array): string;
    /**
     * 将指定字节数组中的一个字节序列解码为一个字符串。
     * @param bytes 包含要解码的字节序列的字节数组。
     * @param index 第一个要解码的字节的索引。
     * @param count 要解码的字节数。
     * @returns 解码后的字符串。
     * @throws {RangeError} index 或 count 也不可小于零。 - 或 - index 和 count 不表示 bytes 中的有效范围。
     */
    public override getString(bytes: Uint8Array, index: number, count: number): string;
    public override getString(...params: any): any {
        ASCIIEncoding.prototype.getString = overload()
            .add([Uint8Array], function (this: ASCIIEncoding, bytes: Uint8Array): string {
                return ASCIIEncoding.#uint8ArrayToString(bytes);
            })
            .add([Uint8Array, Number, Number], function (this: ASCIIEncoding, bytes: Uint8Array, index: number, count: number): string {
                if (index < 0 || count < 0 || index + count > bytes.byteLength) {
                    throw new RangeError("索引或数量超出范围。");
                }

                return ASCIIEncoding.#uint8ArrayToString(new Uint8Array(bytes.buffer, index, count));
            });

        return ASCIIEncoding.prototype.getString.apply(this, params);
    }

    static {
        Encoding.registerEncoding(new EncodingInfo(
            ASCIIEncoding.#ASCII_CODEPAGE,
            ASCIIEncoding.#NAME,
            ASCIIEncoding.#DISPLAY_NAME,
            ASCIIEncoding.#NAMES,
            new ASCIIEncoding()
        ));
    }
}