---
title: 我常用的 6 个开发效率工具
date: 2026-10-02
category: 工具
read: 6 分钟
excerpt: 工欲善其事，必先利其器。分享我日常离不开的效率神器与配置技巧。
---

好的工具能显著降低重复劳动。下面是我每天都离不开的 6 个工具。

## 1. VS Code + 快捷键

花一个下午把常用快捷键练熟，收益终身：多光标编辑、`Ctrl+P` 文件跳转、`Ctrl+Shift+F` 全局搜索。

## 2. Git 别名

在 `.gitconfig` 里配置常用命令的缩写：

```bash
git config --global alias.co checkout
git config --global alias.lg "log --oneline --graph"
```

## 3. npx 脚本

临时跑包不安装，`npx serve .` 一行起一个静态服务器。

## 4. 浏览器 DevTools

不只是看 DOM：Performance 面板查卡顿、Lighthouse 查性能、设备模拟查响应式。

## 5. 正则测试器

regex101 之类的在线工具，写复杂正则前先验证，能省掉大量调试时间。

## 6. 代码片段管理

把高频样板代码存成 snippet，一次编写、处处复用。
