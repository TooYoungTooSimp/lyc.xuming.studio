---
template: post_with_netease
title: CODEFORCES ROUND #367 (DIV. 2) A
pageId: codeforces_round_#367_(div._2)_a
---

# CODEFORCES ROUND #367 (DIV. 2) A

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cmath>
#include <cstdio>
int main()
{
    int n, x0, y0, x, y, v;
    double ans = 1e16, tmp;
    scanf("%d%d%d", &x0, &y0, &n);
    for (int i = 0; i < n; i++)
    {
        scanf("%d%d%d", &x, &y, &v);
        x -= x0;
        y -= y0;
        tmp = sqrt(x * x + y * y) / v;
        if (tmp < ans) ans = tmp;
    }
    printf("%.10lf", ans);
    return 0;
}
```
<div id="__comment"></div>
