---
template: post_with_netease
title: LYDSY 1303
pageId: lydsy_1303
---

# LYDSY 1303

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
const int maxn = 100010;
int n, k, p, a[maxn], l[maxn << 1], r[maxn << 1];
int main()
{
    scanf("%d%d", &n, &k);
    for (int i = 1, x; i <= n; i++)
    {
        scanf("%d", &x);
        if (x < k) a[i] = -1;
        if (x > k) a[i] = 1;
        if (x == k) p = i;
    }
    for (int i = 1; i <= n; i++) a[i] += a[i - 1];
    for (int i = 0; i < p; i++) l[a[i] + n]++;
    for (int i = p; i <= n; i++) r[a[i] + n]++;
    int ans = 0;
    for (int i = n << 1; i >= 0; i--)
        ans += l[i] * r[i];
    printf("%d", ans);
    return 0;
}

```
<div id="__comment"></div>
