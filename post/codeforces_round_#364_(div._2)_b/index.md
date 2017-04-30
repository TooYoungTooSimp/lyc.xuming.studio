---
template: post_with_netease
title: CODEFORCES ROUND #364 (DIV. 2) B
pageId: codeforces_round_#364_(div._2)_b
---

# CODEFORCES ROUND #364 (DIV. 2) B

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
int n, m, x, y, cntx, cnty;
bool coverx[100001], covery[100001];
int main()
{
    scanf("%d%d", &n, &m);
    long long maxc = n;
    maxc *= maxc;
    for (int i = 0; i < m; i++)
    {
        scanf("%d%d", &x, &y);
        if (!coverx[x])
            maxc -= n - cnty, cntx++, coverx[x] = true;
        if (!covery[y])
            maxc -= n - cntx, cnty++, covery[y] = true;
        printf("%I64d ", maxc);
    }
    return 0;
}
```
