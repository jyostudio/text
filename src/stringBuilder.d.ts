/**
 * 表示可变字符字符串。
 * @class
 */
export default class StringBuilder {
    readonly [n: Number]: String;

    /**
     * 获取此实例的最大容量。
     * @returns {Number} 此实例可容纳的最大字符数。
     */
    get maxCapacity(): Number;

    /**
     * 获取当前 StringBuilder 对象的长度。
     * @returns {String} 此实例当前的字符数。
     */
    get length(): Number;

    /**
     * 设置当前 StringBuilder 对象的长度。
     * @param {Number} value 此实例新的字符数。
     */
    set length(value: Number);

    /**
     * 初始化 StringBuilder 类的新实例。
     * @returns {StringBuilder} StringBuilder 类的新实例。
     */
    constructor();

    /**
     * 初始化 StringBuilder 类的新实例，该类可增长到指定的最大容量。
     * @param {Number} maxCapacity 当前字符串可包含的最大字符数。
     * @returns {StringBuilder} StringBuilder 类的新实例。
     */
    constructor(maxCapacity: Number);

    /**
     * 使用指定的字符串初始化 StringBuilder 类的新实例。
     * @param {String} value 用于初始化实例值的字符串。
     * @returns {StringBuilder} StringBuilder 类的新实例。
     */
    constructor(value: String);

    /**
     * 从指定的子字符串初始化 StringBuilder 类的新实例。
     * @param {String} value 字符串包含用于初始化此实例值的子字符串。
     * @param {Number} startIndex value 中子字符串开始的位置。
     * @param {Number} length 子字符串中的字符数。
     * @returns {StringBuilder} StringBuilder 类的新实例。
     */
    constructor(value: String, startIndex: Number, length: Number);

    /**
     * 向此实例追加指定的布尔值的字符串表示形式。
     * @param {Boolean} value 要追加的布尔值。
     * @returns {StringBuilder} 完成追加操作后对此实例的引用。
     */
    append(value: Boolean): StringBuilder;

    /**
     * 向此实例追加指定字符串的副本。
     * @param {String} value 要追加的字符串。
     * @returns {StringBuilder} 完成追加操作后对此实例的引用。
     */
    append(value: String): StringBuilder;

    /**
     * 向此实例追加 Unicode 字符的字符串表示形式指定数目的副本。
     * @param {String} value 要追加的字符。
     * @param {Number} repeatCount 要追加 value 的次数。
     * @returns {StringBuilder} 完成追加操作后对此实例的引用。
     */
    append(value: String, repeatCount: Number): StringBuilder;

    /**
     * 向此实例追加指定子字符串的副本。
     * @param {String} value 包含要追加的子字符串的字符串。
     * @param {Number} startIndex value 中子字符串开始的位置。
     * @param {Number} count 要追加的 value 中的字符数。
     * @returns {StringBuilder} 完成追加操作后对此实例的引用。
     */
    append(value: String, startIndex: Number, count: Number): StringBuilder;

    /**
     * 向此实例追加指定数组中的 Unicode 字符的字符串表示形式。
     * @param {Array<String>} value 要追加的字符数组。
     * @returns {StringBuilder} 完成追加操作后对此实例的引用。
     */
    append(value: Array<String>): StringBuilder;

    /**
     * 向此实例追加指定的 Unicode 字符子数组的字符串表示形式。
     * @param {Array<String>} value 字符数组。
     * @param {Number} startIndex value 中的起始位置。
     * @param {Number} charCount 要追加的字符数。
     * @returns {StringBuilder} 完成追加操作后对此实例的引用。
     */
    append(value: Array<String>, startIndex: Number, charCount: Number): StringBuilder;

    /**
     * 向此实例追加整数的字符串表示形式。
     * @param {Number} value 要追加的值。
     * @returns {StringBuilder} 完成追加操作后对此实例的引用。
     */
    append(value: Number): StringBuilder;

    /**
     * 向此实例追加指定对象的字符串表示形式。
     * @param {Object} value 要追加的对象。
     * @returns {StringBuilder} 完成追加操作后对此实例的引用。
     */
    append(value: Object): StringBuilder;

    /**
     * 将默认的行终止符追加到当前 StringBuilder 对象的末尾。
     * @returns {StringBuilder} 完成追加操作后对此实例的引用。
     */
    appendLine(): StringBuilder;

    /**
     * 将后面跟有默认行终止符的指定字符串的副本追加到当前 StringBuilder 对象的末尾。
     * @param {String} value 要追加的字符串。
     * @returns {StringBuilder} 完成追加操作后对此实例的引用。
     */
    appendLine(value: String): StringBuilder;

    /**
     * 从当前 StringBuilder 实例中移除所有字符。
     * @returns {StringBuilder} 其 StringBuilder.Length 为 0（零）的对象。
     */
    clear(): StringBuilder;

    /**
     * 将此实例的指定段中的字符复制到目标数组的指定段中。
     * @param {Number} sourceIndex 此实例中开始复制字符的位置。 索引是从零开始的。
     * @param {Array<String>} destination 将从中复制字符的数组。
     * @param {Number} destinationIndex destination 中将从其开始复制字符的起始位置。 索引是从零开始的。
     * @param {Number} count 要复制的字符数。
     * @returns {void}
     */
    copyTo(sourceIndex: Number, destination: Array<String>, destinationIndex: Number, count: Number): void;

    /**
     *
     * @param {Number} index
     * @param {Boolean} value
     * @returns {StringBuilder} 完成插入操作后对此实例的引用。
     */
    insert(index: Number, value: Boolean): StringBuilder;

    /**
     *
     * @param {Number} index
     * @param {String} value
     * @returns {StringBuilder} 完成插入操作后对此实例的引用。
     */
    insert(index: Number, value: String): StringBuilder;

    /**
     *
     * @param {Number} index
     * @param {String} value
     * @param {Number} count
     * @returns {StringBuilder} 完成插入操作后对此实例的引用。
     */
    insert(index: Number, value: String, count: Number): StringBuilder;

    /**
     *
     * @param {Number} index
     * @param {Array<String>} value
     * @returns {StringBuilder} 完成插入操作后对此实例的引用。
     */
    insert(index: Number, value: Array<String>): StringBuilder;

    /**
     *
     * @param {Number} index
     * @param {Array<String>} value
     * @param {Number} startIndex
     * @param {Number} charCount
     * @returns {StringBuilder} 完成插入操作后对此实例的引用。
     */
    insert(index: Number, value: Array<String>, startIndex: Number, charCount: Number): StringBuilder;

    /**
     *
     * @param {Number} index
     * @param {Number} value
     * @returns {StringBuilder} 完成插入操作后对此实例的引用。
     */
    insert(index: Number, value: Number): StringBuilder;

    /**
     *
     * @param {Number} index
     * @param {Object} value
     * @returns {StringBuilder} 完成插入操作后对此实例的引用。
     */
    insert(index: Number, value: Object): StringBuilder;

    /**
     * 将指定范围的字符从此实例中移除。
     * @param {Number} startIndex 此实例中开始移除操作的从零开始的位置。
     * @param {Number} length 要删除的字符数。
     * @returns {StringBuilder} 切除操作完成后对此实例的引用。
     */
    remove(startIndex: Number, length: Number): StringBuilder;

    /**
     * 将此实例中出现的所有指定字符串的替换为其他指定字符串。
     * @param {String} oldValue 要替换的字符串。
     * @param {String} newValue 替换 oldValue 的字符串。
     * @returns {StringBuilder} 对此实例的引用，其中 oldValue 的所有实例被 newValue 替换。
     */
    replace(oldValue: String, newValue: String): StringBuilder;

    /**
     * 将此实例的子字符串中出现的所有指定字符串替换为其他指定字符串。
     * @param {String} oldValue 要替换的字符串。
     * @param {String} newValue 替换 oldValue 的字符串。
     * @param {Number} startIndex 此实例中子字符串开始的位置。
     * @param {Number} count 子字符串的长度。
     * @returns {StringBuilder} 对此实例的引用，其中从 oldValue 到 newValue + startIndex - 1 的范围内 startIndex 的所有实例被 count 替换。
     */
    replace(oldValue: String, newValue: String, startIndex: Number, count: Number): StringBuilder;

    /**
     * 将此实例的值转换为 String。
     * @returns {String} 其值与此实例相同的字符串。
     */
    toString(): String;

    /**
     * 将此实例中子字符串的值转换为 String。
     * @param {Number} startIndex 此实例内子字符串的起始位置。
     * @param {Number} length 子字符串的长度。
     * @returns {String} 一个字符串，其值与此实例的指定子字符串相同。
     */
    toString(startIndex: Number, length: Number): String;
}
