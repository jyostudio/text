import { ReadOnlyList } from "@jyostudio/list";
import EncodingInfo from "./encoding-info";
/**
 * 表示字符编码。
 */
export default abstract class Encoding {
    #private;
    /**
     * 获取 ASCII 格式的编码。
     * @returns ASCII 格式的编码。
     */
    static get ascii(): Encoding;
    /**
     * 获取 UTF-8 格式的编码。
     * @returns UTF-8 格式的编码。
     */
    static get utf8(): Encoding;
    /**
     * 获取 UTF-32 格式的编码。
     * @returns UTF-32 格式的编码。
     */
    static get utf32(): Encoding;
    /**
     * 获取使用 Little-Endian 字节顺序的 UTF-16 格式的编码。
     * @returns 使用 Little-Endian 字节顺序的 UTF-16 格式的编码。
     */
    static get unicode(): Encoding;
    /**
     * 获取使用 Big-Endian 字节顺序的 UTF-16 格式的编码。
     * @returns 使用 Big-Endian 字节顺序的 UTF-16 格式的编码。
     */
    static get bigEndianUnicode(): Encoding;
    /**
     * 在派生类中重写时，获取可与邮件代理正文标记一起使用的当前编码的名称。
     * @returns 可与邮件代理正文标记一起使用的当前 Encoding 的名称。 - 或 - 如果当前 Encoding 无法使用，则为空字符串 ("")。
     */
    get bodyName(): string;
    /**
     * 在派生类中重写时，获取当前 Encoding 的代码页标识符。
     * @returns 当前 Encoding 的代码页标识符。
     */
    get codePage(): number;
    /**
     * 在派生类中重写时，获取当前编码的显示名称。
     * @returns 当前 Encoding 的显示名称。
     */
    get encodingName(): string;
    /**
     * 在派生类中重写时，获取可与邮件代理头标记一起使用的当前编码的名称。
     * @returns 与邮件代理头标记一起使用的当前 Encoding 的名称。 - 或 - 如果当前 Encoding 无法使用，则为空字符串 ("")。
     */
    get headerName(): string;
    /**
     * 在派生类中重写时，获取一个值，该值指示浏览器客户端是否可以使用当前的编码显示内容。
     * @returns 如果浏览器客户端可以使用当前 Encoding 显示内容，则为 true；否则为 false。
     */
    get isBrowserDisplay(): boolean;
    /**
     * 在派生类中重写时，获取一个值，该值指示浏览器客户端是否可以使用当前的编码保存内容。
     * @returns 如果浏览器客户端可以使用当前 Encoding 保存内容，则为 true；否则为 false。
     */
    get isBrowserSave(): boolean;
    /**
     * 在派生类中重写时，获取一个值，该值指示邮件和新闻客户端是否可以使用当前的编码显示内容。
     * @returns 如果邮件和新闻客户端可以使用当前 Encoding 显示内容，则为 true；否则为 false。
     */
    get isMailNewsDisplay(): boolean;
    /**
     * 在派生类中重写时，获取一个值，该值指示邮件和新闻客户端是否可以使用当前的编码保存内容。
     * @returns 如果邮件和新闻客户端可以使用当前 Encoding 保存内容，则为 true；否则为 false。
     */
    get isMailNewsSave(): boolean;
    /**
     * 在派生类中重写时，获取一个值，该值指示当前的编码是否为只读。
     * @returns 如果当前 Encoding 为只读，则为 true；否则为 false。 默认值为 true。
     */
    get isReadOnly(): boolean;
    /**
     * 在派生类中重写时，获取一个值，该值指示当前的编码是否使用单字节码位。
     * @returns 如果当前 Encoding 使用单字节码位，则为 true；否则为 false。
     */
    get isSingleByte(): boolean;
    /**
     * 在派生类中重写时，获取与 Internet 分配号机构 (IANA) 注册的编码的名称。
     * @returns 在 Internet 编号分配管理机构 (IANA) 注册的当前编码的名称。 有关 IANA 详细信息，请参阅 www.iana.org。
     */
    get webName(): string;
    /**
     * 在派生类中重写时，获取当前编码的 Windows 代码页标识符。
     * @returns 与当前编码最紧密对应的 Windows 操作系统代码页。 - 或 - 如果没有对应的代码页，则为 0。
     */
    get windowsCodePage(): number;
    /**
     * 初始化 Encoding 类的新实例。
     */
    constructor();
    /**
     * 注册一个新的编码。
     * @param encodingInfo 要注册的编码信息。
     */
    static registerEncoding(encodingInfo: EncodingInfo): void;
    /**
     * 将整个字节数组从一种编码转换为另一种编码。
     * @param srcEncoding bytes 的编码格式。
     * @param dstEncoding 目标编码格式。
     * @param bytes 要转换的字节。
     * @returns Uint8类型数组，其中包含将 bytes 从 srcEncoding 转换为 dstEncoding 的结果。
     */
    static convert(srcEncoding: Encoding, dstEncoding: Encoding, bytes: Uint8Array): Uint8Array;
    /**
     * 将字节数组内某个范围的字节从一种编码转换为另一种编码。
     * @param srcEncoding 源数组 bytes 的编码。
     * @param dstEncoding 输出数组的编码。
     * @param bytes 要转换的字节数组。
     * @param index 要转换的 bytes 中第一个元素的索引。
     * @param count 要转换的字节数。
     * @returns Uint8类型数组，其中包含将 bytes 中某个范围的字节从 srcEncoding 转换为 dstEncoding 的结果。
     */
    static convert(srcEncoding: Encoding, dstEncoding: Encoding, bytes: Uint8Array, index: number, count: number): Uint8Array;
    /**
     * 返回与指定代码页标识符关联的编码。
     * @param codePage 首选编码的代码页标识符。 可能值均在 Encoding 类主题中出现的表的“代码页”一列中列出。 - 或 - 0（零），使用默认编码。
     * @returns 与指定代码页关联的编码。
     * @throws {RangeError} codePage 小于零或大于 65535。
     * @throws {Error} 未找到编码。
     */
    static getEncoding(codePage: number): Encoding;
    /**
     * 返回与指定代码页名称关联的编码。
     * @param name 首选编码的代码页名称。 Encoding.webName 属性返回的所有值均有效。 可能值均在 Encoding 类主题中出现的表的“名称”一列中列出。
     * @returns 与指定代码页关联的编码。
     * @throws {Error} name 不是有效的代码页名称。 - 或 - name 指定的代码页不受基础平台支持。
     */
    static getEncoding(name: string): Encoding;
    /**
     * 返回包含所有已注册编码的集合。
     * @returns 包含所有已注册编码的集合。
     */
    static getEncodings(): ReadOnlyList<EncodingInfo>;
    /**
     * 在派生类中重写时，计算对指定字符串中的字符进行编码所产生的字节数。
     * @param s 包含要编码的字符集的字符串。
     * @returns 对指定字符进行编码后生成的字节数。
     */
    abstract getByteCount(s: string): number;
    /**
     * 在派生类中重写时，将指定字符串中的所有字符编码为一个字节序列。
     * @param s 包含要编码的字符的字符串。
     * @returns 一个字节数组，包含对指定的字符集进行编码的结果。
     */
    abstract getBytes(s: string): Uint8Array;
    /**
     * 在派生类中重写时，将指定字符数组中的一组字符编码为一个字节序列。
     * @param s 包含要编码的字符的字符串。
     * @param index 第一个要编码的字符的索引。
     * @param count 要编码的字符的数目。
     * @returns 一个字节数组，包含对指定的字符集进行编码的结果。
     * @throws {RangeError} index 或 count 不可小于零。 - 或 - index 和 count 不表示 s 中的有效范围。
     */
    abstract getBytes(s: string, index: number, count: number): Uint8Array;
    /**
     * 在派生类中重写时，计算对指定字节数组中的所有字节进行解码所产生的字符数。
     * @param bytes 包含要解码的字节序列的字节数组。
     * @returns 对指定字节序列进行解码所产生的字符数。
     */
    abstract getCharCount(bytes: Uint8Array): number;
    /**
     * 在派生类中重写时，计算对字节序列（从指定字节数组开始）进行解码所产生的字符数。
     * @param bytes 包含要解码的字节序列的字节数组。
     * @param index 第一个要解码的字节的索引。
     * @param count 要解码的字节数。
     * @returns 对指定字节序列进行解码所产生的字符数。
     * @throws {RangeError} index 或 count 不可小于零。 - 或 - index 和 count 不表示 bytes 中的有效范围。
     */
    abstract getCharCount(bytes: Uint8Array, index: number, count: number): number;
    /**
     * 在派生类中重写时，返回指定所用编码的字节序列。
     * @returns 一个数组，包含指定所用编码的字节序列。 - 或 - 长度为零的数组（如果不需要前导码）。
     */
    getPreamble(): Uint8Array;
    /**
     * 在派生类中重写时，将指定字节数组中的所有字节解码为一个字符串。
     * @param bytes 包含要解码的字节序列的字节数组。
     * @returns 包含指定字节序列解码结果的字符串。
     */
    abstract getString(bytes: Uint8Array): string;
    /**
     * 在派生类中重写时，将指定字节数组中的一个字节序列解码为一个字符串。
     * @param bytes 包含要解码的字节序列的字节数组。
     * @param index 第一个要解码的字节的索引。
     * @param count 要解码的字节数。
     * @returns 包含指定字节序列解码结果的字符串。
     * @throws {RangeError} index 或 count 不可小于零。 - 或 - index 和 count 不表示 bytes 中的有效范围。
     */
    abstract getString(bytes: Uint8Array, index: number, count: number): string;
}
//# sourceMappingURL=encoding.d.ts.map