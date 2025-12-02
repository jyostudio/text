import { TestFramework } from './framework.js';
import { StringBuilder, Encoding, ASCIIEncoding, UTF8Encoding, UnicodeEncoding, UTF32Encoding } from '../dist/index.js';
import { runSeparateModulesTests } from './separate-modules.js';

const framework = new TestFramework(
    document.getElementById('results'),
    document.getElementById('summary')
);

const describe = framework.describe.bind(framework);
const it = framework.it.bind(framework);
const expect = framework.expect.bind(framework);

describe('StringBuilder 测试', () => {
    it('应能初始化为空', () => {
        const sb = new StringBuilder();
        expect(sb.length).toBe(0);
        expect(sb.toString()).toBe("");
    });

    it('应能使用字符串初始化', () => {
        const sb = new StringBuilder("Hello");
        expect(sb.length).toBe(5);
        expect(sb.toString()).toBe("Hello");
    });

    it('应能追加字符串', () => {
        const sb = new StringBuilder();
        sb.append("Hello");
        sb.append(" World");
        expect(sb.toString()).toBe("Hello World");
    });

    it('应能追加数字', () => {
        const sb = new StringBuilder("Value: ");
        sb.append(123);
        expect(sb.toString()).toBe("Value: 123");
    });

    it('应能追加布尔值', () => {
        const sb = new StringBuilder();
        sb.append(true);
        sb.append(" ");
        sb.append(false);
        expect(sb.toString()).toBe("True False");
    });

    it('应能追加新行', () => {
        const sb = new StringBuilder("Line1");
        sb.appendLine();
        sb.append("Line2");
        expect(sb.toString()).toBe("Line1\r\nLine2");
    });

    it('应能插入字符串', () => {
        const sb = new StringBuilder("Hello World");
        sb.insert(6, "Beautiful ");
        expect(sb.toString()).toBe("Hello Beautiful World");
    });

    it('应能移除字符', () => {
        const sb = new StringBuilder("Hello Beautiful World");
        sb.remove(6, 10);
        expect(sb.toString()).toBe("Hello World");
    });

    it('应能替换字符', () => {
        const sb = new StringBuilder("Hello World");
        sb.replace("o", "0");
        expect(sb.toString()).toBe("Hell0 W0rld");
    });

    it('应能清空内容', () => {
        const sb = new StringBuilder("Hello");
        sb.clear();
        expect(sb.length).toBe(0);
        expect(sb.toString()).toBe("");
    });

    it('应能处理容量限制', () => {
        const sb = new StringBuilder(10);
        expect(sb.maxCapacity).toBe(10);
        sb.append("1234567890");
        expect(() => sb.append("1")).toThrow(RangeError);
    });
    
    it('应支持索引访问', () => {
        const sb = new StringBuilder("Hello");
        expect(sb[0]).toBe("H");
        expect(sb[1]).toBe("e");
        sb[0] = "h";
        expect(sb.toString()).toBe("hello");
    });
});

describe('Encoding 测试', () => {
    it('应能获取 ASCII 编码', () => {
        const ascii = Encoding.ascii;
        expect(ascii instanceof ASCIIEncoding).toBe(true);
        expect(ascii.webName).toBe("us-ascii");
    });

    it('应能获取 UTF8 编码', () => {
        const utf8 = Encoding.utf8;
        expect(utf8 instanceof UTF8Encoding).toBe(true);
        expect(utf8.webName).toBe("utf-8");
    });

    it('应能编码和解码 ASCII', () => {
        const ascii = Encoding.ascii;
        const str = "Hello World";
        const bytes = ascii.getBytes(str);
        expect(bytes.length).toBe(11);
        const decoded = ascii.getString(bytes);
        expect(decoded).toBe(str);
    });

    it('应能编码和解码 UTF8', () => {
        const utf8 = Encoding.utf8;
        const str = "你好世界"; // Hello World in Chinese
        const bytes = utf8.getBytes(str);
        // Each Chinese character is usually 3 bytes in UTF-8
        expect(bytes.length).toBe(12); 
        const decoded = utf8.getString(bytes);
        expect(decoded).toBe(str);
    });

    it('应能编码和解码 Unicode (UTF-16 LE)', () => {
        const unicode = Encoding.unicode;
        const str = "A";
        const bytes = unicode.getBytes(str);
        // 'A' is 0x0041. LE -> 41 00
        expect(bytes.length).toBe(2);
        expect(bytes[0]).toBe(0x41);
        expect(bytes[1]).toBe(0x00);
        const decoded = unicode.getString(bytes);
        expect(decoded).toBe(str);
    });

    it('应能编码和解码 UTF-32', () => {
        const utf32 = Encoding.utf32;
        const str = "A";
        const bytes = utf32.getBytes(str);
        // 'A' is 4 bytes
        expect(bytes.length).toBe(4);
        const decoded = utf32.getString(bytes);
        expect(decoded).toBe(str);
    });

    it('应能转换编码', () => {
        const utf8 = Encoding.utf8;
        const ascii = Encoding.ascii;
        const str = "Hello";
        const utf8Bytes = utf8.getBytes(str);
        const asciiBytes = Encoding.convert(utf8, ascii, utf8Bytes);
        expect(ascii.getString(asciiBytes)).toBe("Hello");
    });
    
    it('应能处理无效的 ASCII 字符', () => {
        const ascii = Encoding.ascii;
        const str = "你好";
        const bytes = ascii.getBytes(str);
        // ASCII usually replaces unknown chars with '?' (63)
        expect(bytes[0]).toBe(63);
        expect(bytes[1]).toBe(63);
    });

    it('应能列出已注册的编码', () => {
        const encodings = Encoding.getEncodings();
        expect(encodings.length).toBeTruthy();
        let foundUtf8 = false;
        for(let i = 0; i < encodings.length; i++) {
            if (encodings[i].name === "utf-8") {
                foundUtf8 = true;
                break;
            }
        }
        expect(foundUtf8).toBe(true);
    });

    it('应能正确处理 Emoji 和代理对 (UTF-8)', () => {
        const utf8 = Encoding.utf8;
        const emoji = "😊"; // U+1F60A
        const bytes = utf8.getBytes(emoji);
        // U+1F60A in UTF-8 is F0 9F 98 8A (4 bytes)
        expect(bytes.length).toBe(4);
        expect(bytes[0]).toBe(0xF0);
        expect(bytes[1]).toBe(0x9F);
        expect(bytes[2]).toBe(0x98);
        expect(bytes[3]).toBe(0x8A);
        
        const decoded = utf8.getString(bytes);
        expect(decoded).toBe(emoji);
    });

    it('应能正确处理 Emoji 和代理对 (UTF-32)', () => {
        const utf32 = Encoding.utf32;
        const emoji = "😊"; // U+1F60A
        const bytes = utf32.getBytes(emoji);
        // U+1F60A is one 32-bit integer (4 bytes)
        expect(bytes.length).toBe(4);
        
        const decoded = utf32.getString(bytes);
        expect(decoded).toBe(emoji);
    });

    it('应能正确处理 Emoji (ASCII)', () => {
        const ascii = Encoding.ascii;
        const emoji = "😊"; 
        const bytes = ascii.getBytes(emoji);
        // Emoji is 2 chars in JS, so 2 '?' bytes
        expect(bytes.length).toBe(2);
        expect(bytes[0]).toBe(63);
        expect(bytes[1]).toBe(63);
        expect(ascii.getString(bytes)).toBe("??");
    });

    it('应能正确处理 Emoji (UTF-16)', () => {
        const unicode = Encoding.unicode;
        const emoji = "😊"; 
        const bytes = unicode.getBytes(emoji);
        // 2 chars * 2 bytes = 4 bytes
        expect(bytes.length).toBe(4);
        // Little Endian check for U+1F60A (D83D DE0A) -> 3D D8 0A DE
        expect(bytes[0]).toBe(0x3D);
        expect(bytes[1]).toBe(0xD8);
        expect(bytes[2]).toBe(0x0A);
        expect(bytes[3]).toBe(0xDE);
        expect(unicode.getString(bytes)).toBe(emoji);
    });
});

runSeparateModulesTests(describe, it, expect);
