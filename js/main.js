// ============================================================
// 所有可编辑内容都来自根目录 config.js（站点信息、文章清单、界面文案）
// ============================================================
const CFG = typeof SITE !== "undefined" ? SITE : {};
const L = CFG.labels || {};
const label = (key, fallback = "") => L[key] ?? fallback;
const POSTS = Array.isArray(CFG.posts) ? CFG.posts : [];

// ============ 配色预设（在 config.js 里选 colorPreset） ============
const COLOR_PRESETS = {
  violet: { primary: "#4f6ef7", primaryStrong: "#3b56d9", primaryDark: "#7b93ff", accentFrom: "#6a8dff", accentTo: "#a26aff", accentSoft: "#d9c8ff" },
  ocean: { primary: "#0d8bd9", primaryStrong: "#0a6fb0", primaryDark: "#5fc2f5", accentFrom: "#38bdf8", accentTo: "#1d4ed8", accentSoft: "#bfe8ff" },
  forest: { primary: "#2f9e6f", primaryStrong: "#237a56", primaryDark: "#6fd3a3", accentFrom: "#34d399", accentTo: "#0f766e", accentSoft: "#c8f5d8" },
  sunset: { primary: "#e8663d", primaryStrong: "#c94f2c", primaryDark: "#ff9e7a", accentFrom: "#ff9a5a", accentTo: "#e0455e", accentSoft: "#ffc38a" },
  rose: { primary: "#d6497f", primaryStrong: "#b03564", primaryDark: "#f38bb4", accentFrom: "#f472b6", accentTo: "#a855f7", accentSoft: "#ffc9de" },
  mono: { primary: "#4b5563", primaryStrong: "#374151", primaryDark: "#9ca3af", accentFrom: "#64748b", accentTo: "#334155", accentSoft: "#e5e7eb" },
  navy: { primary: "#1e40af", primaryStrong: "#1b3691", primaryDark: "#8ab4ff", accentFrom: "#3b6fe0", accentTo: "#10245c", accentSoft: "#c9dcff" },
  chinaRed: { primary: "#c8102e", primaryStrong: "#9e0c24", primaryDark: "#ff8080", accentFrom: "#e63946", accentTo: "#8f0d20", accentSoft: "#ffd2c9" },
  teal: { primary: "#0d9488", primaryStrong: "#0a726a", primaryDark: "#5eead4", accentFrom: "#2dd4bf", accentTo: "#0f5f6e", accentSoft: "#bff5ec" },
  amber: { primary: "#d97706", primaryStrong: "#b45309", primaryDark: "#fbbf24", accentFrom: "#fbbf24", accentTo: "#b45309", accentSoft: "#ffe6a8" },
  lavender: { primary: "#7c5cd6", primaryStrong: "#6344b8", primaryDark: "#b9a3ff", accentFrom: "#a78bfa", accentTo: "#6d28d9", accentSoft: "#e2d6ff" },
  coffee: { primary: "#8b5e3c", primaryStrong: "#6f472c", primaryDark: "#d3a77f", accentFrom: "#b98a63", accentTo: "#5a3925", accentSoft: "#f0dcc4" },
};

/** 把配色写到根元素的 CSS 变量上（尽早执行，避免闪色） */
function applyColors() {
  const name = CFG.colorPreset || "violet";
  const base = name === "custom" ? COLOR_PRESETS.violet : COLOR_PRESETS[name] || COLOR_PRESETS.violet;
  const c = { ...base };
  // config.js 的 colors 里填了值的字段会覆盖预设，留空则跟随预设
  const overrides = CFG.colors || {};
  Object.keys(c).forEach((key) => {
    const v = overrides[key];
    if (typeof v === "string" && v.trim()) c[key] = v.trim();
  });
  const root = document.documentElement;
  Object.entries(c).forEach(([key, value]) => {
    const cssVar = "--" + key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
    root.style.setProperty(cssVar, value);
  });
}
applyColors();

// ============ 主题切换（亮 / 暗） ============
const themeToggle = document.getElementById("themeToggle");
const isDark = () => document.documentElement.getAttribute("data-theme") === "dark";
const syncThemeIcon = () => {
  if (themeToggle) {
    themeToggle.textContent = isDark()
      ? label("themeIconDark", "☀️")
      : label("themeIconLight", "🌙");
  }
};
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || (!savedTheme && matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.documentElement.setAttribute("data-theme", "dark");
}
syncThemeIcon();
themeToggle?.addEventListener("click", () => {
  const dark = isDark();
  document.documentElement.setAttribute("data-theme", dark ? "light" : "dark");
  syncThemeIcon();
  localStorage.setItem("theme", dark ? "light" : "dark");
});

// ============ 滚动时导航栏加阴影 ============
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 10);
});

/** 解析 front-matter 与正文 */
function parseMarkdown(text) {
  const fm = {};
  let body = text;
  const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (match) {
    match[1].split("\n").forEach((line) => {
      const idx = line.indexOf(":");
      if (idx > -1) fm[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    });
    body = text.slice(match[0].length);
  }
  return { meta: fm, body };
}

async function loadPost(slug) {
  const res = await fetch(`posts/${slug}.md`);
  if (!res.ok) throw new Error(`posts/${slug}.md (${res.status})`);
  const { meta, body } = parseMarkdown(await res.text());
  return {
    slug,
    title: meta.title || slug,
    date: meta.date || "",
    category: meta.category || label("uncategorized", "未分类"),
    read: meta.read || "",
    excerpt: meta.excerpt || "",
    body,
  };
}

/** 首页模式：渲染文章卡片列表 */
async function initIndex() {
  const grid = document.getElementById("postGrid");
  if (!grid) return;
  const searchInput = document.getElementById("searchInput");
  const emptyTip = document.getElementById("emptyTip");
  let posts = [];

  try {
    posts = (await Promise.all(POSTS.map(loadPost))).sort((a, b) =>
      b.date.localeCompare(a.date)
    );
  } catch (err) {
    grid.innerHTML = `<p class="empty-tip">${label("loadFailTip")}${err.message}<br>
      ${label("serverTip")}</p>`;
    emptyTip.hidden = true;
    return;
  }

  const render = (list) => {
    grid.innerHTML = list
      .map(
        (p) => `
        <article class="post-card">
          <span class="tag">${p.category}</span>
          <h3><a href="post.html?post=${p.slug}">${p.title}</a></h3>
          <p>${p.excerpt}</p>
          <div class="meta"><span>${p.date}</span><span>·</span><span>${p.read}${label("readSuffix")}</span></div>
        </article>`
      )
      .join("");
    emptyTip.hidden = list.length > 0;
  };

  render(posts);
  searchInput?.addEventListener("input", (e) => {
    const kw = e.target.value.trim().toLowerCase();
    render(
      posts.filter((p) =>
        [p.title, p.excerpt, p.category].some((s) => s.toLowerCase().includes(kw))
      )
    );
  });
}

/**
 * 渲染 Markdown 正文：先把 LaTeX 公式换成占位符，避免 \、{、} 等被
 * Markdown 转义破坏，等 marked 生成 HTML 后再还原，交给 KaTeX 渲染。
 */
function renderArticle(md) {
  const formulas = [];
  const token = (i) => `MATHFORMULA${i}ENDTOKEN`;
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // 块级公式：两个美元符号必须各自独占一行，避免把正文里的 $$ 误判
  let safe = md.replace(/^\$\$[ \t]*\n([\s\S]*?)^\$\$[ \t]*$/gm, (m) => {
    const i = formulas.push(m) - 1;
    return `\n\n${token(i)}\n\n`;
  });
  safe = safe.replace(/\$([^$\n]+?)\$/g, (m) => {
    const i = formulas.push(m) - 1;
    return token(i);
  });

  return marked.parse(safe).replace(/MATHFORMULA(\d+)ENDTOKEN/g, (_, i) =>
    esc(formulas[Number(i)])
  );
}

/** 文章页模式：按 ?post=slug 加载并渲染 Markdown */
async function initPost() {
  const bodyEl = document.getElementById("articleBody");
  if (!bodyEl) return;
  const titleEl = document.getElementById("articleTitle");
  const metaEl = document.getElementById("articleMeta");
  const tagEl = document.getElementById("articleTag");

  const slug = new URLSearchParams(location.search).get("post") || POSTS[0];
  try {
    const post = await loadPost(slug);
    const siteLabel = (CFG.siteName || label("defaultSiteName")) + (CFG.logoSuffix || "");
    document.title = `${post.title} · ${siteLabel}`;
    tagEl.textContent = post.category;
    titleEl.textContent = post.title;
    metaEl.innerHTML = [
      post.date,
      post.read && `${post.read}${label("readSuffix")}`,
      `${label("author")}：${CFG.name || CFG.siteName}`,
    ]
      .filter(Boolean)
      .join("<span>·</span>");
    bodyEl.innerHTML = renderArticle(post.body);
    if (typeof renderMathInElement === "function") {
      renderMathInElement(bodyEl, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
        ],
        throwOnError: false,
      });
    }
  } catch (err) {
    titleEl.textContent = label("postFailTitle");
    bodyEl.innerHTML = `<p>${err.message}<br>${label("postServerTip")}</p>`;
  }
}

// ============================================================
// 站点内容渲染（内容来自根目录 config.js，编辑该文件即可修改）
// ============================================================

/** 判断是否为图片路径（否则当作 emoji / 纯文本显示） */
const isImagePath = (v) =>
  typeof v === "string" &&
  (/\.(png|jpe?g|gif|webp|svg)$/i.test(v) ||
    v.startsWith("http") ||
    v.startsWith("./") ||
    v.startsWith("images/") ||
    v.startsWith("pictures/"));

/** 往元素里填 emoji 文本或 <img> 图片；值为空时什么都不显示 */
function renderMedia(el, value) {
  if (!el) return;
  el.textContent = "";
  if (!value) return;
  if (isImagePath(value)) {
    const img = document.createElement("img");
    img.src = value;
    img.alt = "";
    el.appendChild(img);
  } else {
    el.textContent = value;
  }
}

function initSite() {
  if (typeof SITE === "undefined") return;

  // 通用界面文案：data-label 控制文字，data-placeholder 控制输入框提示
  document.querySelectorAll("[data-label]").forEach((el) => {
    el.textContent = label(el.dataset.label);
  });
  document.querySelectorAll("[data-placeholder]").forEach((el) => {
    el.placeholder = label(el.dataset.placeholder);
    el.setAttribute("aria-label", label(el.dataset.placeholder));
  });
  themeToggle?.setAttribute("aria-label", label("toggleTheme"));

  // 首页浏览器标签标题（文章页由 initPost 覆盖）
  if (document.querySelector(".hero")) document.title = label("homeTitle");

  // 顶部 logo（两页通用）
  document.querySelectorAll(".logo").forEach((el) => {
    el.textContent = "";
    el.append(CFG.siteName || "");
    const suffix = document.createElement("span");
    suffix.textContent = CFG.logoSuffix || "";
    el.appendChild(suffix);
  });

  // 首页问候区：你好，我是 XXX + 头像
  const heroTitle = document.getElementById("heroTitle");
  if (heroTitle) {
    heroTitle.textContent = "";
    heroTitle.append((CFG.greeting || "") + " ");
    const em = document.createElement("em");
    em.textContent = CFG.name || "";
    heroTitle.appendChild(em);
    const avatar = document.createElement("span");
    avatar.className = "avatar";
    heroTitle.appendChild(avatar);
    renderMedia(avatar, CFG.avatar);
  }

  const heroSub = document.getElementById("heroSub");
  if (heroSub) heroSub.textContent = CFG.heroSub || "";

  // 头部背景图（叠加一层暗色渐变，保证白色文字清晰）
  const hero = document.querySelector(".hero");
  if (hero && CFG.heroBackground) {
    hero.style.backgroundImage =
      'linear-gradient(rgba(20, 26, 45, 0.42), rgba(20, 26, 45, 0.55)), url("' +
      CFG.heroBackground +
      '")';
  }

  // 关于我
  const aboutTitle = document.getElementById("aboutTitle");
  if (aboutTitle && CFG.about) {
    aboutTitle.textContent = CFG.about.title || "";
    document.getElementById("aboutText").textContent = CFG.about.text || "";
    const links = document.getElementById("aboutLinks");
    links.innerHTML = "";
    (CFG.about.links || []).forEach((l) => {
      const a = document.createElement("a");
      a.className = "btn ghost";
      a.href = l.url;
      a.target = l.url.startsWith("http") ? "_blank" : "";
      a.rel = "noopener";
      a.textContent = l.label;
      links.appendChild(a);
    });
  }

  // 页脚
  const footerText = document.getElementById("footerText");
  if (footerText) footerText.textContent = CFG.footer || "";
}

/** 置顶推荐：自动读取 featured.slug 对应文章的 md 元数据 */
async function initFeatured() {
  const titleEl = document.getElementById("featuredTitle");
  if (!titleEl || typeof SITE === "undefined") return;
  try {
    const p = await loadPost(CFG.featured.slug);
    titleEl.innerHTML = `<a href="post.html?post=${p.slug}"></a>`;
    titleEl.querySelector("a").textContent = p.title;
    document.getElementById("featuredExcerpt").textContent = p.excerpt;
    document.getElementById("featuredMeta").innerHTML = [
      p.date,
      p.category,
      p.read && `${p.read}${label("readSuffix")}`,
    ]
      .filter(Boolean)
      .join("<span>·</span>");
    renderMedia(document.getElementById("featuredCover"), CFG.featured.cover);
  } catch (err) {
    titleEl.textContent = label("featuredFail");
    console.error(err);
  }
}

initSite();
initIndex();
initFeatured();
initPost();
