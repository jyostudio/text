import overload from "@jyostudio/overload";
import Encoding from "./encoding";

const CONSTRUCTOR_SYMBOL = Symbol("constructor");

/**
 * 提供有关编码的基本信息。
 */
export default class EncodingInfo {
    /**
     * [私有]编码的代码页标识符。
     */
    #codePage: number = 0;

    /**
     * [私有]编码的用户可读说明。
     */
    #displayName: string = "";

    /**
     * [私有]与 Internet 分配号机构 (IANA) 注册的编码的名称。
     */
    #name: string = "";

    /**
     * [私有]可用的编码别名名称列表。
     */
    #names: string[] = [];

    /**
     * [私有]编码对象。
     */
    #encoding: Encoding | null = null;

    /**
     * 获取编码的代码页标识符。
     * @returns 编码的代码页标识符。
     */
    public get codePage(): number {
        return this.#codePage;
    }

    /**
     * 获取编码的用户可读说明。
     * @returns 编码的用户可读说明。
     */
    public get displayName(): string {
        return this.#displayName;
    }

    /**
     * 获取与 Internet 分配号机构 (IANA) 注册的编码的名称。
     * @returns IANA 的编码的名称。 有关 IANA 详细信息，请参阅 www.iana.org。
     */
    public get name(): string {
        return this.#name;
    }

    /**
     * 获取可用的编码别名名称列表。
     * @returns 可用的编码别名名称列表。
     */
    public get names(): string[] {
        return this.#names;
    }

    /**
     * 创建一个 EncodingInfo 实例。
     * @param codePage 编码的代码页标识符。
     * @param displayName 编码的用户可读说明。
     * @param name IANA 注册的编码的名称。
     * @param names 可用的编码别名名称列表。
     * @param encoding 编码对象。
     */
    public constructor(codePage: number, displayName: string, name: string, names: string[], encoding: Encoding);
    public constructor(...params: any) {
        this[CONSTRUCTOR_SYMBOL].apply(this, params);
    }

    [CONSTRUCTOR_SYMBOL](...params: any): void {
        EncodingInfo.prototype[CONSTRUCTOR_SYMBOL] = overload([Number, String, String, Array, Object], function (this: EncodingInfo, codePage: number, displayName: string, name: string, names: string[], encoding: any): void {
            this.#codePage = codePage;
            this.#displayName = displayName;
            this.#name = name;
            this.#names = names;
            this.#encoding = encoding;
        });

        this[CONSTRUCTOR_SYMBOL].apply(this, params);
    }

    /**
     * 返回 Encoding 对象，它对应于当前 EncodingInfo 对象。
     * @returns 一个 Encoding 对象，它对应于当前 EncodingInfo 对象。
     */
    public getEncoding(): Encoding;
    public getEncoding(...params: any): any {
        EncodingInfo.prototype.getEncoding = overload([], function (this: EncodingInfo): Encoding {
            return this.#encoding!;
        });

        return EncodingInfo.prototype.getEncoding.apply(this, params);
    }
}