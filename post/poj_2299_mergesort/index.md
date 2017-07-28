---
template: post_with_isso
title: POJ 2299_MERGESORT
pageId: poj_2299_mergesort
---

# POJ 2299_MERGESORT
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
#include <cstring>
typedef long long int64;
const int N = 500005;
int a[N], b[N], c[N];
inline void read(int &x)
{
    int ch = x = 0;
    while (!isdigit(ch = getchar()))
        ;
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
}
int64 solve(int l, int r)
{
    if (l + 1 == r) return 0;
    int m = (l + r) >> 1;
    int64 ans = solve(l, m) + solve(m, r);
    int bcnt = m - l, ccnt = r - m;
    memcpy(b, a + l, bcnt << 2);
    memcpy(c, a + m, ccnt << 2);
    for (int i = l, bi = 0, ci = 0; i < r; i++)
        if (bi < bcnt && (ci == ccnt || b[bi] <= c[ci]))
            a[i] = b[bi++];
        else
            a[i] = c[ci++], ans += bcnt - bi;
    return ans;
}
int main()
{
    int n;
    while (read(n), n)
    {
        for (int i = 0; i < n; i++) read(a[i]);
        printf("%lld\n", solve(0, n));
    }
    return 0;
}
```
<div id="__comment"></div>
