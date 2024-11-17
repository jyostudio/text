import Encoding from "./encoding";

/**
 * 表示 Unicode 字符的 ASCII 字符编码。
 * @class
 */
export default class ASCIIEncoding extends Encoding {
    /**
     * 初始化 ASCIIEncoding 类的新实例。
     * @returns {ASCIIEncoding} ASCIIEncoding 类的新实例。
     */
    constructor();

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
