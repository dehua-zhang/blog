---
title: 写给初学者的 JavaScript 异步编程
date: 2026-10-15
category: JavaScript
read: 10 分钟
excerpt: 从回调到 Promise 再到 async/await，一次讲清异步的演进与最佳实践。
---

JavaScript 是单线程语言，异步是它的灵魂。理解异步的演进史，就理解了这门语言的一半。

## 回调时代

最早的异步靠回调函数，但嵌套多了就会形成"回调地狱"：

```js
getUser(id, (user) => {
  getPosts(user, (posts) => {
    getComments(posts[0], (comments) => {
      // 越嵌越深……
    });
  });
});
```

## Promise

Promise 把嵌套变成链式调用，错误处理也统一了：

```js
getUser(id)
  .then((user) => getPosts(user))
  .then((posts) => getComments(posts[0]))
  .catch(console.error);
```

## async / await

这是目前最推荐的写法——异步代码读起来就像同步代码：

```js
async function load() {
  try {
    const user = await getUser(id);
    const posts = await getPosts(user);
    const comments = await getComments(posts[0]);
  } catch (err) {
    console.error(err);
  }
}
```

## 实践建议

- 并行任务用 `Promise.all`，不要串行 `await`；
- 始终捕获异常，避免未处理的 Promise 拒绝；
- 需要取消时考虑 `AbortController`。
