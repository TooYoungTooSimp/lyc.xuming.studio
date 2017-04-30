---
template: post_with_netease
title: LYDSY 2173
pageId: lydsy_2173
---

# LYDSY 2173

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
long long f[4];
int main()
{
    f[1] = 1;
    int n;
    scanf("%d", &n);
    for (int i = 2; i <= n; i++)
        f[i & 3] = ((f[(i - 1) & 3] << 1) + f[(i - 2) & 3]) % 1000000007;
    printf("%lld", f[n & 3]);
    return 0;
}
```
