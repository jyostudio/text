import { DecoderFallbackBuffer } from "./decoderFallbackBuffer";

/**
 * @typedef {Object} ConvertResult
 * @property {Number} charsUsed 此方法在返回时包含转换产生的 chars 中的字符数。该参数未经初始化即被传递。
 * @property {Number} bytesUsed 此方法在返回时包含用于转换的字节数。该参数未经初始化即被传递。
 * @property {Boolean} completed 此方法返回时，如果 byteCount 指定的所有字符已全部转换，则包含 true；否则包含 false。该参数未经初始化即被传递。
 */

/**
 * 将一个编码字节序列转换为一组字符。
 * @abstract
 * @class
 */
export default class Decoder {
  /**
   * 获取当前 Decoder 对象的 DecoderFallback 对象。
   * @returns {DecoderFallback} 一个 DecoderFallback 对象。
   */
  get fallback(): DecoderFallback;

  /**
   * 设置当前 Decoder 对象的 DecoderFallback 对象。
   * @param {DecoderFallback} value 一个 DecoderFallback 对象。
   * @throws {TypeError} value 为 null。
   * @throws {Error} fallbackBuffer 已经在使用中。
   */
  set fallback(value: DecoderFallback);

  /**
   * 获取与当前 Decoder 对象关联的 DecoderFallbackBuffer 对象。
   * @returns {DecoderFallbackBuffer} 一个 DecoderFallbackBuffer 对象。
   */
  get fallbackBuffer(): DecoderFallbackBuffer;

  /**
   * 初始化 Decoder 类的新实例。
   * @protected
   */
  constructor();

  /**
   * 在派生类中重写时，将解码器设置回它的初始状态。
   * @virtual
   */
  reset();

  /**
   * 在派生类中重写时，计算对字节序列（从指定的字节指针开始）进行解码所产生的字符数。一个参数，指示计算后是否要清除解码器的内部状态。
   * @virtual
   * @param bytes 包含要解码的字节序列的字节数组。
   * @param index 第一个要解码的字节的索引。
   * @param count 要解码的字节数。
   * @returns {Number} 对指定的字节序列和内部缓冲区中的任何字节进行解码所产生的字符数。
   */
  getCharCount(bytes: Uint8Array, index: Number, count: Number): Number;

  /**
   * 在派生类中重写时，计算对字节序列（从指定字节数组开始）进行解码所产生的字符数。一个参数，指示计算后是否要清除解码器的内部状态。
   * @virtual
   * @param bytes 包含要解码的字节序列的字节数组。
   * @param index 第一个要解码的字节的索引。
   * @param count 要解码的字节数。
   * @param flush 如果要在计算后模拟编码器内部状态的清除过程，则为 true；否则为 false。
   */
  getCharCount(
    bytes: Uint8Array,
    index: Number,
    count: Number,
    flush: Boolean
  ): Number;

  /**
   * 在派生类中重写时，将字节序列中的一个字节序列解码为一个字符序列。一个参数，指示解码后是否要清除解码器的内部状态。
   * @virtual
   * @param bytes 包含要解码的字节序列的字节数组。
   * @param count 要解码的字节数。
   * @param flush 如果要在解码后模拟编码器内部状态的清除过程，则为 true；否则为 false。
   */
  getCharCount(bytes: Uint8Array, count: Number, flush: Boolean): Number;

  /**
   * 在派生类中重写时，将指定字节数组的字节序列和内部缓冲区中的任何字节解码到指定的字符数组。
   * @virtual
   * @param bytes 包含要解码的字节序列的字节数组。
   * @param byteIndex 第一个要解码的字节的索引。
   * @param byteCount 要解码的字节数。
   * @param chars 要用于包含所产生的字符集的字符数组。
   * @param charIndex 开始写入所产生的字符集的索引位置。
   * @returns {Number} 写入 chars 的实际字符数。
   */
  getChars(
    bytes: Uint8Array,
    byteIndex: Number,
    byteCount: Number,
    chars: String,
    charIndex: Number
  ): Number;

  /**
   * 在派生类中重写时，将指定字节数组的字节序列和内部缓冲区中的任何字节解码到指定的字符数组。
   * @virtual
   * @param bytes 包含要解码的字节序列的字节数组。
   * @param byteIndex 第一个要解码的字节的索引。
   * @param byteCount 要解码的字节数。
   * @param chars 要用于包含所产生的字符集的字符数组。
   * @param charIndex 开始写入所产生的字符集的索引位置。
   * @param flush 如果要在解码后模拟编码器内部状态的清除过程，则为 true；否则为 false。
   * @returns {Number} 写入 chars 的实际字符数。
   */
  getChars(
    bytes: Uint8Array,
    byteIndex: Number,
    byteCount: Number,
    chars: String,
    charIndex: Number,
    flush: Boolean
  ): Number;

  /**
   * 在派生类中重写时，将指定字节数组的字节序列解码为一个字符数组。
   * @virtual
   * @param bytes 包含要解码的字节序列的字节数组。
   * @param byteCount 要解码的字节数。
   * @param chars 要用于包含所产生的字符集的字符数组。
   * @param charCount 要写入的字符数。
   * @returns {Number} 写入 chars 的实际字符数。
   */
  getChars(
    bytes: Uint8Array,
    byteCount: Number,
    chars: String,
    charCount: Number,
    flush: Boolean
  ): Number;

  /**
   * 将已编码字节的数组转换为 Unicode 字符，然后将结果存储在字节数组中。
   * @param bytes 要转换的字节数组。
   * @param byteIndex 要转换的 bytes 的第一个元素。
   * @param byteCount 要转换的 bytes 的元素数。
   * @param chars 一个数组，存储已转换的字符。
   * @param charIndex 存储数据的 chars 中的第一个元素。
   * @param charCount 要用于转换的 chars 中的最大元素数。
   * @param flush 如果要指示没有要转换的更多数据，则为 true；否则为 false。
   * @param {ConvertResult} out 一个对象，包含转换操作的结果。
   */
  convert(
    bytes: Uint8Array,
    byteIndex: Number,
    byteCount: Number,
    chars: String,
    charIndex: Number,
    charCount: Number,
    flush: Boolean,
    out: Object
  );

  /**
   * 将已编码字节的数组转换为 Unicode 字符，然后将结果存储在字节数组中。
   * @param bytes 要转换的字节数组。
   * @param byteCount 要转换的 bytes 的元素数。
   * @param chars 一个数组，存储已转换的字符。
   * @param charCount 要用于转换的 chars 中的最大元素数。
   * @param flush 如果要指示没有要转换的更多数据，则为 true；否则为 false。
   * @param {ConvertResult} out 一个对象，包含转换操作的结果。
   */
  convert(
    bytes: Uint8Array,
    byteCount: Number,
    chars: String,
    charCount: Number,
    flush: Boolean,
    out: Object
  );
}
