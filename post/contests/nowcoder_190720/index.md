---
template: post_with_isso
title: 2019牛客多校第二场
pageId: contests_nowcoder_190720
---

# 2019牛客多校第二场

早上六点不到醒了，睡眠确乎是日益不规律而缩短了。

这场比赛打得非常菜，甚至连到都没签上。

所以决定补一下两个签到题（虽然做了大于两题的只有30个队）。

## [H Second Large Rectangle](https://ac.nowcoder.com/acm/contest/882/H)

## [F Partition problem](https://ac.nowcoder.com/acm/contest/882/F)

给定$2n$阶对称矩阵$M$且保证$M_{ii}=0$，求两个大小相同的集合$A,B$，满足$A\cup B=\lbrace 1\ldots2n\rbrace,A\cap B=\emptyset$，使得$\sum\limits_{i\in A}\sum\limits_{j\in B}M_{i,j}$最大。

$\binom{2n}{n},n\leq14$好像也不是那么大的样子，所以我试了试暴搜，然后果不其然TLE了。

题解上说把最后的$n^2$计算分摊到每一步就从$\binom{2n}{n}n^2$变成$\binom{2n}{n}n$了，我持怀疑态度，虽然初看起来的确如此，但是实际上，那个$n$并没有被消除，而是分摊到dfs的深度那里了，深度是$O(n)$，每层计算$O(n)$，实际上还是$\binom{2n}{n}n^2$的，而且这个题卡常数，同样一份代码昨天晚上交AC今天下午交就TLE，所以这里就不放代码了。

<hr />
> <span id='poem'></span>

<div id="__comment"></div>
<script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
