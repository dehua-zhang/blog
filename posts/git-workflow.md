---
title: Git 工作流：团队协作的最佳实践
date: 2026-09-20
category: 工程化
read: 7 分钟
excerpt: 分支策略、提交规范、Code Review，聊聊让团队协作更顺畅的 Git 约定。
---

团队里 Git 用得好不好，直接决定协作效率。分享我们实践中验证过的几条约定。

## 分支策略

采用简化版 Git Flow：

- `main`：随时可发布，受保护；
- `develop`：集成最新开发成果；
- `feature/*`：一个功能一个分支，短平快。

## 提交规范

统一使用 Conventional Commits：

```text
feat: 支持文章搜索
fix: 修复暗色模式下导航栏闪烁
docs: 更新 README
```

好处是 CHANGELOG 可以自动生成，历史一目了然。

## Code Review

- PR 保持小而聚焦，超过 400 行就拆分；
- Review 关注逻辑与设计，风格问题交给格式化工具；
- 合并前必须通过 CI。

## 小结

工具是死的，约定是活的。关键是团队达成共识并坚持执行。
