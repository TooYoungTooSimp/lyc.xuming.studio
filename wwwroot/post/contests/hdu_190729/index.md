---
template: post_with_isso
title: 2019杭电多校第三场
pageId: contests_hdu_190729
---

# 2019杭电多校第三场

## [HDU 6608 Fansblog](http://acm.hdu.edu.cn/showproblem.php?pid=6608)

给一个质数$P$，找到第一个比$P$小的质数$Q$，然后计算$Q! \bmod P$的值。

威尔逊定理：
$$
\begin{align}
 				(p-1)! &\equiv -1 &\pmod{p} \\ 
 \text{or}\quad (p-1)! &\equiv p-1 &\pmod{p} \\ 
 \text{or}\quad (p-2)! &\equiv 1 &\pmod{p}
\end{align}
$$
实际上我更喜欢最后那种形式来着

于是
$$
\begin{align}
Q!\bmod P &= \prod_{i=1}^Q i&\bmod P \\
          &= \frac{\prod_{i=1}^{P-2}i}{\prod_{i=Q+1}^{P-2}i} &\bmod P \\
          &= \prod_{i=Q+1}^{P-2}\mathrm{inv}(i) &\bmod P
\end{align}
$$

```cpp
#define _CRT_SECURE_NO_WARNINGS
#define _SILENCE_CXX17_C_HEADER_DEPRECATION_WARNING
#include <bits/stdc++.h>
using namespace std;
#define CRP(t, x) const t &x
#define OPL(t, x) bool operator<(CRP(t, x)) const
#define FIL(x, v) memset(x, v, sizeof(x))
#define CLR(x) FIL(x, 0)
#define NE1(x) FIL(x, -1)
#define INF(x) FIL(x, 0x3f)
typedef long long ll, i64;
ll fmul(ll a, ll b, ll m)
{
    ll r = 0;
    for (; b; b >>= 1, a = (a << 1) % m)
        if (b & 1)
            r = (r + a) % m;
    return r;
}
ll fpow(ll a, ll b, ll m)
{
    ll r = 1;
    for (; b; b >>= 1, a = fmul(a, a, m))
        if (b & 1)
            r = fmul(r, a, m);
    return r;
}
bool miller_rabin(ll n, ll a)
{
    ll d = n - 1;
    if (n == a) return true;
    if (n & 1 ^ 1) return false;
    while (d & 1 ^ 1) d >>= 1;
    ll t = fpow(a, d, n);
    while (d != n - 1 && t != n - 1 && t != 1)
    {
        //t = t * t % n;
        t = fmul(t, t, n);
        d <<= 1;
    }
    return t == n - 1 || (d & 1) == 1;
}
bool isPrime(ll x)
{
    auto base = {2, 3, 5, 7, 11, 13, 17, 61, 24251};
    for (auto a : base)
    {
        if (x == a) return true;
        if (!miller_rabin(x, a)) return false;
    }
    return true;
}
inline ll inv(ll x, ll m) { return fpow(x, m - 2, m); }
int main()
{
    ll T, P, Q;
    scanf("%lld", &T);
    while (T--)
    {
        scanf("%lld", &P);
        if (P == 3)
            Q = 2;
        else
            for (Q = P - 2; Q > 0; Q -= 2)
                if (isPrime(Q)) break;
        ll ans = P - 1;
        for (ll x = Q + 1; x <= P - 1; x++)
            ans = fmul(ans, inv(x, P), P);
        printf("%lld\n", ans);
    }
    return 0;
}
```

## [HDU 6611 K Subsequence](http://acm.hdu.edu.cn/showproblem.php?pid=6611)

有负边权的最小费用最大流，而且卡SPFA，而且卡普通的dijkstra+势函数，除了出题人的板子，其他人都没有办法AC。经过检测，是缓存的问题，因为加了一个随机访存操作后，std就跟我跑得一样快慢了。

这实在没有什么意思，上个卡常数的wys可是已经被阿了。

不太开心，没有代码。


<hr />
> <span id='poem'></span>

<div id="__comment"></div>
<script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
