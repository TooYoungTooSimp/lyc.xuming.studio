---
template: post_with_netease
title: CODEFORCES ROUND #365 (DIV. 2) A
pageId: codeforces_round_#365_(div._2)_a
---

# CODEFORCES ROUND #365 (DIV. 2) A

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
int n, x, y, a, b;
int main()
{
    scanf("%d", &n);
    for (int i = 0; i < n; i++)
    {
        scanf("%d%d", &x, &y);
        if (x > y) a++;
        if (x < y) b++;
    }
    if (a == b)
        printf("Friendship is magic!^^");
    else if (a > b)
        printf("Mishka");
    else
        printf("Chris");
    return 0;
}
```
<div id="__comment"></div>
