---
template: post_with_netease
title: CODEFORCES ROUND #366 (DIV. 2) A
pageId: codeforces_round_#366_(div._2)_a
---

# CODEFORCES ROUND #366 (DIV. 2) A

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
int main()
{
    int n;
    scanf("%d", &n);
    for (int i = 1; i <= n; i++)
    {
        printf(i & 1 ? "I hate" : "I love");
        if (i != n) printf(" that ");
    }
    printf(" it");
    return 0;
}
```
