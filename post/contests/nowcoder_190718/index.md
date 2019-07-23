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

题面：Two arrays u and v each with m distinct elements are called equivalent if and only if $RMQ(u,l,r)=RMQ(v,l,r) \text{ for all } 1\le l \le r \le m$
 where $RMQ(w,l,r)$ denotes the **index** of the minimum element among $w\_l,w\_{l+1},\ldots,w\_r$.
 Since the array contains distinct elements, the definition of minimum is unambiguous.

 Two arrays a and b each with n distinct elements. Find the maximum number $p≤n$ where $\lbrace a\_1,a\_2,…,a\_p \rbrace$ and $\lbrace b\_1,b\_2,…,b\_p \rbrace$ are equivalent.  

这题一开始样例都没看懂，最后发现这个题目里的RMQ是返回下标的！我TM，合着不会RMQ的读这题是不是还有优势些？

比赛的时候躺在椅子上对天画了半天也没想出来。题解给了两种方法，一种是笛卡尔树，一种是用单调栈实现的笛卡尔树的性质。说实话我在这场比赛之前都不知道笛卡尔树是个什么东西，不过据说它能在$O(n)$的时间内构造出来，这个题等价于两个序列笛卡尔树相同的最长前缀，于是可以二分答案构造笛卡尔树，这样是$O(n\log n)$的。

然后题解给了一种用单调栈求$last\_a(i) = max \lbrace j : j < i \text{ and } a\_j > a\_i \rbrace$的做法，证明是$n, last(n), last(last(n)),\ldots$是笛卡尔树的最右路径，半懂不懂的。

总之这样是$O(n)$的，下附AC代码。

```cpp
#define _CRT_SECURE_NO_WARNINGS
#define _SILENCE_CXX17_C_HEADER_DEPRECATION_WARNING
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int N = 1e5 + 50;
int a[N], b[N];
int main()
{
    vector<int> qa, qb;
    for (int n; ~scanf("%d", &n);)
    {
        qa.clear(), qb.clear();
        qa.push_back(0), qb.push_back(0);
        for (int i = 1; i <= n; i++) scanf("%d", a + i);
        for (int i = 1; i <= n; i++) scanf("%d", b + i);
        int ans = 0;
        for (int i = 1; i <= n; ans = i++)
        {
            while (a[qa.back()] > a[i]) qa.pop_back();
            while (b[qb.back()] > b[i]) qb.pop_back();
            if (qa.back() != qb.back()) break;
            qa.push_back(i), qb.push_back(i);
        }
        printf("%d\n", ans);
    }
    return 0;
}
```

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
$$
\alpha test
$$


我实在不明白为什么会有人做出卡`memset`的事情来。

## [B Integration](https://ac.nowcoder.com/acm/contest/881/B)

$$ \text{计算}\quad
\frac{1}{\pi}\int\_0^\infty\frac{1}{\prod\_{i=1}^n(a_i^2+x^2)}\mathrm{d}x \\
\text{令}\ c_i=\frac{1}{\prod\_{j\ne i}(a\_j^2-a\_i^2)} \\
\text{则}\ \frac{1}{\pi}\int\_0^\infty\frac{1}{\prod\_{i=1}^n(a\_i^2+x^2)}\mathrm{d}x \\
= \frac{1}{\pi}\int\_0^\infty\sum\frac{c\_i}{a\_i^2+x^2}\mathrm{d}x \\
=\frac{1}{\pi}\sum\frac{c\_i}{a\_i}\int\_0^\infty\frac{1}{1+(\frac{x}{a\_i})^2}\mathrm{d}\frac{x}{a\_i} \\
=\frac{1}{2}\sum\frac{c\_i}{a\_i} $$

大概就是这样一个数学题了。

<hr />
> <span id='poem'></span>

<div id="__comment"></div>
<script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
