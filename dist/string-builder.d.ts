import List from "@jyostudio/list";
declare const CONSTRUCTOR_SYMBOL: unique symbol;
/**
 * 表示可变字符字符串。
 */
export default class StringBuilder {
    #private;
    /**
     * 键值对，允许通过索引访问字符。
     */
    [key: number]: string;
    /**
     * 获取此实例的最大容量。
     * @returns 此实例可容纳的最大字符数。
     */
    get maxCapacity(): number;
    /**
     * 获取当前 StringBuilder 对象的长度。
     * @returns 此实例当前的字符数。
     */
    get length(): number;
    /**
     * 设置当前 StringBuilder 对象的长度。
     * @param value 此实例新的字符数。
     */
    set length(value: number);
    /**
     * 初始化 StringBuilder 类的新实例。
     */
    constructor();
    /**
     * 初始化 StringBuilder 类的新实例，该类可增长到指定的最大容量。
     * @param maxCapacity 当前字符串可包含的最大字符数。
     */
    constructor(maxCapacity: number);
    /**
     * 使用指定的字符串初始化 StringBuilder 类的新实例。
     * @param value 用于初始化实例值的字符串。
     */
    constructor(value: string);
    /**
     * 从指定的子字符串初始化 StringBuilder 类的新实例。
     * @param value 字符串包含用于初始化此实例值的子字符串。
     * @param startIndex value 中子字符串开始的位置。
     * @param length 子字符串中的字符数。
     */
    constructor(value: string, startIndex: number, length: number);
    /**
     * [私有]构造函数的内部实现。
     * @param params 构造函数参数。
     * @returns StringBuilder 实例。
     */
    private static [CONSTRUCTOR_SYMBOL];
    /**
     * 实现迭代器接口。
     * @returns 字符迭代器。
     */
    [Symbol.iterator](): Iterator<string>;
    /**
     * 向此实例追加指定的布尔值的字符串表示形式。
     * @param value 要追加的布尔值。
     * @returns 完成追加操作后对此实例的引用。
     */
    append(value: boolean): StringBuilder;
    /**
     * 向此实例追加指定字符串的副本。
     * @param value 要追加的字符串。
     * @returns 完成追加操作后对此实例的引用。
     */
    append(value: string): StringBuilder;
    /**
     * 向此实例追加 Unicode 字符的字符串表示形式指定数目的副本。
     * @param value 要追加的字符。
     * @param repeatCount 要追加 value 的次数。
     * @returns 完成追加操作后对此实例的引用。
     */
    append(value: string, repeatCount: number): StringBuilder;
    /**
     * 向此实例追加指定子字符串的副本。
     * @param value 包含要追加的子字符串的字符串。
     * @param startIndex value 中子字符串开始的位置。
     * @param count 要追加的 value 中的字符数。
     * @returns 完成追加操作后对此实例的引用。
     */
    append(value: string, startIndex: number, count: number): StringBuilder;
    /**
     * 向此实例追加指定数组中的 Unicode 字符的字符串表示形式。
     * @param value 要追加的字符数组。
     * @returns 完成追加操作后对此实例的引用。
     */
    append(value: string[] | List<String>): StringBuilder;
    /**
     * 向此实例追加指定的 Unicode 字符子数组的字符串表示形式。
     * @param value 字符数组。
     * @param startIndex value 中的起始位置。
     * @param charCount 要追加的字符数。
     * @returns 完成追加操作后对此实例的引用。
     */
    append(value: string[] | List<String>, startIndex: number, charCount: number): StringBuilder;
    /**
     * 向此实例追加整数的字符串表示形式。
     * @param value 要追加的值。
     * @returns 完成追加操作后对此实例的引用。
     */
    append(value: number): StringBuilder;
    /**
     * 向此实例追加指定对象的字符串表示形式。
     * @param value 要追加的对象。
     * @returns 完成追加操作后对此实例的引用。
     */
    append(value: object): StringBuilder;
    /**
     * 将默认的行终止符追加到当前 StringBuilder 对象的末尾。
     * @returns 完成追加操作后对此实例的引用。
     */
    appendLine(): StringBuilder;
    /**
     * 将后面跟有默认行终止符的指定字符串的副本追加到当前 StringBuilder 对象的末尾。
     * @param value 要追加的字符串。
     * @returns 完成追加操作后对此实例的引用。
     */
    appendLine(value: string): StringBuilder;
    /**
     * 从当前 StringBuilder 实例中移除所有字符。
     * @returns 其 StringBuilder.Length 为 0（零）的对象。
     */
    clear(): StringBuilder;
    /**
     * 将此实例的指定段中的字符复制到目标数组的指定段中。
     * @param sourceIndex 此实例中开始复制字符的位置。索引是从零开始的。
     * @param destination 要将字符复制到的目标数组。
     * @param destinationIndex destination 中将从其开始复制字符的起始位置。索引是从零开始的。
     * @param count 要复制的字符数。
     */
    copyTo(sourceIndex: number, destination: string[], destinationIndex: number, count: number): void;
    /**
     * 向此实例的指定位置插入布尔值的字符串表示形式。
     * @param index 插入的位置。
     * @param value 要插入的布尔值。
     * @returns 完成插入操作后对此实例的引用。
     */
    insert(index: number, value: boolean): StringBuilder;
    /**
     * 向此实例的指定位置插入字符串的副本。
     * @param index 插入的位置。
     * @param value 要插入的字符串。
     * @returns 完成插入操作后对此实例的引用。
     */
    insert(index: number, value: string): StringBuilder;
    /**
     * 向此实例的指定位置插入字符串的指定数量的副本。
     * @param index 插入的位置。
     * @param value 要插入的字符串。
     * @param repeatCount 要插入的副本数。
     * @returns 完成插入操作后对此实例的引用。
     */
    insert(index: number, value: string, repeatCount: number): StringBuilder;
    /**
     * 向此实例的指定位置插入字符数组。
     * @param index 插入的位置。
     * @param value 要插入的字符数组。
     * @returns 完成插入操作后对此实例的引用。
     */
    insert(index: number, value: string[] | List<String>): StringBuilder;
    /**
     * 向此实例的指定位置插入字符子数组。
     * @param index 插入的位置。
     * @param value 字符数组。
     * @param startIndex value 中的起始位置。
     * @param charCount 要插入的字符数。
     * @returns 完成插入操作后对此实例的引用。
     */
    insert(index: number, value: string[] | List<String>, startIndex: number, charCount: number): StringBuilder;
    /**
     * 向此实例的指定位置插入数值的字符串表示形式。
     * @param index 插入的位置。
     * @param value 要插入的数值。
     * @returns 完成插入操作后对此实例的引用。
     */
    insert(index: number, value: number): StringBuilder;
    /**
     * 向此实例的指定位置插入对象的字符串表示形式。
     * @param index 插入的位置。
     * @param value 要插入的对象。
     * @returns 完成插入操作后对此实例的引用。
     */
    insert(index: number, value: object): StringBuilder;
    /**
     * 将指定范围的字符从此实例中移除。
     * @param startIndex 此实例中开始移除操作的从零开始的位置。
     * @param length 要删除的字符数。
     * @returns 切除操作完成后对此实例的引用。
     */
    remove(startIndex: number, length: number): StringBuilder;
    /**
     * 将此实例中出现的所有指定字符替换为其他指定字符。
     * @param oldValue 要替换的字符。
     * @param newValue 替换 oldValue 的字符。
     * @returns 对此实例的引用，其中 oldValue 的所有实例被 newValue 替换。
     */
    replace(oldValue: string, newValue: string): StringBuilder;
    /**
     * 将此实例的子字符串中出现的所有指定字符替换为其他指定字符。
     * @param oldValue 要替换的字符。
     * @param newValue 替换 oldValue 的字符。
     * @param startIndex 此实例中子字符串开始的位置。
     * @param count 子字符串的长度。
     * @returns 对此实例的引用，其中从 startIndex 到 startIndex + count - 1 的范围内 oldValue 的所有实例被 newValue 替换。
     */
    replace(oldValue: string, newValue: string, startIndex: number, count: number): StringBuilder;
    /**
     * 将此实例的值转换为 String。
     * @returns 其值与此实例相同的字符串。
     */
    toString(): string;
    /**
     * 将此实例中子字符串的值转换为 String。
     * @param startIndex 此实例内子字符串的起始位置。
     * @param length 子字符串的长度。
     * @returns 一个字符串，其值与此实例的指定子字符串相同。
     */
    toString(startIndex: number, length: number): string;
}
export {};
//# sourceMappingURL=string-builder.d.ts.map