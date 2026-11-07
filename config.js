// ============================================================
// 站点配置文件 —— 你唯一需要编辑的文件
// ------------------------------------------------------------
// 改完保存，刷新浏览器即可生效（无需动 HTML / CSS / JS）。
//   站点内容  → siteName / greeting / name / about / footer ...
//   文章清单  → posts 数组（新增文章时在 posts/ 建 md，再把文件名加到这里）
//   界面文案  → labels（导航、按钮、提示等所有页面文字）
// ============================================================

const SITE = {
  // ---------- 基本信息 ----------
  siteName: "张德华",
  logoSuffix: ".blog",

  // ---------- 配色 ----------
  // 换色系只需把下面这一项改成预设名：
  //   经典：violet 紫罗兰 / ocean 海蓝 / forest 森林绿 / sunset 暖橙
  //         rose 玫瑰红 / mono 石墨灰
  //   新增：navy 海军蓝 / chinaRed 中国红 / teal 青碧 / amber 琥珀金
  //         lavender 薰衣草 / coffee 咖啡棕
  //   自定义：custom 使用下面 colors 里的颜色
  colorPreset: "amber",

  // 单独覆盖某个颜色：填入色值即覆盖当前预设，留空 "" 则跟随预设
  // 想把六个颜色全部自定义：把 colorPreset 改成 "custom" 并填满下面六项
  colors: {
    primary: "", // 亮色主题主色（按钮、链接、标签）
    primaryStrong: "", // 主色加深（按钮悬停）
    primaryDark: "", // 暗色主题主色（暗背景下更亮）
    accentFrom: "", // 渐变起始色（置顶封面、标题装饰线）
    accentTo: "", // 渐变结束色
    accentSoft: "", // ★ 首页「张德华」三个字的颜色（留空则跟随色系）
  },

  // ---------- 首页问候区 ----------
  greeting: "你好，我是",
  name: "张德华",
  // 头像：填 emoji（如 "👋"）、图片路径（如 "pictures/me.jpg"）或网络图片地址
  // 留空字符串 "" 则不显示头像
  avatar: " ",
  heroSub: "一名热爱技术与设计的开发者，在这里记录学习、思考与生活。",

  // 头部背景图：把图片放进 pictures/ 文件夹，改这里的文件名即可换图
  // 也可以填网络图片地址；留空字符串 "" 则不显示背景图
  heroBackground: "pictures/hero-bg.jpg",

  // ---------- 文章 ----------
  // 文章清单：对应 posts/ 目录下的 .md 文件名（不含 .md）
  // 发布新文章：把文件名加进这个数组即可，首页会自动按日期倒序显示
  posts: [
    "markdown-tips",
    "build-modern-blog",
    "css-variables-theming",
    "js-async-guide",
    "dev-tools",
    "git-workflow",
    "tech-writing",
  ],

  // 置顶推荐：填上面清单里的某个文件名
  // 标题、摘要、日期自动读取该文章 md 文件的 front-matter
  featured: {
    slug: "build-modern-blog",
    cover: "pictures/hero-bg.jpg", // 封面 emoji 或图片路径
  },

  // ---------- 关于我 ----------
  about: {
    title: "关于我",
    text: "我是一名开发者，专注于 Web 前端与工程化。这个博客用于沉淀技术笔记与生活随笔，希望这些内容对你有所帮助。欢迎通过下面的方式与我交流。",
    links: [
      { label: "GitHub", url: "https://github.com/yourname" },
      { label: "邮箱", url: "mailto:zhangdehuau@email.ustc.edu.cn" },
    ],
  },

  // ---------- 页脚 ----------
  footer: "© 2026 张德华.blog · 用 ❤ 与代码构建",

  // ============================================================
  // 界面文案：页面上的所有固定文字都在这里，可随意改成你喜欢的说法
  // ============================================================
  labels: {
    homeTitle: "我的博客 · 记录与思考",

    navHome: "首页",
    navPosts: "文章",
    navAbout: "关于",
    toggleTheme: "切换主题",
    themeIconLight: "🌙", // 亮色主题时按钮显示的图标
    themeIconDark: "☀️", // 暗色主题时按钮显示的图标

    heroPrimary: "开始阅读",
    heroSecondary: "关于我",

    featuredTag: "置顶推荐",
    postsTitle: "最新文章",
    searchPlaceholder: "搜索文章…",
    emptyTip: "没有找到匹配的文章 😢",

    backHome: "← 返回首页",
    loading: "加载中…",

    author: "作者",
    uncategorized: "未分类",
    readSuffix: "阅读",
    defaultSiteName: "我的博客",

    loadFailTip: "文章加载失败：",
    serverTip: "提示：请通过本地服务器访问（如 npx serve .），直接双击打开 HTML 会因浏览器安全策略无法读取 Markdown。",
    postServerTip: "提示：请通过本地服务器访问（如 npx serve .）。",
    postFailTitle: "文章加载失败",
    featuredFail: "置顶文章加载失败",
  },
};
