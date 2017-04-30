---
template: post_with_netease
title: LYDSY 1041
pageId: lydsy_1041
---

# LYDSY 1041

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cmath>
#include <cstdio>
inline unsigned gcd(unsigned x, unsigned y)
{
    unsigned t;
    while (y) t = x % y, x = y, y = t;
    return x;
}
unsigned calc(unsigned x)
{
    unsigned ret = 0;
    for (unsigned i = 1, j; i * i <= x; i++)
    {
        j = unsigned(sqrt(x - i * i) + 0.5);
        if (i >= j) break;
        if (i * i + j * j == x && gcd(i, j) == 1) ret++;
    }
    return ret;
}
int main()
{
    unsigned n, ans = 1;
    scanf("%u", &n);
    n <<= 1;
    for (unsigned i = 1; i * i <= n; i++)
        if (n % i == 0)
            ans += calc(n / i) + (i * i == n ? 0 : calc(i));
    printf("%u", ans << 2);
    return 0;
}
```
<div id="__comment"></div>
