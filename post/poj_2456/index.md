---
template: post_with_netease
title: POJ 2456
pageId: poj_2456
---

# POJ 2456

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <algorithm>
int n, m, a[100005];
bool check(int d)
{
    int cow = 0, nxt = 0;
    for (int i = 0; i < n; i++)
        if (a[i] >= nxt)
            cow++, nxt = a[i] + d;
    return cow >= m;
}
int main()
{
    scanf("%d%d", &n, &m);
    for (int i = 0; i < n; i++) scanf("%d", a + i);
    std::sort(a, a + n);
    int L = 0, R = 0x3f3f3f3f, mid;
    while (L < R)
        check(mid = (L + R) >> 1) ? L = mid + 1 : R = mid;
    printf("%d", L - 1);
    return 0;
}
```
<div id="__comment"></div>
