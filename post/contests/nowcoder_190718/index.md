---
template: post_with_isso
title: 2019牛客多校第一场
pageId: contests_nowcoder_190718
---

# 2019牛客多校第一场

上午讲课，嚎得嗓子疼。

凌晨写标程写到两点，早上七点又不到醒了，睡眠日益不规律。（且有缩短迹象

总之一整天都晕晕乎乎的。

这场比赛打得非常菜，仅仅是签到成功而已（还是用Python交的

所以决定补一下通过人数大于一百的题目。

## [J Fraction Comparision](https://ac.nowcoder.com/acm/contest/881/J)
输入$x,a,y,b$，比较$\frac{x}{a}$与$\frac{y}{b}$的大小。

作为Python选手，自然使用Python水过。

```python
try:
    while True:
        x, a, y, b = [int(x) for x in input().split()]
        if x * b == y * a:
            print('=')
        if x * b < y * a:
            print('<')
        if x * b > y * a:
            print('>')
except EOFError:
    pass
```



<hr />
> <span id='poem'></span>

<div id="__comment"></div>
<script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
