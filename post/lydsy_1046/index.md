---
template: post_with_netease
title: LYDSY 1046
pageId: lydsy_1046
---

# LYDSY 1046

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
int n, m, a[10010], f[10010], len[10010], L, x;
inline int readInt(int &_x)
{
    int ch = _x = 0;
    while (!isdigit(ch = getchar()))
        ;
    for (; isdigit(ch); ch = getchar()) _x = _x * 10 + ch - '0';
    return _x;
}
inline int getPos(int _x)
{
    int l = 1, r = L + 1, mid;
    while (l < r)
    {
        mid = (l + r) >> 1;
        if (len[mid] <= _x)
            r = mid;
        else
            l = mid + 1;
    }
    return l;
}
int main()
{
    readInt(n);
    for (int i = 1; i <= n; i++) readInt(a[i]);
    len[f[n] = L = 1] = a[n];
    for (int i = n - 1; i; i--)
        if (a[i] < len[L])
            len[f[i] = (++L)] = a[i];
        else
            len[f[i] = getPos(a[i])] = a[i];
    readInt(m);
    while (m--)
        if (readInt(x) > L)
            puts("Impossible");
        else
            for (int i = 1, prev = 0; i <= n; i++)
                if (x && f[i] >= x && a[i] > prev)
                    printf(--x ? "%d " : "%d\n", prev = a[i]);
    return 0;
}
```
<div id="__comment"></div>
