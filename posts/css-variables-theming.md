---
title: CSS 变量实战：一套代码两种主题
date: 2026-10-24
category: CSS
read: 5 分钟
excerpt: 利用 CSS 自定义属性与 data-theme 属性，优雅地实现亮暗主题切换。
---

主题切换的核心思路：把所有会随主题变化的颜色、阴影抽成 CSS 变量，再为暗色主题覆盖同一组变量。

## 基础用法

```css
:root {
  --bg: #fafafa;
  --text: #1a1a1a;
}
[data-theme="dark"] {
  --bg: #111318;
  --text: #e6e6e6;
}
```

## 切换与记忆

通过 JS 切换 `data-theme` 属性即可，配合 `localStorage` 记住用户的选择，首次访问还可以跟随系统的 `prefers-color-scheme`。

```js
const dark = document.documentElement.dataset.theme === "dark";
document.documentElement.dataset.theme = dark ? "light" : "dark";
localStorage.setItem("theme", dark ? "light" : "dark");
```

## 平滑过渡

在 `body` 上加一句 `transition: background 0.3s, color 0.3s`，切换时就不会生硬跳变。

## 小结

CSS 变量让主题系统变得极轻量——不需要预处理器、不需要构建，纯浏览器即可运行。
