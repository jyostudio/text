import overload from "@jyostudio/overload";
import Encoding from "./encoding";
import EncodingInfo from "./encoding-info";

const CONSTRUCTOR_SYMBOL = Symbol("constructor");

/**
 * 表示 Unicode 字符的 UTF-8 字符编码。
 */
export default class UTF8Encoding extends Encoding {
    /**
     * [私有]UTF-8 编码的代码页标识符。
     */
    static #UTF8_CODEPAGE = 65001;

    /**
     * [私有]UTF-8 编码的名称。
     */
    static #NAME = "utf-8";

    /**
     * [私有]UTF-8 编码的用户可读说明。
     */
    static #DISPLAY_NAME = "Unicode (UTF-8)";

    /**
     * [私有]UTF-8 编码的别名名称列表。
     */
    static #NAMES = ["utf-8", "utf8", "utf_8"];

    /**
     * [私有]指示是否提供一个 Unicode 字节顺序标记 (BOM)。
     */
    #emitUTF8Identifier = false;

    /**
     * 获取 UTF-8 编码的代码页标识符。
     * @returns UTF-8 编码的代码页标识符。
     */
    public override get codePage() {
        return UTF8Encoding.#UTF8_CODEPAGE;
    }

    /**
     * 获取 UTF-8 编码的名称。
     * @returns UTF-8 编码的名称。
     */
    public override get bodyName() {
        return UTF8Encoding.#NAME;
    }

    /**
     * 获取 UTF-8 编码的显示名称。
     * @returns UTF-8 编码的显示名称。
     */
    public override get encodingName() {
        return UTF8Encoding.#DISPLAY_NAME;
    }

    /**
     * 获取与邮件代理头标记一起使用的当前编码的名称。
     * @return 与邮件代理头标记一起使用的当前 Encoding 的名称。 - 或 - 如果当前 Encoding 无法使用，则为空字符串 ("")。
     */
    public override get headerName() {
        return UTF8Encoding.#NAME;
    }

    /**
     * 获取一个值，该值指示浏览器客户端是否可以使用当前的编码显示内容。
     * @returns 如果浏览器客户端可以使用当前编码显示内容，则为 true；否则为 false。
     */
    public override get isBrowserDisplay() {
        return true;
    }

    /**
     * 获取一个值，该值指示浏览器客户端是否可以使用当前的编码保存内容。
     * @returns 如果浏览器客户端可以使用当前编码保存内容，则为 true；否则为 false。
     */
    public override get isBrowserSave() {
        return true;
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
     * @returns 如果当前编码使用单字节码位，则为 true；否则为 false。
     */
    public override get isSingleByte() {
        return false;
    }

    /**
     * 获取与 Internet 分配号机构 (IANA) 注册的编码的名称。
     * @returns 与 IANA 注册的编码的名称。
     */
    public override get webName() {
        return UTF8Encoding.#NAME;
    }

    /**
     * 获取当前编码的 Windows 代码页标识符。
     * @returns 与当前编码最紧密对应的 Windows 操作系统代码页。 - 或 - 如果没有对应的代码页，则为 0。
     */
    public override get windowsCodePage() {
        return 1200;
    }

    /**
     * 初始化 UTF8Encoding 类的新实例。
     */
    public constructor();

    /**
     * 使用指定的参数初始化 UTF8Encoding 类的新实例。
     * @param encoderShouldEmitUTF8Identifier 指示是否提供一个 Unicode 字节顺序标记 (BOM)。
     */
    public constructor(encoderShouldEmitUTF8Identifier: boolean);

    public constructor(...params: any) {
        super();
        return UTF8Encoding[CONSTRUCTOR_SYMBOL].apply(this, params);
    }

    private static [CONSTRUCTOR_SYMBOL](...params: any): UTF8Encoding {
        UTF8Encoding[CONSTRUCTOR_SYMBOL] = overload()
            .add([], function (this: UTF8Encoding) {
                this.#emitUTF8Identifier = false;
            })
            .add([Boolean], function (this: UTF8Encoding, encoderShouldEmitUTF8Identifier: boolean) {
                this.#emitUTF8Identifier = encoderShouldEmitUTF8Identifier;
            });

        return UTF8Encoding[CONSTRUCTOR_SYMBOL].apply(this, params);
    };

    /**
     * 将字符串转换为 Uint8Array。
     * @param str 要转换的字符串。
     * @returns 包含字符串编码结果的 Uint8Array。
     */
    static #stringToUnit8Array(str: string): Uint8Array {
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

    /**
     * 将 Uint8Array 转换为字符串。
     * @param arr 要转换的 Uint8Array。
     * @returns 包含字符串解码结果的字符串。
     */
    static #uint8ArrayToString(arr: Uint8Array): string {
        let out: string, i: number, len: number, c: number;
        let char2: number, char3: number;

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

    /**
     * 计算对指定 String 中的字符进行编码时所产生的字节数。
     * @param s 包含要编码的字符集的字符串。
     * @returns 对指定字符进行编码后生成的字节数。
     */
    public override getByteCount(s: string): number;

    public getByteCount(...params: any): any {
        UTF8Encoding.prototype.getByteCount = overload([String], function (this: UTF8Encoding, s: string): number {
            return this.getBytes(s).byteLength;
        });

        return UTF8Encoding.prototype.getByteCount.apply(this, params);
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

    public getBytes(...params: any): any {
        UTF8Encoding.prototype.getBytes = overload()
            .add([String], function (s: string): Uint8Array {
                return UTF8Encoding.#stringToUnit8Array(s);
            })
            .add([String, Number, Number], function (s: string, index: number, count: number): Uint8Array {
                if (index < 0 || count < 0 || index + count > s.length) {
                    throw new RangeError("索引或数量超出范围。");
                }

                return UTF8Encoding.#stringToUnit8Array(s.substring(index, index + count));
            });

        return UTF8Encoding.prototype.getBytes.apply(this, params);
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

    public getCharCount(...params: any): any {
        UTF8Encoding.prototype.getCharCount = overload()
            .add([Uint8Array], function (this: UTF8Encoding, bytes: Uint8Array): number {
                return this.getString(bytes).length;
            })
            .add([Uint8Array, Number, Number], function (this: UTF8Encoding, bytes: Uint8Array, index: number, count: number): number {
                if (index < 0 || count < 0 || index + count > bytes.length) {
                    throw new RangeError("索引或数量超出范围。");
                }

                return this.getString(bytes, index, count).length;
            });

        return UTF8Encoding.prototype.getCharCount.apply(this, params);
    }

    /**
     * 返回对应于当前编码的 UTF-8 格式的前导码。
     * @returns 如果在构造函数中请求了 UTF-8 标识符，则该字节数组包含 UTF-8 BOM；否则此方法返回一个长度为零的字节数组。
     */
    public override getPreamble(): Uint8Array;

    public getPreamble(...params: any): any {
        UTF8Encoding.prototype.getPreamble = overload([], function (this: UTF8Encoding): Uint8Array {
            return this.#emitUTF8Identifier ? new Uint8Array([0xEF, 0xBB, 0xBF]) : new Uint8Array(0);
        });

        return UTF8Encoding.prototype.getPreamble.apply(this, params);
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

    public getString(...params: any): any {
        UTF8Encoding.prototype.getString = overload()
            .add([Uint8Array], function (this: UTF8Encoding, bytes: Uint8Array): string {
                return UTF8Encoding.#uint8ArrayToString(bytes);
            })
            .add([Uint8Array, Number, Number], function (this: UTF8Encoding, bytes: Uint8Array, index: number, count: number): string {
                if (index < 0 || count < 0 || index + count > bytes.byteLength) {
                    throw new RangeError("索引或数量超出范围。");
                }

                return UTF8Encoding.#uint8ArrayToString(new Uint8Array(bytes.buffer, index, count));
            });

        return UTF8Encoding.prototype.getString.apply(this, params);
    }

    static {
        Encoding.registerEncoding(new EncodingInfo(
            UTF8Encoding.#UTF8_CODEPAGE,
            UTF8Encoding.#DISPLAY_NAME,
            UTF8Encoding.#NAME,
            UTF8Encoding.#NAMES,
            new UTF8Encoding()
        ));
    }
}