---
template: post_with_netease
title: CODEFORCES ROUND #368 (DIV. 2) C
pageId: codeforces_round_#368_(div._2)_c
---

# CODEFORCES ROUND #368 (DIV. 2) C

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
int main()
{
    long long n;
    scanf("%I64d", &n);
    n == 1 || n == 2 ? printf("-1") : n & 1 ? printf("%I64d %I64d", (n * n - 1) / 2, (n * n + 1) / 2) : printf("%I64d %I64d", (n / 2) * (n / 2) + 1, (n / 2) * (n / 2) - 1);
    return 0;
}

```
