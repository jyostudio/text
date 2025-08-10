import Encoding from "./encoding";
declare const CONSTRUCTOR_SYMBOL: unique symbol;
/**
 * 表示 Unicode 字符的 UTF-16 字符编码。
 */
export default class UnicodeEncoding extends Encoding {
    #private;
    /**
     * 获取 Unicode 编码中每个字符的字节大小。
     * @returns 每个字符占用的字节数，UTF-16 为 2 字节。
     */
    static get charSize(): number;
    /**
     * 获取 Unicode UTF-16 编码的代码页标识符。
     * @returns Unicode UTF-16 编码的代码页标识符。根据字节序返回相应的代码页标识符。
     */
    get codePage(): number;
    /**
     * 获取 Unicode UTF-16 编码的名称。
     * @returns Unicode UTF-16 编码的名称。
     */
    get bodyName(): string;
    /**
     * 获取 Unicode UTF-16 编码的显示名称。
     * @returns Unicode UTF-16 编码的显示名称。
     */
    get encodingName(): string;
    /**
     * 获取与邮件代理头标记一起使用的当前编码的名称。
     * @return 与邮件代理头标记一起使用的当前 Encoding 的名称。 - 或 - 如果当前 Encoding 无法使用，则为空字符串 ("")。
     */
    get headerName(): string;
    /**
     * 获取一个值，该值指示浏览器客户端是否可以使用当前的编码显示内容。
     * @returns 如果浏览器客户端可以使用当前编码显示内容，则为 true；否则为 false。
     */
    get isBrowserDisplay(): boolean;
    /**
     * 获取一个值，该值指示浏览器客户端是否可以使用当前的编码保存内容。
     * @returns 如果浏览器客户端可以使用当前编码保存内容，则为 true；否则为 false。
     */
    get isBrowserSave(): boolean;
    /**
     * 获取一个值，该值指示邮件和新闻客户端是否可以使用当前的编码显示内容。
     * @returns 如果邮件和新闻客户端可以使用当前编码显示内容，则为 true；否则为 false。
     */
    get isMailNewsDisplay(): boolean;
    /**
     * 获取一个值，该值指示邮件和新闻客户端是否可以使用当前的编码保存内容。
     * @returns 如果邮件和新闻客户端可以使用当前编码保存内容，则为 true；否则为 false。
     */
    get isMailNewsSave(): boolean;
    /**
     * 获取一个值，该值指示当前的编码是否为只读。
     * @returns 如果当前编码为只读，则为 true；否则为 false。默认值为 true。
     */
    get isReadOnly(): boolean;
    /**
     * 获取一个值，该值指示当前的编码是否使用单字节码位。
     * @returns 如果当前编码使用单字节码位，则为 true；否则为 false。
     */
    get isSingleByte(): boolean;
    /**
     * 获取与 Internet 分配号机构 (IANA) 注册的编码的名称。
     * @returns 与 IANA 注册的编码的名称。
     */
    get webName(): string;
    /**
     * 获取当前编码的 Windows 代码页标识符。
     * @returns 与当前编码最紧密对应的 Windows 操作系统代码页。 - 或 - 如果没有对应的代码页，则为 0。
     */
    get windowsCodePage(): number;
    /**
     * 初始化 UnicodeEncoding 类的新实例。
     */
    constructor();
    /**
     * 使用指定的大端字节序和字节顺序标记初始化 UnicodeEncoding 类的新实例。
     * @param bigEndian 指示是否使用大端字节序；如果为 true，则使用大端字节序，否则使用小端字节序。
     * @param byteOrderMark 指示是否提供一个 Unicode 字节顺序标记 (BOM)。
     */
    constructor(bigEndian: boolean, byteOrderMark: boolean);
    private static [CONSTRUCTOR_SYMBOL];
    /**
     * 计算对指定 String 中的字符进行编码时所产生的字节数。
     * @param s 包含要编码的字符集的字符串。
     * @returns 对指定字符进行编码后生成的字节数。
     */
    getByteCount(s: string): number;
    /**
     * 将指定字符串中的所有字符编码为一个字节序列。
     * @param s 包含要编码的字符的字符串。
     * @returns 一个字节数组，包含对指定的字符集进行编码的结果。
     */
    getBytes(s: string): Uint8Array;
    /**
     * 将指定字符串中的一组字符编码为一个字节序列。
     * @param s 包含要编码的字符的字符串。
     * @param index 第一个要编码的字符的索引。
     * @param count 要编码的字符的数目。
     * @returns 一个字节数组，包含对指定的字符集进行编码的结果。
     * @throws {RangeError} index 或 count 也不可小于零。 - 或 - index 和 count 不表示 s 中的有效范围。
     */
    getBytes(s: string, index: number, count: number): Uint8Array;
    /**
     * 计算对指定字节数组中的所有字节进行解码所产生的字符数。
     * @param bytes 包含要解码的字节序列的字节数组。
     * @returns 对指定字节序列进行解码所产生的字符数。
     */
    getCharCount(bytes: Uint8Array): number;
    /**
     * 计算对字节序列（从指定字节数组开始）进行解码所产生的字符数。
     * @param bytes 包含要解码的字节序列的字节数组。
     * @param index 第一个要解码的字节的索引。
     * @param count 要解码的字节数。
     * @returns 对指定字节序列进行解码所产生的字符数。
     * @throws {RangeError} index 或 count 也不可小于零。 - 或 - index 和 count 不表示 bytes 中的有效范围。
     */
    getCharCount(bytes: Uint8Array, index: number, count: number): number;
    /**
     * 返回对应于当前编码的 UTF-16 格式的前导码。
     * @returns 如果在构造函数中请求了字节顺序标记，则该字节数组包含相应的 UTF-16 BOM（大端序为 0xFE, 0xFF；小端序为 0xFF, 0xFE）；否则此方法返回一个长度为零的字节数组。
     */
    getPreamble(): Uint8Array;
    /**
     * 将指定字节数组中的所有字节解码为一个字符串。
     * @param bytes 包含要解码的字节序列的字节数组。
     * @returns 解码后的字符串。
     */
    getString(bytes: Uint8Array): string;
    /**
     * 将指定字节数组中的一个字节序列解码为一个字符串。
     * @param bytes 包含要解码的字节序列的字节数组。
     * @param index 第一个要解码的字节的索引。
     * @param count 要解码的字节数。
     * @returns 解码后的字符串。
     * @throws {RangeError} index 或 count 也不可小于零。 - 或 - index 和 count 不表示 bytes 中的有效范围。
     */
    getString(bytes: Uint8Array, index: number, count: number): string;
}
export {};
//# sourceMappingURL=unicode-encoding.d.ts.map