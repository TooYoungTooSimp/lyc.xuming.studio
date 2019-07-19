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

题目：Bobo has a string of length $2(n + m)$ which consists of characters `A` and `B`. The string also has a fascinating property: it can be decomposed into $(n + m)$ subsequences of length $2$, and among the $(n + m)$ subsequences $n$ of them are `AB`  while other $m$ of them are `BA`.

 Given $n$ and $m$, find the number of possible strings modulo $(10^9+7)$.  

数据范围：

- $0 \leq n, m \leq 10^3$

- **There are at most 2019 test cases, and at most 20 of them has $max(n,m)>50$.**

红小豆写的题解，看起来是个DP。

> woc这。。意外的水。。           ——红小豆

不过zz的我还是没有搞清楚为什么可以这么写。

```cpp
#define _CRT_SECURE_NO_WARNINGS
#include<iostream>
#include<cstdio>
#include<algorithm>
#include<cmath>
#include<utility>
#include<cstring>
#include<cstdlib>
using namespace std;
typedef long long ll;
const int mod = 1e9 + 7;
int d[4005][2005];
int n, m;

int main()
{
	while (cin >> n >> m) {
        // memset(d, 0, sizeof(d)) leads to TLE.
		for (int i = 1; i <= n + m + 1; i++)
			for (int j = 1; j <= n + m + 1; j++)
				d[i][j] = 0;
		d[1][1] = 1;
		for (int i = 1; i <= n + m+1; i++)
			for (int j = 1; j <= n + m+1; j++) {
				if (j - i <= m)d[i][j] = (d[i][j] + d[i][j - 1]) % mod;
				if (i - j <= n)d[i][j] = (d[i][j] + d[i - 1][j]) % mod;
			}
		cout << d[n + m + 1][n + m + 1] << endl;
	}

#ifdef _DEBUG
	system("pause");
#endif
	return 0;
}
```

惊！明明更快的`memset`会导致TLE，但是换回传统而慢的`for`竟然AC了！这是人性的扭曲还是……（拖走

好吧问题出在数据范围的第二句，最多只有不到$1\%$的数据是稍微大上一点的，其他$99\%$的都是不超过$50$的小数据，而`memset`每次都清空一个巨大的数组，就算`memset`的速度快，但是要清空的地方实在太大，于是不可避免地花掉了更多的时间而导致TLE。

我实在不明白为什么会有人做出卡`memset`的事情来。

## [B Integration](https://ac.nowcoder.com/acm/contest/881/B)

<hr />
> <span id='poem'></span>

<div id="__comment"></div>
<script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
