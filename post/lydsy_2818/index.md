---
template: post_with_netease
title: LYDSY 2818
pageId: lydsy_2818
---

# LYDSY 2818

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
typedef long long int64;
const int maxn = 10000010;
int n, phi[maxn], prime[700010], pcnt;
int64 sum[maxn];
bool notPrime[maxn];
int main()
{
    scanf("%d", &n);
    phi[1] = 1;
    for (int i = 2; i <= n; i++)
        if (!phi[i])
            for (int j = i; j <= n; j += i)
            {
                if (!phi[j]) phi[j] = j;
                phi[j] = phi[j] / i * (i - 1);
            }
    for (int64 i = 2; i <= n; i++)
        if (!notPrime[i])
            for (int64 j = i * i; j <= n; j += i)
                notPrime[j] = true;
    for (int i = 2; i <= n; i++)
        if (!notPrime[i])
            prime[pcnt++] = i;
    for (int i = 1; i <= n; i++) sum[i] = sum[i - 1] + phi[i];
    int64 ans = 0;
    for (int i = 0; i < pcnt; i++)
        ans += (sum[n / prime[i]] << 1) - 1;
    printf("%lld", ans);
    return 0;
}
```
<div id="__comment"></div>
