# @jyostudio/text

提供了强大的文本处理能力，包括 `StringBuilder` 和多种字符编码支持（ASCII, UTF-8, UTF-16, UTF-32）。

## 安装

### Node.js

```bash
npm install @jyostudio/text
```

### 浏览器 (ES Modules)

```html
<script type="importmap">
  {
    "imports": {
      "@jyostudio/text": "https://unpkg.com/@jyostudio/text/dist/index.js"
    }
  }
</script>
```

## 完整用法 (推荐)

直接引用主入口文件，包含所有功能。

```javascript
import { StringBuilder, Encoding } from "@jyostudio/text";

// 使用 StringBuilder
const sb = new StringBuilder("Hello");
sb.append(" World");
console.log(sb.toString()); // "Hello World"

// 使用 Encoding
const utf8 = Encoding.utf8;
const bytes = utf8.getBytes("你好");
console.log(bytes);
```

## 按需引用 (独立模块)

为了减小体积，您可以只引用需要的功能模块。构建产物位于 `dist/` 目录下。

### 1. 单独使用 StringBuilder

`StringBuilder` 是完全独立的模块。

```javascript
import StringBuilder from "@jyostudio/text/dist/string-builder.js";

const sb = new StringBuilder();
sb.appendLine("Line 1");
```

### 2. 单独使用 Encoding

`Encoding` 系统采用注册机制。您需要引入基础的 `Encoding` 类，然后引入您需要的具体编码实现（如 `ascii-encoding.js`）。具体编码文件被引入时会自动注册到 `Encoding` 系统中。

**注意**：`ascii-encoding.js` 等文件依赖于 `encoding.js` 和 `encoding-info.js`。在使用模块加载器（如 Webpack 或原生 ES Modules）时，这些依赖会自动处理。

```javascript
// 1. 引入基础 Encoding 类
import Encoding from "@jyostudio/text/dist/encoding.js";

// 2. 引入需要的编码实现 (副作用导入，用于注册编码)
import "@jyostudio/text/dist/ascii-encoding.js";
import "@jyostudio/text/dist/utf8-encoding.js";

// 3. 使用
const ascii = Encoding.getEncoding("ascii");
const bytes = ascii.getBytes("Hello");
```

### 浏览器中使用独立模块

如果您直接在浏览器中使用独立文件，请确保正确配置 `importmap` 以解析模块间的依赖关系。

```html
<script type="importmap">
  {
    "imports": {
      "@jyostudio/text/dist/": "https://unpkg.com/@jyostudio/text/dist/"
    }
  }
</script>

<script type="module">
  import StringBuilder from "@jyostudio/text/dist/string-builder.js";
  import Encoding from "@jyostudio/text/dist/encoding.js";
  import "@jyostudio/text/dist/utf8-encoding.js";

  const sb = new StringBuilder("Test");
  const utf8 = Encoding.getEncoding("utf-8");
</script>
```

## 许可证

MIT License

Copyright (c) 2025 nivk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
