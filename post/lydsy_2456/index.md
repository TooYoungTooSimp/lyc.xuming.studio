---
template: post_with_netease
title: LYDSY 2456
pageId: lydsy_2456
---

# LYDSY 2456

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
int n, x, t, tot;
int main()
{
    scanf("%d", &n);
    while (n--)
    {
        scanf("%d", &x);
        if (tot == 0) {
            t = x;
            tot = 1;
        }
        else if (t == x)
            tot++;
        else
            tot--;
    }
    printf("%d", t);
    return 0;
}
```
<div id="__comment"></div>
