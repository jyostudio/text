import List from "@jyostudio/list";
import overload from "@jyostudio/overload";

const CONSTRUCTOR_SYMBOL = Symbol("constructor");

/**
 * 表示可变字符字符串。
 */
export default class StringBuilder {
    /**
     * [私有]存储字符的内部数组。
     */
    #chars: string[] = [];

    /**
     * [私有]StringBuilder 实例的最大容量。
     */
    #maxCapacity: number = 2147483647;

    /**
     * [私有]用于索引访问的代理对象。
     */
    #proxy: StringBuilder | null = null;

    /**
     * 键值对，允许通过索引访问字符。
     */
    [key: number]: string;

    /**
     * 获取此实例的最大容量。
     * @returns 此实例可容纳的最大字符数。
     */
    public get maxCapacity(): number {
        return this.#maxCapacity;
    }

    /**
     * 获取当前 StringBuilder 对象的长度。
     * @returns 此实例当前的字符数。
     */
    public get length(): number {
        return this.#chars.length;
    }

    /**
     * 设置当前 StringBuilder 对象的长度。
     * @param value 此实例新的字符数。
     */
    public set length(value: number) {
        this.#chars.length = value;
    }

    /**
     * 初始化 StringBuilder 类的新实例。
     */
    public constructor();

    /**
     * 初始化 StringBuilder 类的新实例，该类可增长到指定的最大容量。
     * @param maxCapacity 当前字符串可包含的最大字符数。
     */
    public constructor(maxCapacity: number);

    /**
     * 使用指定的字符串初始化 StringBuilder 类的新实例。
     * @param value 用于初始化实例值的字符串。
     */
    public constructor(value: string);

    /**
     * 从指定的子字符串初始化 StringBuilder 类的新实例。
     * @param value 字符串包含用于初始化此实例值的子字符串。
     * @param startIndex value 中子字符串开始的位置。
     * @param length 子字符串中的字符数。
     */
    public constructor(value: string, startIndex: number, length: number);

    public constructor(...params: any) {
        Object.defineProperties(this, {
            length: {
                get: () => this.#chars.length,
                set: overload([Number], (value: number) => this.#chars.length = value)
            }
        });

        if (new.target !== StringBuilder) {
            throw new Error("不能从 StringBuilder 类继承。");
        }

        return StringBuilder[CONSTRUCTOR_SYMBOL].apply(this, params);
    }

    /**
     * [私有]构造函数的内部实现。
     * @param params 构造函数参数。
     * @returns StringBuilder 实例。
     */
    private static [CONSTRUCTOR_SYMBOL](...params: any): StringBuilder {
        StringBuilder[CONSTRUCTOR_SYMBOL] = overload()
            .add([], function (this: StringBuilder) {
                return StringBuilder[CONSTRUCTOR_SYMBOL].call(this, "", 0, 0);
            })
            .add([Number], function (this: StringBuilder, maxCapacity: number) {
                if (maxCapacity < 1) {
                    throw new RangeError("容量必须大于 0。");
                }

                this.#maxCapacity = maxCapacity;
                return StringBuilder[CONSTRUCTOR_SYMBOL].call(this, "", 0, 0);
            })
            .add([String], function (this: StringBuilder, value: string) {
                return StringBuilder[CONSTRUCTOR_SYMBOL].call(this, value, 0, value.length);
            })
            .add([String, Number, Number], function (this: StringBuilder, value: string, startIndex: number, length: number) {
                if (startIndex + length < 0 || startIndex + length > value.length) {
                    throw new RangeError("“startIndex”加“length”超出范围。");
                }

                const proxy = this.#initProxy();

                for (let i = 0; i < length; i++) {
                    this.append(value[startIndex + i]);
                }

                return proxy;
            });

        return StringBuilder[CONSTRUCTOR_SYMBOL].apply(this, params);
    }

    /**
     * [私有]初始化代理对象以支持索引访问。
     * @returns 代理对象。
     */
    #initProxy(): StringBuilder {
        return this.#proxy = new Proxy(this, {
            get: (target, prop, receiver) => {
                if (/^[0-9]*$/.test(prop as string)) {
                    return this.#chars[prop as any];
                }

                if (typeof this[prop as keyof this] === "function") {
                    return (this[prop as keyof this] as Function).bind(this);
                }

                return this[prop as keyof this];
            },
            set: (target, prop, value, receiver) => {
                if (/^[0-9]*$/.test(prop as string)) {
                    const num = parseInt(prop as string, 10);

                    if (num < 0 || num > this.length) {
                        throw new RangeError("索引超出范围。");
                    }

                    if (typeof value !== "string") {
                        throw new TypeError("值必须是 String 类型。");
                    }

                    if (num >= this.maxCapacity) {
                        throw new RangeError("容量超出范围。");
                    }

                    this.#chars[prop as any] = value;
                } else {
                    (this as any)[prop] = value;
                }

                return true;
            },
        });
    }

    /**
     * 实现迭代器接口。
     * @returns 字符迭代器。
     */
    *[Symbol.iterator](): Iterator<string> {
        for (let i = 0; i < this.#chars.length; i++) {
            yield this.#chars[i];
        }
    }

    /**
     * 向此实例追加指定的布尔值的字符串表示形式。
     * @param value 要追加的布尔值。
     * @returns 完成追加操作后对此实例的引用。
     */
    public append(value: boolean): StringBuilder;
    /**
     * 向此实例追加指定字符串的副本。
     * @param value 要追加的字符串。
     * @returns 完成追加操作后对此实例的引用。
     */
    public append(value: string): StringBuilder;
    /**
     * 向此实例追加 Unicode 字符的字符串表示形式指定数目的副本。
     * @param value 要追加的字符。
     * @param repeatCount 要追加 value 的次数。
     * @returns 完成追加操作后对此实例的引用。
     */
    public append(value: string, repeatCount: number): StringBuilder;
    /**
     * 向此实例追加指定子字符串的副本。
     * @param value 包含要追加的子字符串的字符串。
     * @param startIndex value 中子字符串开始的位置。
     * @param count 要追加的 value 中的字符数。
     * @returns 完成追加操作后对此实例的引用。
     */
    public append(value: string, startIndex: number, count: number): StringBuilder;
    /**
     * 向此实例追加指定数组中的 Unicode 字符的字符串表示形式。
     * @param value 要追加的字符数组。
     * @returns 完成追加操作后对此实例的引用。
     */
    public append(value: string[] | List<String>): StringBuilder;
    /**
     * 向此实例追加指定的 Unicode 字符子数组的字符串表示形式。
     * @param value 字符数组。
     * @param startIndex value 中的起始位置。
     * @param charCount 要追加的字符数。
     * @returns 完成追加操作后对此实例的引用。
     */
    public append(value: string[] | List<String>, startIndex: number, charCount: number): StringBuilder;
    /**
     * 向此实例追加整数的字符串表示形式。
     * @param value 要追加的值。
     * @returns 完成追加操作后对此实例的引用。
     */
    public append(value: number): StringBuilder;
    /**
     * 向此实例追加指定对象的字符串表示形式。
     * @param value 要追加的对象。
     * @returns 完成追加操作后对此实例的引用。
     */
    public append(value: object): StringBuilder;
    public append(...params: any): StringBuilder {
        StringBuilder.prototype.append = overload()
            .add([Boolean], function (this: StringBuilder, value: boolean): StringBuilder {
                if (value) {
                    return this.append(['T', 'r', 'u', 'e']);
                } else {
                    return this.append(['F', 'a', 'l', 's', 'e']);
                }
            })
            .add([String], function (this: StringBuilder, value: string): StringBuilder {
                return this.append([...value]);
            })
            .add([String, Number], function (this: StringBuilder, value: string, repeatCount: number): StringBuilder {
                for (let i = 0; i < repeatCount; i++) {
                    this.append([...value]);
                }
                return this;
            })
            .add([String, Number, Number], function (this: StringBuilder, value: string, startIndex: number, count: number): StringBuilder {
                return this.append([...value.substr(startIndex, count)]);
            })
            .add([[Array, List.T(String)]], function (this: StringBuilder, value: string[] | List<String>): StringBuilder {
                return this.append(value, 0, value.length);
            })
            .add([[Array, List.T(String)], Number, Number], function (this: StringBuilder, value: string[] | List<String>, startIndex: number, count: number): StringBuilder {
                if (this.length + count > this.maxCapacity) {
                    throw new RangeError("容量超出范围。");
                }

                for (let i = 0; i < count; i++) {
                    if (value[startIndex + i].length > 1) {
                        throw new RangeError("值必须是一个字符。");
                    }

                    this.#chars.push(value[startIndex + i]);
                }

                return this;
            })
            .add([Number], function (this: StringBuilder, value: number): StringBuilder {
                return this.append([...("" + value)]);
            })
            .add([Object], function (this: StringBuilder, value: object): StringBuilder {
                return this.append([...value.toString()]);
            });

        return StringBuilder.prototype.append.apply(this, params);
    }

    /**
     * 将默认的行终止符追加到当前 StringBuilder 对象的末尾。
     * @returns 完成追加操作后对此实例的引用。
     */
    public appendLine(): StringBuilder;

    /**
     * 将后面跟有默认行终止符的指定字符串的副本追加到当前 StringBuilder 对象的末尾。
     * @param value 要追加的字符串。
     * @returns 完成追加操作后对此实例的引用。
     */
    public appendLine(value: string): StringBuilder;

    public appendLine(...params: any): StringBuilder {
        StringBuilder.prototype.appendLine = overload()
            .add([], function (this: StringBuilder): StringBuilder {
                return this.append(["\r", "\n"]);
            })
            .add([String], function (this: StringBuilder, value: string): StringBuilder {
                this.append(value);
                this.appendLine();
                return this;
            });

        return StringBuilder.prototype.appendLine.apply(this, params);
    }

    /**
     * 从当前 StringBuilder 实例中移除所有字符。
     * @returns 其 StringBuilder.Length 为 0（零）的对象。
     */
    public clear(): StringBuilder {
        StringBuilder.prototype.clear = overload([], function (this: StringBuilder): StringBuilder {
            this.#chars.length = 0;
            return this;
        });

        return StringBuilder.prototype.clear.apply(this, []);
    }

    /**
     * 将此实例的指定段中的字符复制到目标数组的指定段中。
     * @param sourceIndex 此实例中开始复制字符的位置。索引是从零开始的。
     * @param destination 要将字符复制到的目标数组。
     * @param destinationIndex destination 中将从其开始复制字符的起始位置。索引是从零开始的。
     * @param count 要复制的字符数。
     */
    public copyTo(sourceIndex: number, destination: string[], destinationIndex: number, count: number): void {
        StringBuilder.prototype.copyTo = overload([Number, Array, Number, Number], function (this: StringBuilder, sourceIndex: number, destination: string[], destinationIndex: number, count: number): void {
            for (let i = 0; i < count; i++) {
                destination[destinationIndex + i] = this.#chars[sourceIndex + i];
            }
        });

        return StringBuilder.prototype.copyTo.apply(this, [sourceIndex, destination, destinationIndex, count]);
    }

    /**
     * 向此实例的指定位置插入布尔值的字符串表示形式。
     * @param index 插入的位置。
     * @param value 要插入的布尔值。
     * @returns 完成插入操作后对此实例的引用。
     */
    public insert(index: number, value: boolean): StringBuilder;
    /**
     * 向此实例的指定位置插入字符串的副本。
     * @param index 插入的位置。
     * @param value 要插入的字符串。
     * @returns 完成插入操作后对此实例的引用。
     */
    public insert(index: number, value: string): StringBuilder;
    /**
     * 向此实例的指定位置插入字符串的指定数量的副本。
     * @param index 插入的位置。
     * @param value 要插入的字符串。
     * @param repeatCount 要插入的副本数。
     * @returns 完成插入操作后对此实例的引用。
     */
    public insert(index: number, value: string, repeatCount: number): StringBuilder;
    /**
     * 向此实例的指定位置插入字符数组。
     * @param index 插入的位置。
     * @param value 要插入的字符数组。
     * @returns 完成插入操作后对此实例的引用。
     */
    public insert(index: number, value: string[] | List<String>): StringBuilder;
    /**
     * 向此实例的指定位置插入字符子数组。
     * @param index 插入的位置。
     * @param value 字符数组。
     * @param startIndex value 中的起始位置。
     * @param charCount 要插入的字符数。
     * @returns 完成插入操作后对此实例的引用。
     */
    public insert(index: number, value: string[] | List<String>, startIndex: number, charCount: number): StringBuilder;
    /**
     * 向此实例的指定位置插入数值的字符串表示形式。
     * @param index 插入的位置。
     * @param value 要插入的数值。
     * @returns 完成插入操作后对此实例的引用。
     */
    public insert(index: number, value: number): StringBuilder;
    /**
     * 向此实例的指定位置插入对象的字符串表示形式。
     * @param index 插入的位置。
     * @param value 要插入的对象。
     * @returns 完成插入操作后对此实例的引用。
     */
    public insert(index: number, value: object): StringBuilder;
    public insert(...params: any): StringBuilder {
        StringBuilder.prototype.insert = overload()
            .add([Number, Boolean], function (this: StringBuilder, index: number, value: boolean): StringBuilder {
                if (value) {
                    return this.insert(index, ['T', 'r', 'u', 'e']);
                } else {
                    return this.insert(index, ['F', 'a', 'l', 's', 'e']);
                }
            })
            .add([Number, String], function (this: StringBuilder, index: number, value: string): StringBuilder {
                return this.insert(index, [...value]);
            })
            .add([Number, String, Number], function (this: StringBuilder, index: number, value: string, repeatCount: number): StringBuilder {
                for (let i = 0; i < repeatCount; i++) {
                    this.insert(index, [...value]);
                }
                return this;
            })
            .add([Number, [Array, List.T(String)]], function (this: StringBuilder, index: number, value: string[] | List<String>): StringBuilder {
                return this.insert(index, value, 0, value.length);
            })
            .add([Number, [Array, List.T(String)], Number, Number], function (this: StringBuilder, index: number, value: string[] | List<String>, startIndex: number, count: number): StringBuilder {
                if (index < 0 || index > this.length) {
                    throw new RangeError("索引超出范围。");
                }

                if (this.length + count > this.maxCapacity) {
                    throw new RangeError("容量超出范围。");
                }

                for (let i = 0; i < count; i++) {
                    if (typeof value[startIndex + i] !== "string") {
                        throw new TypeError("值必须是一个字符。");
                    }

                    if (value[startIndex + i].length > 1) {
                        throw new RangeError("值必须是一个字符。");
                    }
                    
                    this.#chars.splice(index + i, 0, value[startIndex + i]);
                }

                return this;
            })
            .add([Number, Number], function (this: StringBuilder, index: number, value: number): StringBuilder {
                return this.insert(index, [...("" + value)]);
            })
            .add([Number, Object], function (this: StringBuilder, index: number, value: object): StringBuilder {
                return this.insert(index, [...value.toString()]);
            });

        return StringBuilder.prototype.insert.apply(this, params);
    }

    /**
     * 将指定范围的字符从此实例中移除。
     * @param startIndex 此实例中开始移除操作的从零开始的位置。
     * @param length 要删除的字符数。
     * @returns 切除操作完成后对此实例的引用。
     */
    public remove(startIndex: number, length: number): StringBuilder {
        StringBuilder.prototype.remove = overload([Number, Number], function (this: StringBuilder, startIndex: number, length: number): StringBuilder {
            if (startIndex < 0) {
                throw new RangeError("“startIndex”超出范围。");
            }

            if (length < 0) {
                throw new RangeError("“length”超出范围。");
            }

            if (startIndex + length > this.length) {
                throw new RangeError("“startIndex”加“length”超出范围。");
            }

            this.#chars.splice(startIndex, length);
            return this;
        });

        return StringBuilder.prototype.remove.apply(this, [startIndex, length]);
    }

    /**
     * 将此实例中出现的所有指定字符替换为其他指定字符。
     * @param oldValue 要替换的字符。
     * @param newValue 替换 oldValue 的字符。
     * @returns 对此实例的引用，其中 oldValue 的所有实例被 newValue 替换。
     */
    public replace(oldValue: string, newValue: string): StringBuilder;
    /**
     * 将此实例的子字符串中出现的所有指定字符替换为其他指定字符。
     * @param oldValue 要替换的字符。
     * @param newValue 替换 oldValue 的字符。
     * @param startIndex 此实例中子字符串开始的位置。
     * @param count 子字符串的长度。
     * @returns 对此实例的引用，其中从 startIndex 到 startIndex + count - 1 的范围内 oldValue 的所有实例被 newValue 替换。
     */
    public replace(oldValue: string, newValue: string, startIndex: number, count: number): StringBuilder;
    public replace(...params: any): StringBuilder {
        StringBuilder.prototype.replace = overload()
            .add([String, String], function (this: StringBuilder, oldValue: string, newValue: string): StringBuilder {
                return this.replace(oldValue, newValue, 0, this.length);
            })
            .add([String, String, Number, Number], function (this: StringBuilder, oldValue: string, newValue: string, startIndex: number, count: number): StringBuilder {
                if (oldValue.length > 1) {
                    throw new RangeError("“oldValue”必须是一个字符。");
                }

                if (newValue.length > 1) {
                    throw new RangeError("“newValue”必须是一个字符。");
                }

                for (let i = 0; i < count; i++) {
                    if (this.#chars[startIndex + i] === oldValue) {
                        this.#chars[startIndex + i] = newValue;
                    }
                }

                return this;
            });

        return StringBuilder.prototype.replace.apply(this, params);
    }

    /**
     * 将此实例的值转换为 String。
     * @returns 其值与此实例相同的字符串。
     */
    public toString(): string;
    /**
     * 将此实例中子字符串的值转换为 String。
     * @param startIndex 此实例内子字符串的起始位置。
     * @param length 子字符串的长度。
     * @returns 一个字符串，其值与此实例的指定子字符串相同。
     */
    public toString(startIndex: number, length: number): string;
    public toString(...params: any): string {
        StringBuilder.prototype.toString = overload()
            .add([], function (this: StringBuilder): string {
                return this.#chars.join("");
            })
            .add([Number, Number], function (this: StringBuilder, startIndex: number, length: number): string {
                if (startIndex < 0) {
                    throw new RangeError("“startIndex”超出范围。");
                }

                if (length < 0) {
                    throw new RangeError("“length”超出范围。");
                }

                if (startIndex + length > this.length) {
                    throw new RangeError("“startIndex”加“length”超出范围。");
                }

                let str = "";
                for (let i = 0; i < length; i++) {
                    str += this.#chars[startIndex + i];
                }
                return str;
            });

        return StringBuilder.prototype.toString.apply(this, params);
    }
}
