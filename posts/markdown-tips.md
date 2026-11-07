---
title: Markdown 实用技巧：链接、下载与数学公式
date: 2026-11-07
category: Markdown
read: 12 分钟
excerpt: 从网址链接、文件下载到 LaTeX 数学公式，一篇讲清本博客里写文章常用的 Markdown 技巧。
---

这个博客的每篇文章都是一个 `.md` 文件。下面这些写法在本博客里都能直接用，建议收藏备查。

## 一、网址链接

### 1. 普通链接

```markdown
[CodeBuddy 官网](https://www.codebuddy.ai)
[返回博客首页](index.html)
```

效果：[CodeBuddy 官网](https://www.codebuddy.ai) · [返回博客首页](index.html)

> 站内页面用相对路径即可，如 `index.html`；GitHub Pages 部署在子目录时也不会失效。

### 2. 自动链接

用尖括号包住网址，网址本身会变成可点击的文字：

```markdown
<https://github.com>
<you@example.com>
```

效果：<https://github.com> · <you@example.com>

### 3. 参考式链接

正文更清爽，适合同一个链接反复出现：

```markdown
我常用 [GitHub][gh] 和 [MDN][mdn] 查资料。

[gh]: https://github.com
[mdn]: https://developer.mozilla.org
```

效果：我常用 [GitHub][gh] 和 [MDN][mdn] 查资料。

[gh]: https://github.com
[mdn]: https://developer.mozilla.org

### 4. 在新标签页打开

Markdown 原生语法不支持，但可以内嵌 HTML：

```html
<a href="https://github.com" target="_blank" rel="noopener">GitHub（新窗口）</a>
```

效果：<a href="https://github.com" target="_blank" rel="noopener">GitHub（新窗口）</a>

### 5. 邮箱与电话

```markdown
[给我发邮件](mailto:you@example.com)
```

效果：[给我发邮件](mailto:you@example.com)（本站「关于我」里的邮箱按钮就是这样配的）

---

## 二、下载文件

### 1. 最普通的做法

把文件放进项目目录（例如 `pictures/` 或新建 `files/`），然后写链接：

```markdown
[查看示例图片](pictures/hero-bg.jpg)
```

效果：[查看示例图片](pictures/hero-bg.jpg) —— 浏览器会**打开**图片，而不是下载。

### 2. 强制下载

加 HTML 的 `download` 属性即可让浏览器弹出保存框：

```html
<a href="pictures/hero-bg.jpg" download>下载示例图片</a>
```

效果：<a href="pictures/hero-bg.jpg" download class="btn primary">下载示例图片</a>

`download` 后面还可以指定保存时的文件名：

```html
<a href="pictures/hero-bg.jpg" download="我的头图.jpg">另存为「我的头图.jpg」</a>
```

### 3. 注意事项

- **路径要相对**：文章页在网站根目录，所以 `pictures/xxx.jpg` 就能找到文件
- **跨域文件无效**：`download` 只对同源链接可靠，外链文件可能被浏览器直接打开
- **大文件**：建议压缩后再放进仓库，GitHub 仓库单文件上限 100 MB
- **发布后**：把文件一起提交/推送到 GitHub，线上才能访问

---

## 三、数学公式（LaTeX）

本博客已接入 KaTeX，支持行内与块级公式。

### 1. 行内公式

用一个 `$` 包起来：

```markdown
质能方程 $E = mc^2$，以及欧拉恒等式 $e^{i\pi} + 1 = 0$。
```

效果：质能方程 $E = mc^2$，以及欧拉恒等式 $e^{i\pi} + 1 = 0$。

### 2. 块级公式

用两个美元符号包裹，并让它们各自独占一行：

```markdown
$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$
```

效果：

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$

再来一个矩阵：

$$
\begin{bmatrix} a & b \\ c & d \end{bmatrix}
\begin{bmatrix} x \\ y \end{bmatrix}
= \lambda \begin{bmatrix} x \\ y \end{bmatrix}
$$

### 3. 常用语法速查

| 想要的效果 | 写法 |
|---|---|
| 上下标 | `x^2`、`a_1`、`x^{n+1}` |
| 分式 | `\frac{a}{b}` |
| 根号 | `\sqrt{x}`、`\sqrt[3]{x}` |
| 求和 / 积分 | `\sum_{i=1}^{n}`、`\int_0^1` |
| 希腊字母 | `\alpha`、`\beta`、`\pi`、`\Omega` |
| 极限 | `\lim_{x \to 0}` |
| 对齐多行 | `\begin{aligned} ... \end{aligned}` |

> 提示：公式被保护后再交给 Markdown 渲染，所以 `\`、`{`、`}` 这些字符不会冲突。代码块里的 `$` 也不会被误当成公式。

---

## 四、其他常用技巧

### 表格

```markdown
| 功能 | 语法 |
|---|---|
| 粗体 | `**文字**` |
| 斜体 | `*文字*` |
```

效果：

| 功能 | 语法 |
|---|---|
| 粗体 | `**文字**` |
| 斜体 | `*文字*` |

### 代码块与语法高亮

在三个反引号后写语言名：

````markdown
```js
const hello = "world";
```
````

效果：

```js
const hello = "world";
```

### 任务列表

```markdown
- [x] 写文章
- [ ] 配图
```

效果：

- [x] 写文章
- [ ] 配图

### 图片

```markdown
![头图](pictures/hero-bg.jpg)
```

效果（图片较宽，可横向滚动）：

![头图](pictures/hero-bg.jpg)

### 引用与分割线

> 这是一段引用文字，适合强调结论或标注出处。

用三个短横线单独成行即可插入一条分割线：

```markdown
---
```

效果就是文中各节之间的横向细线。

> 小提示：脚注（`[^1]`）不属于 GFM 标准，本站暂不渲染，建议改用引用块代替。

### 内嵌 HTML

Markdown 里可以直接写 HTML，用来做按钮、指定样式等：

```html
<a class="btn primary" href="index.html">返回首页</a>
```

效果：<a class="btn primary" href="index.html">返回首页</a>

---

## 五、发布一篇文章的完整流程

1. 在 `posts/` 下新建 `.md` 文件，按本文开头的格式写好 front-matter（`title` / `date` / `category` / `read` / `excerpt`）
2. 在 `config.js` 的 `posts` 数组中加入文件名（不含 `.md`）
3. 双击 `preview.bat` 预览，确认链接、图片、公式都正常
4. 提交并推送到 GitHub，Pages 会自动更新

现在就可以点左上角回到首页，看看这篇文章在列表里的样子了。
