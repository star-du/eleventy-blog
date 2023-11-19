---
title: 在 2023 重新学习 Unicode (UTF-8)
date: 2023-11-19
tags:
  - article-review
  - dev
  - stub
disclaimer:
  text: 本文是一篇小作品，取自维基百科的体裁定义
  url: https://zh.wikipedia.org/zh-hans/Wikipedia:%E5%B0%8F%E4%BD%9C%E5%93%81
---

中英对照版原文: [The Absolute Minimum Every Software Developer Must Know About Unicode in 2023 (Still No Excuses!)](https://blog.xinshijiededa.men/unicode/#user-content-fn-touche) by Nikita

UTF-8 是可变长编码，指的是其中的每个字符（character）所占字节数为 1 至 4。字符被指定了对应的数字序号，也就是码位（code point），所以码位和字符是一一对应的。所谓编码（encoding），就是码位在内存中的存储方式。
UTF-16 最初被设计为一种定长的编码，也就是每个码位始终由 16 个字节表示，但随后我们发现这样做是不可行的。

码位的概念只和存储直接相关，而对于人的交互和使用来说，扩展字位簇（extended grapheme cluster）才是我们直观认为的最小单元。每个 grapheme 可以使用多个码位进行编码：
> 比如说，`é`（一个单独的字位）在 Unicode 中被编码为 `e`（U+0065 拉丁小写字母 E）+ `´`（U+0301 连接重音符）。两个码位！

grapheme 应当在使用中被视为不可分割的单元，应该作为整体被选择、复制、删除 —— 这意味着我们认为很直观的 `len`，`substring` 等方法，正确的处理都并不能靠 code point 作为区分标准，而需要查阅 Unicode 的表。
而且，Unicode 标准每年还在更新，这意味着我们需要一个外部库来处理 Unicode，比如 Rust 的 [unicode-segmentation](https://crates.io/crates/unicode-segmentation)  。（很难指望编程语言跟上这个步伐，不过，据作者说 Swift 好像是现代语言中做的较好的）。

Unicode 还有其他的 intricacies 和 imperfections，其中之一就是有些字形被分配了相同的码位，而依赖区域设置 (locale) 。甚至有些意想不到的操作（`String::toLowerCase`）也与区域相关。而另一些字形互为变体，在进行搜索、比对等操作时，似乎应该归一化。