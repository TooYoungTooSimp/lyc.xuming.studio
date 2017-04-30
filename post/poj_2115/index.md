---
template: post_with_netease
title: POJ 2115
pageId: poj_2115
---

# POJ 2115

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
typedef long long int64;
void exgcd(int64 a, int64 b, int64 &d, int64 &x, int64 &y)
{
    !b ? (x = 1, y = 0, d = a) : (exgcd(b, a % b, d, y, x), y -= x * (a / b));
}
int main()
{
    int64 A, B, C;
    int k;
    while (scanf("%lld%lld%lld%d", &A, &B, &C, &k), A | B | C | k)
    {
        int64 a = C, b = B - A, x, y, n = 1ll << k, d;
        exgcd(a, n, d, x, y);
        if (b % d)
            puts("FOREVER");
        else
        {
            x = (x * (b / d)) % n;
            x = (x % (n / d) + n / d) % (n / d);
            printf("%lld\n", x);
        }
    }
    return 0;
}
```
