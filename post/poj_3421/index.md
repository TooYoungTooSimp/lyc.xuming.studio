---
template: post_with_netease
title: POJ 3421
pageId: poj_3421
---

# POJ 3421

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
int f[1 << 12 | 1];
long long _f(int x)
{
    long long ans = 1;
    for (int i = x; i; i--) ans *= i;
    return ans;
}
int main()
{
    int x;
    while (~scanf("%d", &x))
    {
        int _x = x, t = 0;
        for (int i = 2; i * i <= _x; i++)
        {
            f[t] = 0;
            while (_x % i == 0)
                _x /= i, f[t]++;
            t++;
        }
        if (_x != 1) f[t++] = 1;
        int sum = 0;
        for (int i = 0; i < t; i++) sum += f[i];
        long long fac = _f(sum);
        for (int i = 0; i < t; i++) fac /= _f(f[i]);
        printf("%d %lld\n", sum, fac);
    }
    return 0;
}
```
