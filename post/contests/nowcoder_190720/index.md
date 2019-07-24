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

给定$2n$阶对称矩阵$M$且保证$M\_{ii}=0$，求两个大小相同的集合$A,B$，满足$A\cup B=\lbrace 1\ldots2n\rbrace,A\cap B=\emptyset$，使得$\sum\limits\_{i\in A}\sum\limits\_{j\in B}M_{i,j}$最大。

$\binom{2n}{n},n\leq14$好像也不是那么大的样子，所以我试了试暴搜，然后果不其然TLE了。

题解上说把最后的$n^2$计算分摊到每一步就从$\binom{2n}{n}n^2$变成$\binom{2n}{n}n$了，我持怀疑态度，虽然初看起来的确如此，但是实际上，那个$n$并没有被消除，而是分摊到dfs的深度那里了，深度是$O(n)$，每层计算$O(n)$，实际上还是$\binom{2n}{n}n^2$的，而且这个题卡常数，同样一份代码昨天晚上交AC今天下午交就TLE，所以这里就不放代码了。

## [A Eddy Walker](https://ac.nowcoder.com/acm/contest/882/A)

[知乎：从0点出发，每次随机走1~k步，求经过点x的概率。请问为什么x趋于无穷大时，概率为2/(k+1)?](https://www.zhihu.com/question/336062847)

记着加“前缀和”一类的东西。

```cpp
#define _CRT_SECURE_NO_WARNINGS
#define _SILENCE_CXX17_C_HEADER_DEPRECATION_WARNING
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int mod = 1e9 + 7;
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
    ll T, n, m, ans = 1;
    scanf("%lld", &T);
    while (T--)
    {
        scanf("%lld%lld", &n, &m);
        printf("%lld\n", n == 1 ? ans : (ans = m == 0 ? 0 : ans * fpow(n - 1, mod - 2) % mod));
    }
    return 0;
}
```



<hr />
> <span id='poem'></span>

<div id="__comment"></div>
<script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
