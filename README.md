# ZDH.blog — 个人博客网页

一个纯静态、无需构建工具的现代化博客网页（HTML + CSS + 原生 JavaScript + Markdown）。

## 功能

- **内容与页面分离**：每篇文章是一个独立的 Markdown 文件
- 响应式布局（移动端 / 桌面端自适应）
- 亮 / 暗主题切换（自动跟随系统偏好，并记忆用户选择）
- 文章卡片列表 + 即时搜索过滤
- 文章详情页动态渲染 Markdown（基于 marked.js）
- 支持 LaTeX 数学公式（基于 KaTeX，行内 `$...$`、块级 `$$...$$`）

## 运行

由于浏览器安全策略，`fetch` 读取本地 Markdown 需要通过 HTTP 访问（直接双击 `index.html` 无法加载文章）。在本目录启动任意静态服务器即可：

```powershell
npx serve .
# 或
python -m http.server 8080
```

然后访问 http://localhost:8080。

## 部署到 GitHub Pages（重要）

本项目的文章是浏览器运行时直接 `fetch` 读取的 `posts/*.md` 原文件，而 **GitHub Pages 默认会用 Jekyll 构建**，带 `---` front-matter 的 `.md` 会被 Jekyll 转换成 HTML，导致 `posts/xxx.md` 返回 404、文章加载失败。

项目根目录已包含空的 **`.nojekyll`** 文件，作用就是让 GitHub Pages 跳过 Jekyll、原样发布所有文件。**推送时务必把这个文件一起提交**（它是点开头的隐藏文件，网页拖拽上传时容易漏掉）。

排查线上 404 的顺序：

1. 打开 `https://你的用户名.github.io/posts/markdown-tips.md`，能直接看到 Markdown 原文即正常
2. 若 404：确认仓库根目录存在 `.nojekyll`，且 `posts/` 目录里的文件都已推送
3. 推送后等待 1~2 分钟重新部署，再 `Ctrl+F5` 强制刷新
4. 用子路径部署（`用户名.github.io/仓库名/`）无需改代码，所有资源都是相对路径

## 目录结构

```
blog/
├── .nojekyll           # GitHub Pages 专用：跳过 Jekyll，原样发布 .md 文件
├── config.js           # ★ 唯一需要编辑的文件：站点内容 + 文章清单 + 界面文案
├── index.html          # 首页（纯结构，文案全部由 config.js 填充）
├── post.html           # 文章详情页（?post=slug 加载对应 md）
├── preview.bat         # 双击即可启动预览
├── css/style.css       # 全部样式（CSS 变量主题系统）
├── js/main.js          # 程序逻辑：加载 md、解析 front-matter、渲染与搜索
├── pictures/           # 图片资源（如头部背景图 hero-bg.jpg）
└── posts/              # ★ 博客内容：一篇文章一个 .md 文件
    ├── markdown-tips.md
    ├── build-modern-blog.md
    ├── css-variables-theming.md
    ├── js-async-guide.md
    ├── dev-tools.md
    ├── git-workflow.md
    └── tech-writing.md
```

## 如何修改站点内容

**所有可编辑内容都在根目录的 `config.js` 一个文件里**，改完刷新浏览器生效，HTML / JS / CSS 都不用动。

> 本地资源（`style.css` / `config.js` / `main.js`）加载时会自动附加时间戳参数，避免浏览器缓存旧版，因此**普通刷新即可看到最新改动**，无需强制刷新。部署到 GitHub Pages 后同样有效。

### 站点信息

- `siteName` / `logoSuffix`：站点名（logo、浏览器标签、页脚共用）
- `greeting` / `name` / `avatar`：首页大标题和头像
  - `avatar` 可填 emoji、图片路径（如 `pictures/me.jpg`）或网络图片地址；填 `""` 则不显示
- `heroSub`：标题下的一句自我介绍
- `heroBackground`：头部背景图，把图片放进 `pictures/`，改这里的文件名即可换图
- `featured.slug` / `featured.cover`：置顶推荐的文章（标题/摘要自动读取该文章 md）
- `about.title` / `about.text` / `about.links`：关于我板块的标题、正文和社交链接按钮
- `footer`：页脚文字

### 配色（改一个词即可换色系）

`colorPreset` 一共 12 种可选：

| 预设名 | 色系 | 预设名 | 色系 |
|---|---|---|---|
| `violet` | 紫罗兰 | `navy` | 海军蓝 |
| `ocean` | 海蓝 | `chinaRed` | 中国红 |
| `forest` | 森林绿 | `teal` | 青碧 |
| `sunset` | 暖橙 | `amber` | 琥珀金 |
| `rose` | 玫瑰红 | `lavender` | 薰衣草 |
| `mono` | 石墨灰 | `coffee` | 咖啡棕 |

例如换成中国红：

```js
colorPreset: "chinaRed",
```

也可以只覆盖其中某几个颜色：保持 `colorPreset` 不变，在 `colors` 里给需要的字段填色值，**留空 `""` 的字段继续跟随预设**。例如只想换首页名字颜色：

```js
colorPreset: "sunset",
colors: { accentSoft: "#ffd9a0" },
```

想把六个颜色全部自定义：把 `colorPreset` 改成 `"custom"`，并填满 `colors` 六项：

| 字段 | 作用 |
|---|---|
| `primary` | 亮色主题主色（按钮、链接、标签） |
| `primaryStrong` | 主色加深（按钮悬停） |
| `primaryDark` | 暗色主题主色（自动使用，暗背景下更亮） |
| `accentFrom` / `accentTo` | 渐变起止色（置顶封面、标题装饰线） |
| `accentSoft` | 首页名字（`<em>`）的颜色，跟随色系变化 |

配色同时作用于首页与文章页，并自动适配亮/暗主题。

### 文章清单

- `posts`：文章文件名数组（对应 `posts/` 下的 `.md`），首页按日期倒序显示

### 界面文案（labels）

- `homeTitle`：浏览器标签标题
- `navHome` / `navPosts` / `navAbout`：导航文字（首页与文章页共用一套）
- `heroPrimary` / `heroSecondary`：Hero 区两个按钮
- `featuredTag` / `postsTitle` / `searchPlaceholder` / `emptyTip`：置顶标签、栏目标题、搜索提示、空结果提示
- `backHome` / `loading`：返回按钮、加载占位文字
- `author` / `uncategorized` / `readSuffix`：文章署名前缀、默认分类、"阅读"单位词
- `themeIconLight` / `themeIconDark` / `toggleTheme`：主题按钮图标与提示
- `loadFailTip` / `serverTip` / `postServerTip` / `postFailTitle` / `featuredFail`：各种错误提示

## 如何发布新文章

1. 在 `posts/` 目录新建一个 `.md` 文件（如 `my-new-post.md`）：

   ```markdown
   ---
   title: 文章标题
   date: 2026-11-07
   category: 分类
   read: 5 分钟
   excerpt: 一句话摘要，会显示在首页卡片上。
   ---

   正文用 Markdown 书写，支持标题、列表、代码块等。
   ```

2. 在 `config.js` 的 `posts` 数组中加入文件名（不含 `.md`）。

完成，刷新首页即可看到新文章。

## 数学公式写法

在文章 md 里直接写 LaTeX，公式会在文章页由 KaTeX 渲染：

```markdown
行内公式 $E = mc^2$

$$
\int_0^1 x^2\,dx = \frac{1}{3}
$$
```

- 行内用单个 `$...$`，块级用独占一行的 `$$` 包裹
- 公式会先被保护再交给 Markdown 渲染，因此 `\`、`{`、`}` 不会冲突
- 代码示例里的 `$` 也不会被误渲染（代码块会被 KaTeX 忽略）
- `posts/markdown-tips.md` 里有链接、下载、公式、表格等完整示例

> KaTeX 的 CSS / JS 通过 CDN 加载，离线时公式会显示为原始文本，不影响正文阅读。
