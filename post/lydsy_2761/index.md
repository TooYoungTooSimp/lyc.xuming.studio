---
template: post_with_netease
title: LYDSY 2761
pageId: lydsy_2761
---

# LYDSY 2761

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <set>
int main()
{
    int t, n;
    scanf("%d", &t);
    while (t--)
    {
        scanf("%d", &n);
        std::set<int> S;
        for (int i = 0, x; i < n; i++)
        {
            scanf("%d", &x);
            if (S.count(x) == 0)
                S.insert(x), printf(i == 0 ? "%d" : " %d", x);
        }
        putchar('\n');
    }
}
```
