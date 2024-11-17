import List from "@jyostudio/list";
import overload from "@jyostudio/overload";

const CONSTURCTOR_SYMBOL = Symbol("constructor");

export default class StringBuilder {
    #chars = [];

    #maxCapacity = 2147483647;

    #proxy = null;

    get maxCapacity() {
        return this.#maxCapacity;
    }

    static [CONSTURCTOR_SYMBOL](...params) {
        StringBuilder[CONSTURCTOR_SYMBOL] = overload()
            .add([], function () {
                return StringBuilder[CONSTURCTOR_SYMBOL].call(this, "", 0, 0);
            })
            .add([Number], function (maxCapacity) {
                if (maxCapacity < 1) {
                    throw new RangeError("Capacity must be greater than zero.");
                }

                this.#maxCapacity = maxCapacity;
                return StringBuilder[CONSTURCTOR_SYMBOL].call(this, "", 0, 0);
            })
            .add([String], function (value) {
                return StringBuilder[CONSTURCTOR_SYMBOL].call(this, value, 0, value.length);
            })
            .add([String, Number, Number], function (value, startIndex, length) {
                if (startIndex + length < 0 || startIndex + length > value.length) {
                    throw new RangeError("startIndex 及 length 超出范围。");
                }

                const proxy = this.#initProxy();

                for (let i = 0; i < length; i++) {
                    this.append(value[startIndex + i]);
                }

                return proxy;
            });

        return StringBuilder[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    constructor(...params) {
        Object.defineProperties(this, {
            length: {
                get: () => this.#chars.length,
                set: overload([Number], value => this.#chars.length = value)
            }
        });

        if (new.target !== StringBuilder) {
            throw new Error("不能从 StringBuilder 类继承。");
        }

        return StringBuilder[CONSTURCTOR_SYMBOL].apply(this, params);
    }

    #initProxy() {
        return this.#proxy = new Proxy(this, {
            get: (target, prop, receiver) => {
                if (/^[0-9]*$/.test(prop)) {
                    return this.#chars[prop];
                }

                if (typeof this[prop] === "function") {
                    return this[prop].bind(this);
                }

                return this[prop];
            },
            set: (target, prop, value, receiver) => {
                if (/^[0-9]*$/.test(prop)) {
                    const num = parseInt(prop, 10);

                    if (num < 0 || num > this.length) {
                        throw new RangeError("索引超出范围。");
                    }

                    if (typeof value !== "string") {
                        throw new TypeError("值必须是 String 类型。");
                    }

                    if (num >= this.maxCapacity) {
                        throw new RangeError("容量超出范围。");
                    }

                    this.#chars[prop] = value;
                } else {
                    this[prop] = value;
                }

                return true;
            },
        });
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this.#chars.length; i++) {
            yield this.#chars[i];
        }
    }

    append(...params) {
        StringBuilder.prototype.append = overload()
            .add([Boolean], function (value) {
                if (value) {
                    return this.append(['T', 'r', 'u', 'e']);
                } else {
                    return this.append(['F', 'a', 'l', 's', 'e']);
                }
            })
            .add([String], function (value) {
                return this.append([...value]);
            })
            .add([String, Number], function (value, repeatCount) {
                for (let i = 0; i < repeatCount; i++) {
                    this.append([...value]);
                }
                return this;
            })
            .add([String, Number, Number], function (value, startIndex, count) {
                return this.append([...value.substr(startIndex, count)]);
            })
            .add([[Array, List.T(String)]], function (value) {
                return this.append(value, 0, value.length);
            })
            .add([[Array, List.T(String)], Number, Number], function (value, startIndex, count) {
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
            .add([Number], function (value) {
                return this.append([...("" + value)]);
            })
            .add([Object], function (value) {
                return this.append([...value.toString()]);
            });

        return StringBuilder.prototype.append.apply(this, params);
    }

    appendLine(...params) {
        StringBuilder.prototype.appendLine = overload()
            .add([], function () {
                return this.append(["\r", "\n"]);
            })
            .add([String], function (value) {
                this.append(value);
                this.appendLine();
                return this;
            });

        return StringBuilder.prototype.appendLine.apply(this, params);
    }

    clear(...params) {
        StringBuilder.prototype.clear = overload([], function () {
            this.#chars.length = 0;
            return this;
        });

        return StringBuilder.prototype.clear.apply(this, params);
    }

    copyTo(...params) {
        StringBuilder.prototype.copyTo = overload([Number, Array, Number, Number], function (sourceIndex, destination, destinationIndex, count) {
            for (let i = 0; i < count; i++) {
                destination[destinationIndex + i] = this.#chars[sourceIndex + i];
            }
        });

        return StringBuilder.prototype.copyTo.apply(this, params);
    }

    insert(...params) {
        StringBuilder.prototype.insert = overload()
            .add([Number, Boolean], function (index, value) {
                if (value) {
                    return this.insert(index, ['T', 'r', 'u', 'e']);
                } else {
                    return this.insert(index, ['F', 'a', 'l', 's', 'e']);
                }
            })
            .add([Number, String], function (index, value) {
                return this.insert(index, [...value]);
            })
            .add([Number, String, Number], function (index, value, repeatCount) {
                for (let i = 0; i < repeatCount; i++) {
                    this.insert(index, [...value]);
                }
                return this;
            })
            .add([Number, [Array, List.T(String)]], function (index, value) {
                return this.insert(index, value, 0, value.length);
            })
            .add([Number, [Array, List.T(String)], Number, Number], function (index, value, startIndex, count) {
                if (index < 0 || index > this.length) {
                    throw new RangeError("索引超出范围。");
                }

                if (startIndex + count >= this.maxCapacity) {
                    throw new RangeError("容量超出范围。");
                }

                for (let i = 0; i < count; i++) {
                    if (typeof value[i] !== "string") {
                        throw new TypeError("值必须是一个字符。");
                    }

                    if (value[startIndex + i].length > 1) {
                        throw new RangeError("值必须是一个字符。");
                    }

                    this.#chars.splice(index + i, 0, value[startIndex + i]);
                }

                return this;
            })
            .add([Number, Number], function (index, value) {
                return this.insert(index, [...("" + value)]);
            })
            .add([Number, Object], function (index, value) {
                return this.insert(index, [...value.toString()]);
            });

        return StringBuilder.prototype.insert.apply(this, params);
    }

    remove(...params) {
        StringBuilder.prototype.remove = overload([Number, Number], function (startIndex, length) {
            if (startIndex < 0) {
                throw new RangeError("startIndex 超出范围。");
            }

            if (length < 0) {
                throw new RangeError("长度超出范围。");
            }

            if (startIndex + length > this.length) {
                throw new RangeError("startIndex 及 length 超出范围。");
            }

            this.#chars.splice(startIndex, length);
            return this;
        });

        return StringBuilder.prototype.remove.apply(this, params);
    }

    replace(...params) {
        StringBuilder.prototype.replace = overload()
            .add([String, String], function (oldValue, newValue) {
                return this.replace(oldValue, newValue, 0, this.length);
            })
            .add([String, String, Number, Number], function (oldValue, newValue, startIndex, count) {
                if (oldValue.length > 1) {
                    throw new RangeError("oldValue 必须是一个字符。");
                }

                if (newValue.length > 1) {
                    throw new RangeError("newValue 必须是一个字符。");
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

    toString(...params) {
        StringBuilder.prototype.toString = overload()
            .add([], function () {
                return this.#chars.join("");
            })
            .add([Number, Number], function (startIndex, length) {
                if (startIndex < 0) {
                    throw new RangeError("startIndex 超出范围。");
                }

                if (length < 0) {
                    throw new RangeError("长度超出范围。");
                }

                if (startIndex + length > this.length) {
                    throw new RangeError("startIndex 及 length 超出范围。");
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