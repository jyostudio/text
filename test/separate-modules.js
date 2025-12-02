import StringBuilder from '../dist/string-builder.js';
import Encoding from '../dist/encoding.js';
import ASCIIEncoding from '../dist/ascii-encoding.js';
import UTF8Encoding from '../dist/utf8-encoding.js';
import UnicodeEncoding from '../dist/unicode-encoding.js';
import UTF32Encoding from '../dist/utf32-encoding.js';
import EncodingInfo from '../dist/encoding-info.js';

export function runSeparateModulesTests(describe, it, expect) {
    describe('独立模块加载测试 (Separate Modules)', () => {
        it('StringBuilder 应能从独立文件加载并工作', () => {
            const sb = new StringBuilder("Test");
            expect(sb.toString()).toBe("Test");
            sb.append(" Works");
            expect(sb.toString()).toBe("Test Works");
        });

        it('Encoding 应能从独立文件加载', () => {
            expect(Encoding).toBeTruthy();
        });

        it('ASCIIEncoding 应能从独立文件加载并注册', () => {
            // Just importing the module should register it
            const ascii = Encoding.getEncoding("us-ascii");
            expect(ascii).toBeTruthy();
            expect(ascii instanceof ASCIIEncoding).toBe(true);
            expect(ascii.webName).toBe("us-ascii");
        });
        
        it('UTF8Encoding 应能从独立文件加载并注册', () => {
            const utf8 = Encoding.getEncoding("utf-8");
            expect(utf8).toBeTruthy();
            expect(utf8 instanceof UTF8Encoding).toBe(true);
            expect(utf8.webName).toBe("utf-8");
        });

        it('UnicodeEncoding 应能从独立文件加载并注册', () => {
            const unicode = Encoding.getEncoding("utf-16");
            expect(unicode).toBeTruthy();
            expect(unicode instanceof UnicodeEncoding).toBe(true);
            expect(unicode.webName).toBe("utf-16");
        });

        it('UTF32Encoding 应能从独立文件加载并注册', () => {
            const utf32 = Encoding.getEncoding("utf-32");
            expect(utf32).toBeTruthy();
            expect(utf32 instanceof UTF32Encoding).toBe(true);
            expect(utf32.webName).toBe("utf-32");
        });
        
        it('EncodingInfo 应能从独立文件加载', () => {
             expect(EncodingInfo).toBeTruthy();
        });

        it('不同模块间的交互应正常 (UTF8 -> ASCII)', () => {
            const utf8 = new UTF8Encoding();
            const ascii = new ASCIIEncoding();
            const str = "Hello";
            const bytes = utf8.getBytes(str);
            const decoded = ascii.getString(bytes);
            expect(decoded).toBe("Hello");
        });
    });
}
