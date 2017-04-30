---
template: post_with_netease
title: POJ 2689
pageId: poj_2689
---

# POJ 2689
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cmath>
#include <cstdio>
#include <cstring>
int prime_count;
int prime[5140];
bool f[1000010];
bool notprime[50010];
int main()
{
    for (int i = 2; i < 50010; i++)
        if (!notprime[i])
            for (long long j = 1ll * i * i; j < 50010; j += i)
                notprime[j] = true;
    for (int i = 2; i < 50010; i++)
        if (!notprime[i])
            prime[prime_count++] = i;
    int l, r;
    while (~scanf("%d%d", &l, &r))
    {
        l = l == 1 ? 2 : l;
        memset(f, 0, sizeof(f));
        for (int i = 0, a, b; i < prime_count; i++)
        {
            a = (l - 1) / prime[i] + 1;
            b = r / prime[i];
            for (int j = a; j <= b; j++)
                if (j > 1)
                    f[j * prime[i] - l] = true;
        }
        int mx = -1, mn = 0x3f3f3f3f, x1 = 0, x2 = 0, y1 = 0, y2 = 0;
        for (int i = 0, p = -1; i <= r - l; i++)
            if (!f[i])
            {
                if (~p)
                {
                    if (mx < i - p)
                        mx = i - p, x1 = p + l, y1 = i + l;
                    if (mn > i - p)
                        mn = i - p, x2 = p + l, y2 = i + l;
                }
                p = i;
            }
        if (mx == -1)
            puts("There are no adjacent primes.");
        else
            printf("%d,%d are closest, %d,%d are most distant.\n", x2, y2, x1, y1);
    }
    return 0;
}
```
<div id="__comment"></div>
