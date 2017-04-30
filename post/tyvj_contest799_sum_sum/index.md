---
template: post_with_netease
title: TYVJ CONTEST799 SUM SUM
pageId: tyvj_contest799_sum_sum
---

# TYVJ CONTEST799 SUM SUM

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
const int mod = 1000000007;
int fast_pow(long long x, long long y)
{
    long long ans = 1;
    while (y)
    {
        if (y & 1)
            ans = (ans * x) % mod;
        x = (x * x) % mod;
        y >>= 1;
    }
    return ans;
}
int arrsum(int n, int k)
{
    if (n == 1) return 1;
    long long ans = arrsum(n >> 1, k);
    ans = ans + (fast_pow(k, n >> 1) * ans) % mod;
    if (n & 1) ans += fast_pow(k, n - 1);
    return ans % mod;
}
int main()
{
    freopen("sum.in", "r", stdin);
    freopen("sum.out", "w", stdout);
    int n, m, ans = 0;
    scanf("%d%d", &n, &m);
    for (int i = 1; i <= n; i++)
        ans = (ans + arrsum(m + 1, i) - 1) % mod;
    printf("%d", ans);
    return 0;
}
```
