import List from "@jyostudio/list";
import EncodingInfo from "./encodingInfo";
import ASCIIEncoding from "./asciiEncoding";
import UTF8Encoding from "./utf8Encoding";
import UTF32Encoding from "./utf32Encoding";
import UnicodeEncoding from "./unicodeEncoding";

/**
 * 表示字符编码。
 * @class
 */
export default class Encoding {
    /**
     * 获取 ASCII 格式的编码。
     * @returns {ASCIIEncoding} ASCII 格式的编码。
     */
    static get ascii(): ASCIIEncoding;

    /**
     * 获取 UTF-8 格式的编码。
     * @returns {UTF8Encoding} UTF-8 格式的编码。
     */
    static get utf8(): UTF8Encoding;

    /**
     * 获取 UTF-32 格式的编码。
     * @returns {UTF32Encoding} UTF-32 格式的编码。
     */
    static get utf32(): UTF32Encoding;

    /**
     * 获取使用 Little-Endian 字节顺序的 UTF-16 格式的编码。
     * @returns {UnicodeEncoding} 使用 Little-Endian 字节顺序的 UTF-16 格式的编码。
     */
    static get unicode(): UnicodeEncoding;

    /**
     * 获取使用 Big-Endian 字节顺序的 UTF-16 格式的编码。
     * @returns {UnicodeEncoding} 使用 Big-Endian 字节顺序的 UTF-16 格式的编码。
     */
    static get bigEndianUnicode(): UnicodeEncoding;

    /**
     * 在派生类中重写时，获取可与邮件代理正文标记一起使用的当前编码的名称。
     * @returns {String} 可与邮件代理正文标记一起使用的当前 Encoding 的名称。 - 或 - 如果当前 Encoding 无法使用，则为空字符串 ("")。
     */
    get bodyName(): String;

    /**
     * 在派生类中重写时，获取当前 Encoding 的代码页标识符。
     * @returns {String} 当前 Encoding 的代码页标识符。
     */
    get codePage(): Number;

    /**
     * 在派生类中重写时，获取当前编码的用户可读说明。
     * @returns {String} 当前 Encoding 的用户可读说明。
     */
    get encodingName(): String;

    /**
     * 在派生类中重写时，获取可与邮件代理头标记一起使用的当前编码的名称。
     * @returns {String} 与邮件代理头标记一起使用的当前 Encoding 的名称。 - 或 - 如果当前 Encoding 无法使用，则为空字符串 ("")。
     */
    get headerName(): String;

    /**
     * 在派生类中重写时，获取一个值，该值指示浏览器客户端是否可以使用当前的编码显示内容。
     * @returns {Boolean} 如果浏览器客户端可以使用当前 true 显示内容，则为 Encoding；否则为 false。
     */
    get isBrowserDisplay(): Boolean;

    /**
     * 在派生类中重写时，获取一个值，该值指示浏览器客户端是否可以使用当前的编码保存内容。
     * @returns {Boolean} 如果浏览器客户端可以使用当前 true 保存内容，则为 Encoding；否则为 false。
     */
    get isBrowserSave(): Boolean;

    /**
     * 在派生类中重写时，获取一个值，该值指示邮件和新闻客户端是否可以使用当前的编码显示内容。
     * @returns {Boolean} 如果邮件和新闻客户端可以使用当前 true 显示内容，则为 Encoding；否则为 false。
     */
    get isMailNewsDisplay(): Boolean;

    /**
     * 在派生类中重写时，获取一个值，该值指示邮件和新闻客户端是否可以使用当前的编码保存内容。
     * @returns {Boolean} 如果邮件和新闻客户端可以使用当前 true 保存内容，则为 Encoding；否则为 false。
     */
    get isMailNewsSave(): Boolean;

    /**
     * 在派生类中重写时，获取一个值，该值指示当前的编码是否为只读。
     * @returns {Boolean} 如果当前 true 为只读，则为 Encoding；否则为 false。 默认值为 true。
     */
    get isReadOnly(): Boolean;

    /**
     * 在派生类中重写时，获取一个值，该值指示当前的编码是否使用单字节码位。
     * @returns {Boolean} 如果当前 true 使用单字节码位，则为 Encoding；否则为 false。
     */
    get isSingleByte(): Boolean;

    /**
     * 在派生类中重写时，获取在 Internet 编号分配管理机构 (IANA) 注册的当前编码的名称。
     * @returns {String} 当前 Encoding 的 IANA 名称。
     */
    get webName(): String;

    /**
     * 在派生类中重写时，获取与当前编码最紧密对应的 Windows 操作系统代码页。
     * @returns {Number} 与当前 Encoding 最紧密对应的 Windows 操作系统代码页。
     */
    get windowsCodePage(): Number;

    /**
     * 初始化 Encoding 类的新实例。
     * @returns {Encoding} Encoding 类的新实例。
     */
    constructor();

    /**
     * 初始化对应于指定代码页的 Encoding 类的新实例。
     * @param {Number} codePage 首选编码的代码页标识符。 - 或 - 0，使用默认编码。
     * @returns {Encoding} Encoding 类的新实例。
     */
    constructor(codePage: Number);

    /**
     * 将整个字节数组从一种编码转换为另一种编码。
     * @param {Encoding} srcEncoding bytes 的编码格式。
     * @param {Encoding} dstEncoding 目标编码格式。
     * @param {Uint8Array} bytes 要转换的字节。
     * @returns {Uint8Array} Uint8类型数组，其中包含将 bytes 从 srcEncoding 转换为 dstEncoding 的结果。
     */
    static convert(srcEncoding: Encoding, dstEncoding: Encoding, bytes: Uint8Array): Uint8Array;

    /**
     * 将字节数组内某个范围的字节从一种编码转换为另一种编码。
     * @param {Encoding} srcEncoding 源数组 bytes 的编码。
     * @param {Encoding} dstEncoding 输出数组的编码。
     * @param {Uint8Array} bytes 要转换的字节数组。
     * @param {Number} index 要转换的 bytes 中第一个元素的索引。
     * @param {Number} count 要转换的字节数。
     * @returns {Uint8Array} Uint8类型数组，其中包含将 bytes 中某个范围的字节从 srcEncoding 转换为 dstEncoding 的结果。
     */
    static convert(srcEncoding: Encoding, dstEncoding: Encoding, bytes: Uint8Array, index: Number, count: Number): Uint8Array;

    /**
     * 返回与指定代码页标识符关联的编码。
     * @param {Number} codepage 首选编码的代码页标识符。 可能值均在 Encoding 类主题中出现的表的“代码页”一列中列出。 - 或 - 0（零），使用默认编码。
     * @returns {Encoding} 与指定代码页关联的编码。
     * @throws {RangeError} codepage 小于零或大于 65535。
     */
    static getEncoding(codepage: Number): Encoding;

    /**
     * 返回与指定代码页名称关联的编码。
     * @param {String} name 首选编码的代码页名称。 Encoding.webName 属性返回的所有值均有效。 可能值均在 Encoding 类主题中出现的表的“名称”一列中列出。
     * @returns {Encoding} 与指定代码页关联的编码。
     * @throws {Error} name 不是有效的代码页名称。 - 或 - 代码页由 name 不支持由基础平台。
     */
    static getEncoding(name: String): Encoding;

    /**
     * 返回包含所有编码的集合。
     * @returns {List<EncodingInfo>} 包含所有编码的集合。
     */
    static getEncodings(): List<EncodingInfo>;

    /**
     * 确定指定的对象是否等同于当前实例。
     * @param {Object} value 与当前实例进行比较的对象。
     * @returns {Boolean} 如果 true 是 value 的一个实例并且等于当前实例，则为 Encoding；否则，为 false。
     */
    equals(value: Object): Boolean;

    /**
     * 在派生类中重写时，计算对指定字符串中的字符进行编码所产生的字节数。
     * @param {String} s 包含要编码的字符集的字符串。
     * @returns {Number} 对指定字符进行编码后生成的字节数。
     */
    getByteCount(s: String): Number;

    /**
     * 在派生类中重写时，将指定字符串中的所有字符编码为一个字节序列。
     * @param {String} s 包含要编码的字符的字符串。
     * @returns {Uint8Array} 一个字节数组，包含对指定的字符集进行编码的结果。
     */
    getBytes(s: String): Uint8Array;

    /**
     * 在派生类中重写时，将指定字符数组中的一组字符编码为一个字节序列。
     * @param {String} s 包含要编码的字符的字符串。
     * @param {Number} charIndex 第一个要编码的字符的索引。
     * @param {Number} charCount 要编码的字符的数目。
     * @returns {Uint8Array} 一个字节数组，包含对指定的字符集进行编码的结果。
     * @throws {RangeError} index 或 count 也不可小于零。 - 或 - index 和 count 不表示 s 中的有效范围。
     */
    getBytes(s: String, charIndex: Number, charCount: Number): Uint8Array;

    /**
     * 在派生类中重写时，计算对指定字节数组中的所有字节进行解码所产生的字符数。
     * @param {Uint8Array} bytes 包含要解码的字节序列的字节数组。
     * @returns {Number} 对指定字节序列进行解码所产生的字符数。
     */
    getCharCount(bytes: Uint8Array): Number;

    /**
     * 在派生类中重写时，计算对字节序列（从指定字节数组开始）进行解码所产生的字符数。
     * @param {Uint8Array} bytes 包含要解码的字节序列的字节数组。
     * @param {Number} index 第一个要解码的字节的索引。
     * @param {Number} count 要解码的字节数。
     * @returns {Number} 对指定字节序列进行解码所产生的字符数。
     * @throws {RangeError} index 或 count 也不可小于零。 - 或 - index 和 count 不表示 bytes 中的有效范围。
     */
    getCharCount(bytes: Uint8Array, index: Number, count: Number): Number;

    /**
     * 在派生类中重写时，返回指定所用编码的字节序列。
     * @returns {Array<Number>} 一个数组，包含指定所用编码的字节序列。 - 或 - 长度为零的数组（如果不需要前导码）。
     */
    getPreamble(): Array<Number>;

    /**
     * 在派生类中重写时，将指定字节数组中的所有字节解码为一个字符串。
     * @param {Uint8Array} bytes 包含要解码的字节序列的字节数组。
     * @returns {String} 包含指定字节序列解码结果的字符串。
     */
    getString(bytes: Uint8Array): String;

    /**
     * 在派生类中重写时，将指定字节数组中的一个字节序列解码为一个字符串。
     * @param {Uint8Array} bytes 包含要解码的字节序列的字节数组。
     * @param {Number} index 第一个要解码的字节的索引。
     * @param {Number} count 要解码的字节数。
     * @returns {String} 包含指定字节序列解码结果的字符串。
     * @throws {RangeError} index 或 count 也不可小于零。 - 或 - index 和 count 不表示 bytes 中的有效范围。
     */
    getString(bytes: Uint8Array, index: Number, count: Number): String;
}
