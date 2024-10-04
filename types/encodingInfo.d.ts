import Encoding from "./encoding";

/**
 * 提供有关编码的基本信息。
 * @class
 */
export default class EncodingInfo {
    /**
     * 获取编码的代码页标识符。
     * @returns {Number} 编码的代码页标识符。
     */
    get codePage(): Number;

    /**
     * 获取编码的用户可读说明。
     * @returns {String} 编码的用户可读说明。
     */
    get displayName(): String;

    /**
     * 获取与 Internet 分配号机构 (IANA) 注册的编码的名称。
     * @returns {String} IANA 的编码的名称。 有关 IANA 详细信息，请参阅 www.iana.org。
     */
    get name(): String;

    /**
     * 获取可用的编码别名名称列表。
     * @returns {Array<String>} 可用的编码别名名称列表。
     */
    get names(): Array<String>;

    /**
     * 返回 Encoding 对象，它对应于当前 EncodingInfo 对象。
     * @returns {Encoding} 一个 Encoding 对象，它对应于当前 EncodingInfo 对象。
     */
    getEncoding(): Encoding;

    /**
     * 获取一个值，该值指示指定的对象是否等于当前 EncodingInfo 对象。
     * @param {EncodingInfo} value 要与当前比较的对象 EncodingInfo 对象。
     * @returns {Boolean} true 如果 value 是 EncodingInfo 对象以及是否等同于当前 EncodingInfo 对象; 否则为 false。
     */
    equals(value: EncodingInfo): Boolean;
}
