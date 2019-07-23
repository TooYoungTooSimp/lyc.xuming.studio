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

所以决定补一下通过人数大于五百的题目。

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

我实在不明白为什么会有人做出卡`memset`的事情来。

## [B Integration](https://ac.nowcoder.com/acm/contest/881/B)

$$
\text{计算}\ \frac{1}{\pi}\int\_0^\infty\frac{1}{\prod\_{i=1}^n(a_i^2+x^2)}\mathrm{d}x
$$

$$
\text{令}\ c_i=\frac{1}{\prod\_{j\ne i}(a\_j^2-a\_i^2)}
$$

$$
\text{则}\ \frac{1}{\pi}\int\_0^\infty\frac{1}{\prod\_{i=1}^n(a\_i^2+x^2)}\mathrm{d}x
$$

$$
= \frac{1}{\pi}\int\_0^\infty\sum\frac{c\_i}{a\_i^2+x^2}\mathrm{d}x
$$

$$
=\frac{1}{\pi}\sum\frac{c\_i}{a\_i}\int\_0^\infty\frac{1}{1+(\frac{x}{a\_i})^2}\mathrm{d}\frac{x}{a\_i}
$$

$$
=\frac{1}{2}\sum\frac{c\_i}{a\_i}
$$

大概就是这样一个数学题了。

```cpp
#define _CRT_SECURE_NO_WARNINGS
#define _SILENCE_CXX17_C_HEADER_DEPRECATION_WARNING
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int N = 1e3 + 50, mod = 1e9 + 7;
ll a[N];
ll fpow(ll a, ll b)
{
    ll r = 1;
    for (; b; b >>= 1, a = a * a % mod)
        if (b & 1)
            r = r * a % mod;
    return r;
}
int main()
{
    for (int n; ~scanf("%d", &n);)
    {
        for (int i = 0; i < n; i++) scanf("%lld", a + i);
        ll ans = 0;
        for (int i = 0; i < n; i++)
        {
            ll p = 2 * a[i] % mod, aa = a[i] * a[i] % mod;
            for (int j = 0; j < n; j++)
                if (i != j)
                    p = p * (a[j] * a[j] % mod + mod - aa) % mod;
            ans = (ans + fpow(p, mod - 2)) % mod;
        }
        printf("%lld\n", ans);
    }
    return 0;
}
```

## [C Euclidean Distance](https://ac.nowcoder.com/acm/contest/881/C)

Bobo has a point A in the n dimension real space $\mathbb{R}^n$, whose coodinate is $(\frac{a\_1}{m},\frac{a\_2}{m},\ldots,\frac{a\_n}{m})$ where $a\_i$ and m are both integers. He wants to find another point $P=(p\_1,p\_2,\ldots,p\_n)$ meeting the following requirements.

* $p\_1,p\_2,\ldots,p\_n∈R$
* $p\_1,p\_2,\ldots,p\_n≥0$
* $p\_1+p\_2+\cdots+p\_n=1$
* The (squared) Euclidean distance between P and A, which is $\|A−P\|\_2^2=\sum\_{i=1}^n(\frac{a\_i}{m}−p\_i)^2$, is minimized.  

首先我们令$q\_i=m\cdot p\_i$，所求即转换为$\frac{1}{m^2}\sum\_{i=1}^n(a\_i−q\_i)^2$，这样算起来会比较简单。

接下来我们考虑如何将其最小化，注意到$a\_i$没有限制符号，但是$p\_i$都是非负的。这样我们只需要考虑正的$a\_i$，因为负的减非负的平方会变大，在正的$a\_i$中，因为是最小化平方和，于是应该优先将大的变小，这样我们只需要将$a\_i$从大到小排序，尽量把高的削平即可。

```cpp
#define _CRT_SECURE_NO_WARNINGS
#define _SILENCE_CXX17_C_HEADER_DEPRECATION_WARNING
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int N = 1e4 + 50;
ll a[N];
ll gcd(ll a, ll b) { return b == 0 ? a : gcd(b, a % b); }
int main()
{
    for (int n, m; ~scanf("%d%d", &n, &m);)
    {
        for (int i = 1; i <= n; i++) scanf("%lld", a + i);
        sort(a + 1, a + n + 1, greater<ll>());
        int pos = n, res = m;
        for (int i = 1; i < n; i++)
            if (i * (a[i] - a[i + 1]) > res)
            {
                pos = i;
                break;
            }
            else
                res -= i * (a[i] - a[i + 1]);
        ll ans1 = (pos * a[pos] - res) * (pos * a[pos] - res);
        ll ans2 = pos * m * m;
        for (int i = pos + 1; i <= n; i++)
            ans1 += a[i] * a[i] * pos;
        ll g = gcd(ans1, ans2);
        ans1 /= g, ans2 /= g;
        if (ans2 > 1)
            printf("%lld/%lld\n", ans1, ans2);
        else
            printf("%lld\n", ans1);
    }
    return 0;
}
```

## [H XOR](https://ac.nowcoder.com/acm/contest/881/H)

？？？人均线性基？？？行吧那就线性基吧。

看了一下网上博客，这不就是个简化的向量组的基吗？加法还是$\pmod 2$的那种。

就是说将一个数，比如`long long`，看作是$(b\_{62},b\_{61},\ldots,b\_1,b\_0)(2^{62},2^{61},\ldots,2,1)^\mathrm{T}$，那堆$b\_i$就可以看作是一个向量，然后这些数（向量）组成的向量组的基，其中这些数一般是进行异或操作，异或相当于$\pmod 2$的加法，所以这些向量的线性组合就是这些数相应的异或和（乘法可以用加法递归的定义出来）。这样，向量组的基的各种性质都可以直接套过来，比如线性基里的数字不能互相异或出来但是能异或出来原序列里的所有数字什么的。

我们要是要求一般情况下的向量组的基的话，一般会用到高斯消元（这玩意我抄板子都没写对过），不过由于异或的性质，线性基可以很容易的被构造出来。（说起来在这种巨型补题文章中讲算法真的好吗？）

想法非常简单，暴力往里面插，插不进去就换下一个继续插，直到整个序列都往里面插过一次。

```cpp
ll p[63];
void init() { memset(p, 0, sizeof(p)); }
bool ins(ll x)
{
    for (int i = 62; i >= 0; i--)
        if (x >> i & 1)
        {
            if (!p[i])
            {
                p[i] = x;
                break;
            }
            x ^= p[i];
        }
    return x;
}

```

插进去了返回`true`，插不进去返回`false`。

实际上插进去的每一个数代表着它的最高位。

应该是可以用线性基本身还原它的各个组成元素的，但是好像一般都不那样做而是直接开个数组啥的存一下，大概这样平均可以将常数减少到$\approx \frac{1}{30}$吧。

在简单了解了线性基是个什么鬼东西后，我们终于可以开始看这个题了。

题意是给定$n$个整数，求其中异或和为$0$的子集的大小的和。

可以转换为每个可以异或出$0$的数在几个集合中，对每个这样的数参与的子集数求和。

首先我们对整个序列跑一遍线性基，获得一个秩$r$。

对在这个线性基外面的任何一个数$x$（假设有，没有跳过这条），除去这个数，还剩下$n-r-1$个数，这些数可以形成$2^{n-r-1}$个集合，就是完全在线性基外面还包括$x$的集合有这么多个，根据线性基的性质，这些数都能被线性基表示，这里一共产生了$(n-r)2^{n-r-1}$个集合。

接着考虑在线性基里的数字，如果这个数在第一步里面被用过了就会增加$2^{n-r-1}$个集合，判断方法是看这个数能不能通过其他$n-1$个数组合出来，也就是说这个数在不在另外$n-1$个数造出的线性基里，在的话就是能，不在就不能。

但是我们总不能每次都真的搞个新线性基然后插上$n-1$次吧，这样实测会TLE（我故意这么试了一下）。所以我们可以先把原来不在线性基里的$n-r$的元素造成一个线性基存下来，这样每次就只需要插入$r-1$个元素了，一下快了一万倍。

接下来是代码。

```cpp
#define _CRT_SECURE_NO_WARNINGS
#define _SILENCE_CXX17_C_HEADER_DEPRECATION_WARNING
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int N = 1e5 + 50, mod = 1e9 + 7;
ll fpow(ll a, ll b)
{
    ll r = 1;
    for (; b; b >>= 1, a = a * a % mod)
        if (b & 1)
            r = r * a % mod;
    return r;
}
struct LB
{
    ll p[63];
    void init() { memset(p, 0, sizeof(p)); }
    bool ins(ll x)
    {
        for (int i = 62; i >= 0; i--)
            if (x >> i & 1)
            {
                if (!p[i])
                {
                    p[i] = x;
                    break;
                }
                x ^= p[i];
            }
        return x;
    }
    ll mx()
    {
        ll ans = 0;
        for (int i = 62; i >= 0; i--)
            if (ans >> i ^ 1)
                ans ^= p[i];
        return ans;
    }
};
ll a[N];
int main()
{
    vector<ll> b1c;
    for (int n; ~scanf("%d", &n);)
    {
        int r = 0;
        LB b1, b2, b3;
        b1.init(), b2.init(), b3.init(), b1c.clear();
        for (int i = 0; i < n; i++) scanf("%lld", a + i);
        for (int i = 0; i < n; i++)
            if (b1.ins(a[i]))
                r++, b1c.push_back(a[i]);
            else
                b2.ins(a[i]);
        ll p1 = n - r, p2 = n == r ? 0 : fpow(2, n - r - 1);
        for (auto x : b1c)
        {
            b3 = b2;
            for (auto y : b1c)
                if (x != y)
                    b3.ins(y);
            if (!b3.ins(x)) p1++;
        }
        printf("%lld\n", (p1 * p2) % mod);
    }
    return 0;
}
```

>  由于某种原因现在凌晨四点了我还在写这东西，这是我第几次看到凌晨四点的天空呢？

<hr />
> <span id='poem'></span>

<div id="__comment"></div>
<script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
