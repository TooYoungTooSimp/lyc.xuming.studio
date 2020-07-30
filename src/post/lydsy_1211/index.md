---
template: post_with_isso
title: LYDSY 1211
pageId: lydsy_1211
---

# LYDSY 1211
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
typedef long long int64;
int prime[201], pcnt, cnt[201];
bool notprime[1001];
void genPrime()
{
    notprime[0] = notprime[1] = true;
    for (int i = 2; i < 1001; i++)
        if (!notprime[i])
            for (int j = i * i; j < 1001; j += i)
                notprime[j] = true;
    for (int i = 0; i < 1001; i++)
        if (!notprime[i])
            prime[pcnt++] = i;
}
int64 fast_pow(int64 x, int y)
{
    int64 ans = 1;
    for (; y; x *= x, y >>= 1)
        if (y & 1)
            ans *= x;
    return ans;
}
void decomp(int x, int d)
{
    for (int i = 0; i < pcnt && x; i++)
        while (x % prime[i] == 0)
        {
            cnt[i] += d;
            x /= prime[i];
        }
}
int64 comp()
{
    int64 ans = 1;
    for (int i = 0; i < pcnt; i++)
        if (cnt[i])
            ans *= fast_pow(prime[i], cnt[i]);
    return ans;
}
int main()
{
    genPrime();
    int n, sum = 0;
    scanf("%d", &n);
    if (n == 1)
    {
        scanf("%d", &n);
        putchar('0' + !n);
    }
    else
    {
        for (int i = 2; i <= n - 2; i++)
            decomp(i, 1);
        for (int i = 0, x; i < n; i++)
        {
            scanf("%d", &x);
            if (x == 0) break;
            sum += x - 1;
            for (int j = 2; j < x; j++)
                decomp(j, -1);
        }
        printf("%lld", sum != n - 2 ? 0 : comp());
    }
    return 0;
}
```
<div id="__comment"></div>
