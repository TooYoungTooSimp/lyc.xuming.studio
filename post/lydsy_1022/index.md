---
template: post_with_netease
title: LYDSY 1022
pageId: lydsy_1022
---

# LYDSY 1022

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
//http://wenku.baidu.com/link?url=hdO-izu3ggfWlLUkg9YTHcU28Z1TDzVHtXzDSDnDl4yVyTMjcA3i1qb9BNbJMVbSRm2q9D5MpN12DQNX_N1J4NJhb2larJdiw7-o8Ki9Hqa
#include <cstdio>
int main()
{
    int T, n, x;
    scanf("%d", &T);
    while (T--)
    {
        scanf("%d", &n);
        int ans = 0, f = 1;
        while (n--)
        {
            scanf("%d", &x);
            ans ^= x;
            if (x != 1) f = 0;
        }
        ans = ans ? 1 : 0;
        puts(f ^ ans ? "John" : "Brother");
    }
    return 0;
}
```
