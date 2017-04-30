---
template: post_with_netease
title: POJ 3461
pageId: poj_3461
---

# POJ 3461

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
char a[1 << 20 | 1], b[1 << 14 | 1];
int la, lb;
int next[1 << 14 | 1];
int main()
{
    next[0] = -1;
    int n;
    scanf("%d", &n);
    while (n--)
    {
        scanf("%s%s", b, a);
        la = strlen(a), lb = strlen(b);
        for (int i = 1, j = -1; i < lb; i++)
        {
            while (~j && b[j + 1] != b[i]) j = next[j];
            if (b[j + 1] == b[i]) j++;
            next[i] = j;
        }
        int ans = 0;
        for (int i = 0, j = -1; i < la; i++)
        {
            while (~j && b[j + 1] != a[i]) j = next[j];
            if (b[j + 1] == a[i]) j++;
            if (j == lb - 1) ans++, j = next[j];
        }
        printf("%d\n", ans);
    }
    return 0;
}
```
