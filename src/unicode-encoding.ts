import overload from "@jyostudio/overload";
import Encoding from "./encoding";
import EncodingInfo from "./encoding-info";

const CONSTRUCTOR_SYMBOL = Symbol("constructor");

/**
 * 表示 Unicode 字符的 UTF-16 字符编码。
 */
export default class UnicodeEncoding extends Encoding {
    /**
     * [私有]Unicode UTF-16 编码的名称。
     */
    static #NAME = "utf-16";

    /**
     * [私有]Unicode UTF-16 编码的用户可读说明。
     */
    static #DISPLAY_NAME = "Unicode";

    /**
     * [私有]Unicode UTF-16 编码的别名名称列表。
     */
    static #NAMES = ["unicode", "utf16", "utf-16", "utf_16"];

    /**
     * [私有]指示是否使用大端字节序。
     */
    #bigEndian = false;

    /**
     * [私有]指示是否提供一个 Unicode 字节顺序标记 (BOM)。
     */
    #byteOrderMark = true;

    /**
     * 获取 Unicode 编码中每个字符的字节大小。
     * @returns 每个字符占用的字节数，UTF-16 为 2 字节。
     */
    static get charSize(): number {
        return 2;
    }

    /**
     * 获取 Unicode UTF-16 编码的代码页标识符。
     * @returns Unicode UTF-16 编码的代码页标识符。根据字节序返回相应的代码页标识符。
     */
    public override get codePage(): number {
        return this.#bigEndian ? 1201 : 1200;
    }

    /**
     * 获取 Unicode UTF-16 编码的名称。
     * @returns Unicode UTF-16 编码的名称。
     */
    public override get bodyName(): string {
        return UnicodeEncoding.#NAME;
    }

    /**
     * 获取 Unicode UTF-16 编码的显示名称。
     * @returns Unicode UTF-16 编码的显示名称。
     */
    public override get encodingName(): string {
        return UnicodeEncoding.#DISPLAY_NAME;
    }

    /**
     * 获取与邮件代理头标记一起使用的当前编码的名称。
     * @return 与邮件代理头标记一起使用的当前 Encoding 的名称。 - 或 - 如果当前 Encoding 无法使用，则为空字符串 ("")。
     */
    public override get headerName(): string {
        return UnicodeEncoding.#NAME;
    }

    /**
     * 获取一个值，该值指示浏览器客户端是否可以使用当前的编码显示内容。
     * @returns 如果浏览器客户端可以使用当前编码显示内容，则为 true；否则为 false。
     */
    public override get isBrowserDisplay(): boolean {
        return false;
    }

    /**
     * 获取一个值，该值指示浏览器客户端是否可以使用当前的编码保存内容。
     * @returns 如果浏览器客户端可以使用当前编码保存内容，则为 true；否则为 false。
     */
    public override get isBrowserSave(): boolean {
        return true;
    }

    /**
     * 获取一个值，该值指示邮件和新闻客户端是否可以使用当前的编码显示内容。
     * @returns 如果邮件和新闻客户端可以使用当前编码显示内容，则为 true；否则为 false。
     */
    public override get isMailNewsDisplay(): boolean {
        return false;
    }

    /**
     * 获取一个值，该值指示邮件和新闻客户端是否可以使用当前的编码保存内容。
     * @returns 如果邮件和新闻客户端可以使用当前编码保存内容，则为 true；否则为 false。
     */
    public override get isMailNewsSave(): boolean {
        return false;
    }

    /**
     * 获取一个值，该值指示当前的编码是否为只读。
     * @returns 如果当前编码为只读，则为 true；否则为 false。默认值为 true。
     */
    public override get isReadOnly(): boolean {
        return true;
    }

    /**
     * 获取一个值，该值指示当前的编码是否使用单字节码位。
     * @returns 如果当前编码使用单字节码位，则为 true；否则为 false。
     */
    public override get isSingleByte(): boolean {
        return false;
    }

    /**
     * 获取与 Internet 分配号机构 (IANA) 注册的编码的名称。
     * @returns 与 IANA 注册的编码的名称。
     */
    public override get webName(): string {
        return UnicodeEncoding.#NAME;
    }

    /**
     * 获取当前编码的 Windows 代码页标识符。
     * @returns 与当前编码最紧密对应的 Windows 操作系统代码页。 - 或 - 如果没有对应的代码页，则为 0。
     */
    public override get windowsCodePage(): number {
        return 1200;
    }

    /**
     * 初始化 UnicodeEncoding 类的新实例。
     */
    public constructor();

    /**
     * 使用指定的大端字节序和字节顺序标记初始化 UnicodeEncoding 类的新实例。
     * @param bigEndian 指示是否使用大端字节序；如果为 true，则使用大端字节序，否则使用小端字节序。
     * @param byteOrderMark 指示是否提供一个 Unicode 字节顺序标记 (BOM)。
     */
    public constructor(bigEndian: boolean, byteOrderMark: boolean);

    public constructor(...params: any) {
        super();
        return UnicodeEncoding[CONSTRUCTOR_SYMBOL].apply(this, params);
    }

    private static [CONSTRUCTOR_SYMBOL](...params: any): UnicodeEncoding {
        UnicodeEncoding[CONSTRUCTOR_SYMBOL] = overload()
            .add([], function (this: UnicodeEncoding) {
                return UnicodeEncoding[CONSTRUCTOR_SYMBOL].call(this, false, true);
            })
            .add([Boolean, Boolean], function (this: UnicodeEncoding, bigEndian: boolean, byteOrderMark: boolean) {
                this.#bigEndian = bigEndian;
                this.#byteOrderMark = byteOrderMark;
            });

        return UnicodeEncoding[CONSTRUCTOR_SYMBOL].apply(this, params);
    }

    /**
     * 将字符串转换为 UTF-16 格式的 Uint8Array。
     * @param str 要转换的字符串。
     * @param isBig 是否使用大端字节序。
     * @returns 包含字符串编码结果的 Uint8Array。
     */
    static #stringToUint16Array(str: string, isBig: boolean): Uint8Array {
        const buffer = new Uint8Array(str.length * UnicodeEncoding.charSize);
        const view = new DataView(buffer.buffer);
        for (let i = 0; i < str.length; i++) {
            view.setUint16(i * UnicodeEncoding.charSize, str.charCodeAt(i), !isBig);
        }
        return buffer;
    }

    /**
     * 将 UTF-16 格式的 Uint8Array 转换为字符串。
     * @param arr 要转换的 Uint8Array。
     * @param isBig 是否使用大端字节序。
     * @returns 包含字符串解码结果的字符串。
     */
    static #uint16ArrayToString(arr: Uint8Array, isBig: boolean): string {
        const view = new DataView(arr.buffer);
        let result = '';
        for (let i = 0; i < arr.byteLength / UnicodeEncoding.charSize; i++) {
            result += String.fromCharCode(view.getUint16(i * UnicodeEncoding.charSize, !isBig));
        }
        return result;
    }

    /**
     * 计算对指定 String 中的字符进行编码时所产生的字节数。
     * @param s 包含要编码的字符集的字符串。
     * @returns 对指定字符进行编码后生成的字节数。
     */
    public override getByteCount(s: string): number;

    public getByteCount(...params: any): any {
        UnicodeEncoding.prototype.getByteCount = overload([String], function (this: UnicodeEncoding, s: string): number {
            return this.getBytes(s).byteLength;
        });

        return UnicodeEncoding.prototype.getByteCount.apply(this, params);
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
        UnicodeEncoding.prototype.getBytes = overload()
            .add([String], function (this: UnicodeEncoding, s: string): Uint8Array {
                return UnicodeEncoding.#stringToUint16Array(s, this.#bigEndian);
            })
            .add([String, Number, Number], function (this: UnicodeEncoding, s: string, index: number, count: number): Uint8Array {
                if (index < 0 || count < 0 || index + count > s.length) {
                    throw new RangeError("索引或数量超出范围。");
                }

                return UnicodeEncoding.#stringToUint16Array(s.substring(index, index + count), this.#bigEndian);
            });

        return UnicodeEncoding.prototype.getBytes.apply(this, params);
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
        UnicodeEncoding.prototype.getCharCount = overload()
            .add([Uint8Array], function (this: UnicodeEncoding, bytes: Uint8Array): number {
                return this.getString(bytes).length;
            })
            .add([Uint8Array, Number, Number], function (this: UnicodeEncoding, bytes: Uint8Array, index: number, count: number): number {
                if (index < 0 || count < 0 || index + count > bytes.length) {
                    throw new RangeError("索引或数量超出范围。");
                }

                return this.getString(bytes, index, count).length;
            });

        return UnicodeEncoding.prototype.getCharCount.apply(this, params);
    }

    /**
     * 返回对应于当前编码的 UTF-16 格式的前导码。
     * @returns 如果在构造函数中请求了字节顺序标记，则该字节数组包含相应的 UTF-16 BOM（大端序为 0xFE, 0xFF；小端序为 0xFF, 0xFE）；否则此方法返回一个长度为零的字节数组。
     */
    public override getPreamble(): Uint8Array;

    public getPreamble(...params: any): any {
        UnicodeEncoding.prototype.getPreamble = overload([], function (this: UnicodeEncoding): Uint8Array {
            if (this.#byteOrderMark) {
                return this.#bigEndian 
                    ? new Uint8Array([0xFE, 0xFF]) 
                    : new Uint8Array([0xFF, 0xFE]);
            }
            return new Uint8Array(0);
        });

        return UnicodeEncoding.prototype.getPreamble.apply(this, params);
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
        UnicodeEncoding.prototype.getString = overload()
            .add([Uint8Array], function (this: UnicodeEncoding, bytes: Uint8Array): string {
                return UnicodeEncoding.#uint16ArrayToString(bytes, this.#bigEndian);
            })
            .add([Uint8Array, Number, Number], function (this: UnicodeEncoding, bytes: Uint8Array, index: number, count: number): string {
                if (index < 0 || count < 0 || index + count > bytes.byteLength) {
                    throw new RangeError("索引或数量超出范围。");
                }

                return UnicodeEncoding.#uint16ArrayToString(new Uint8Array(bytes.buffer, index, count), this.#bigEndian);
            });

        return UnicodeEncoding.prototype.getString.apply(this, params);
    }

    static {
        // 注册 UTF-16 Little-Endian 编码
        Encoding.registerEncoding(new EncodingInfo(
            1200,
            UnicodeEncoding.#DISPLAY_NAME,
            UnicodeEncoding.#NAME,
            UnicodeEncoding.#NAMES.concat(["utf16le", "utf16-le", "utf16_le", "utf-16le", "utf-16-le", "utf_16_le", "utf-16_le", "utf_16-le"]),
            new UnicodeEncoding(false, true)
        ));

        // 注册 UTF-16 Big-Endian 编码
        Encoding.registerEncoding(new EncodingInfo(
            1201,
            UnicodeEncoding.#DISPLAY_NAME,
            UnicodeEncoding.#NAME,
            UnicodeEncoding.#NAMES.concat(["utf16be", "utf16-be", "utf16_be", "utf-16be", "utf-16-be", "utf_16_be", "utf-16_be", "utf_16-be"]),
            new UnicodeEncoding(true, true)
        ));
    }
}
