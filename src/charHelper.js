import overload from "@jyostudio/overload";

export default class CharHelper {
    static #HIGH_SURROGATE_START = 0x00d800;
    static #HIGH_SURROGATE_END = 0x00dbff;
    static #LOW_SURROGATE_START = 0x00dc00;
    static #LOW_SURROGATE_END = 0x00dfff;
    static #UNICODE_PLANE16_END = 0x10ffff;
    static #UNICODE_PLANE00_END = 0x00ffff;
    static #UNICODE_PLANE01_START = 0x10000;

    static #checkChar(c) {
        if (c.length !== 1) {
            throw new Error("c must be a single character.");
        }
    }

    static isSurrogate(...params) {
        CharHelper.isSurrogate = overload()
            .add([String], function (c) {
                this.#checkChar(c);
                return (c >= CharHelper.#HIGH_SURROGATE_START && c <= CharHelper.#LOW_SURROGATE_END);
            })
            .add([String, Number], function (s, index) {
                if ((index) >= (s.length)) {
                    throw new RangeError("index is out of range.");
                }

                return (CharHelper.isSurrogate(s[index]));
            });

        return CharHelper.isSurrogate.call(this, ...params);
    }

    static isHighSurrogate(...params) {
        CharHelper.isHighSurrogate = overload()
            .add([String], function (c) {
                this.#checkChar(c);
                return (c >= CharHelper.#HIGH_SURROGATE_START && c <= CharHelper.#HIGH_SURROGATE_END);
            })
            .add([String, Number], function (s, index) {
                if (index < 0 || index >= s.length) {
                    throw new RangeError("index is out of range.");
                }

                return (CharHelper.isHighSurrogate(s[index]));
            });

        return CharHelper.isHighSurrogate.call(this, ...params);
    }

    static isLowSurrogate(...params) {
        CharHelper.isLowSurrogate = overload()
            .add([String], function (c) {
                this.#checkChar(c);
                return ((c >= CharHelper.#LOW_SURROGATE_START) && (c <= CharHelper.#LOW_SURROGATE_END));
            })
            .add([String, Number], function (s, index) {
                if (index < 0 || index >= s.length) {
                    throw new RangeError("index is out of range.");
                }

                return (CharHelper.isLowSurrogate(s[index]));
            });

        return CharHelper.isLowSurrogate.call(this, ...params);
    }

    static convertFromUtf32(...params) {
        CharHelper.convertFromUtf32 = overload()
            .add([Number], function (utf32) {
                if ((utf32 < 0 || utf32 > CharHelper.#UNICODE_PLANE16_END) || (utf32 >= CharHelper.#HIGH_SURROGATE_START && utf32 <= CharHelper.#LOW_SURROGATE_END)) {
                    throw new RangeError("utf32 is out of range.");
                }

                if (utf32 < CharHelper.#UNICODE_PLANE01_START) return (String.fromCharCode(utf32));

                utf32 -= CharHelper.#UNICODE_PLANE01_START;
                let surrogate = [];
                surrogate[0] = String.fromCharCode((utf32 / 0x400) + CharHelper.#HIGH_SURROGATE_START);
                surrogate[1] = String.fromCharCode((utf32 % 0x400) + CharHelper.#LOW_SURROGATE_START);
                return surrogate.join("");
            });

        return CharHelper.convertFromUtf32.call(this, ...params);
    }

    static convertToUtf32(...params) {
        CharHelper.convertToUtf32 = overload()
            .add([String, String], function (highSurrogate, lowSurrogate) {
                if (!CharHelper.isHighSurrogate(highSurrogate)) {
                    throw new Error("highSurrogate is not a high surrogate.");
                }

                if (!CharHelper.isLowSurrogate(lowSurrogate)) {
                    throw new Error("lowSurrogate is not a low surrogate.");
                }

                return (((highSurrogate - CharHelper.#HIGH_SURROGATE_START) * 0x400) + (lowSurrogate - CharHelper.#LOW_SURROGATE_START) + CharHelper.#UNICODE_PLANE01_START);
            })
            .add([String, Number], function (s, index) {
                if (index < 0 || index >= s.length) {
                    throw new RangeError("index is out of range.");
                }

                let temp1 = s.charCodeAt(index) - CharHelper.#HIGH_SURROGATE_START;
                if (temp1 >= 0 && temp1 <= 0x7ff) {
                    if (temp1 <= 0x3ff) {
                        if (index < s.length - 1) {
                            let temp2 = s.charCodeAt(index + 1) - CharHelper.#LOW_SURROGATE_START;
                            if (temp2 >= 0 && temp2 <= 0x3ff) {
                                return ((temp1 * 0x400) + temp2 + CharHelper.#UNICODE_PLANE01_START);
                            } else {
                                throw new Error("lowSurrogate is not a low surrogate.");
                            }
                        } else {
                            throw new Error("lowSurrogate is not a low surrogate.");
                        }
                    } else {
                        throw new Error("highSurrogate is not a high surrogate.");
                    }
                }

                return (s.charCodeAt(index));
            });

        return CharHelper.convertToUtf32.call(this, ...params);
    }

    static getNumericValue(...params) {
        CharHelper.getNumericValue = overload()
            .add([String], function (c) {
                this.#checkChar(c);
                if (c >= '0' && c <= '9') return (c - '0');
                if (c >= 'a' && c <= 'z') return (c - 'a' + 10);
                if (c >= 'A' && c <= 'Z') return (c - 'A' + 10);
                return (-1);
            })
            .add([String, Number], function (s, index) {
                if (index < 0 || index >= s.length) {
                    throw new RangeError("index is out of range.");
                }

                return (CharHelper.getNumericValue(s.charAt(index)));
            });

        return CharHelper.getNumericValue.call(this, ...params);
    }
}