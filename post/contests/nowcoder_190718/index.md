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

## [A Equivalent Prefixes](https://ac.nowcoder.com/acm/contest/881/A)



## [F Random Point in Triangle](https://ac.nowcoder.com/acm/contest/881/F)

给一个点的坐标都是整数的三角形，在三角形中均匀随机地取一点，这个点与顶点的连线会将这个三角形分成三个小三角形，求三个小三角形中最大的面积的期望的36倍（保证答案是一个整数）。

我完全搞不明白是为什么，但是输出三角形面积的22倍就可以AC了。

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
int main()
{
    ll x1, y1, x2, y2, x3, y3;
    while (~scanf("%lld%lld%lld%lld%lld%lld", &x1, &y1, &x2, &y2, &x3, &y3))
    {
        x2 -= x1, y2 -= y1;
        x3 -= x1, y3 -= y1;
        ll ans = abs(x2 * y3 - x3 * y2) * 11;
        printf("%lld\n", ans);
    }
    return 0;
}
```



## [E  ABBA](https://ac.nowcoder.com/acm/contest/881/E)

## [B Integration](https://ac.nowcoder.com/acm/contest/881/B)

<hr />
> <span id='poem'></span>

<div id="__comment"></div>
<script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
