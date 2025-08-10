import Encoding from "./encoding";
declare const CONSTRUCTOR_SYMBOL: unique symbol;
/**
 * 提供有关编码的基本信息。
 */
export default class EncodingInfo {
    #private;
    /**
     * 获取编码的代码页标识符。
     * @returns 编码的代码页标识符。
     */
    get codePage(): number;
    /**
     * 获取编码的用户可读说明。
     * @returns 编码的用户可读说明。
     */
    get displayName(): string;
    /**
     * 获取与 Internet 分配号机构 (IANA) 注册的编码的名称。
     * @returns IANA 的编码的名称。 有关 IANA 详细信息，请参阅 www.iana.org。
     */
    get name(): string;
    /**
     * 获取可用的编码别名名称列表。
     * @returns 可用的编码别名名称列表。
     */
    get names(): string[];
    /**
     * 创建一个 EncodingInfo 实例。
     * @param codePage 编码的代码页标识符。
     * @param displayName 编码的用户可读说明。
     * @param name IANA 注册的编码的名称。
     * @param names 可用的编码别名名称列表。
     * @param encoding 编码对象。
     */
    constructor(codePage: number, displayName: string, name: string, names: string[], encoding: Encoding);
    private static [CONSTRUCTOR_SYMBOL];
    /**
     * 返回 Encoding 对象，它对应于当前 EncodingInfo 对象。
     * @returns 一个 Encoding 对象，它对应于当前 EncodingInfo 对象。
     */
    getEncoding(): Encoding;
}
export {};
//# sourceMappingURL=encoding-info.d.ts.map