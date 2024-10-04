import Encoding from "./encoding";

/**
 * 表示 Unicode 字符的 UTF-8 编码。
 * @class
 */
export default class UTF8Encoding extends Encoding {
    /**
     * 初始化 UTF8Encoding 类的新实例。
     * @constructor
     * @returns {UTF8Encoding} UTF8Encoding 类的新实例。
     */
    constructor();

    /**
     * 初始化 UTF8Encoding 类的新实例。 参数指定是否提供一个 Unicode 字节顺序标记。
     * @constructor
     * @param {Boolean} encoderShouldEmitUTF8Identifier 如果为 true，则指定 UTF8Encoding.getPreamble 方法返回 Unicode 字节顺序标记；否则为 false。 有关详细信息，请参阅备注部分。
     * @returns {UTF8Encoding} UTF8Encoding 类的新实例。
     */
    constructor(encoderShouldEmitUTF8Identifier: Boolean);

    /**
     * 计算对指定 String 中的字符进行编码时所产生的字节数。
     * @param {String} s 包含要编码的字符集的字符串。
     * @returns {Number} 对指定字符进行编码后生成的字节数。
     */
    getByteCount(s: String): Number;

    /**
     * 将指定字符串中的所有字符编码为一个字节序列。
     * @param {String} s 包含要编码的字符的字符串。
     * @returns {Uint8Array} 一个字节数组，包含对指定的字符集进行编码的结果。
     */
    getBytes(s: String): Uint8Array;

    /**
     * 将指定字符数组中的一组字符编码为一个字节序列。
     * @param {String} s 包含要编码的字符的字符串。
     * @param {Number} charIndex 第一个要编码的字符的索引。
     * @param {Number} charCount 要编码的字符的数目。
     * @returns {Uint8Array} 一个字节数组，包含对指定的字符集进行编码的结果。
     * @throws {RangeError} index 或 count 也不可小于零。 - 或 - index 和 count 不表示 s 中的有效范围。
     */
    getBytes(s: String, charIndex: Number, charCount: Number): Uint8Array;

    /**
     * 计算对指定字节数组中的所有字节进行解码所产生的字符数。
     * @param {Uint8Array} bytes 包含要解码的字节序列的字节数组。
     * @returns {Number} 对指定字节序列进行解码所产生的字符数。
     */
    getCharCount(bytes: Uint8Array): Number;

    /**
     * 计算对字节序列（从指定字节数组开始）进行解码所产生的字符数。
     * @param {Uint8Array} bytes 包含要解码的字节序列的字节数组。
     * @param {Number} index 第一个要解码的字节的索引。
     * @param {Number} count 要解码的字节数。
     * @returns {Number} 对指定字节序列进行解码所产生的字符数。
     * @throws {RangeError} index 或 count 也不可小于零。 - 或 - index 和 count 不表示 bytes 中的有效范围。
     */
    getCharCount(bytes: Uint8Array, index: Number, count: Number): Number;

    /**
     * 返回指定所用编码的字节序列。
     * @returns {Array<Number>} 一个数组，包含指定所用编码的字节序列。 - 或 - 长度为零的数组（如果不需要前导码）。
     */
    getPreamble(): Array<Number>;

    /**
     * 将指定字节数组中的所有字节解码为一个字符串。
     * @param {Uint8Array} bytes 包含要解码的字节序列的字节数组。
     * @returns {String} 包含指定字节序列解码结果的字符串。
     */
    getString(bytes: Uint8Array): String;

    /**
     * 将指定字节数组中的一个字节序列解码为一个字符串。
     * @param {Uint8Array} bytes 包含要解码的字节序列的字节数组。
     * @param {Number} index 第一个要解码的字节的索引。
     * @param {Number} count 要解码的字节数。
     * @returns {String} 包含指定字节序列解码结果的字符串。
     * @throws {RangeError} index 或 count 也不可小于零。 - 或 - index 和 count 不表示 bytes 中的有效范围。
     */
    getString(bytes: Uint8Array, index: Number, count: Number): String;
}
