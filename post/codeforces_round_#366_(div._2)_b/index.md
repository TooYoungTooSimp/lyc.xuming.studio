---
template: post_with_netease
title: CODEFORCES ROUND #366 (DIV. 2) B
pageId: codeforces_round_#366_(div._2)_b
---

# CODEFORCES ROUND #366 (DIV. 2) B

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
int n, tmp, times;
int main()
{
    scanf("%d", &n);
    for (int i = 0; i < n; i++)
    {
        scanf("%d", &tmp);
        if (tmp > 1) times += tmp - 1;
        printf("%d\n", ((times &= 1) ^ 1) + 1);
    }
    return 0;
}
```
<div id="__comment"></div>
