---
template: post_with_netease
title: LYDSY 3668
pageId: lydsy_3668
---

# LYDSY 3668

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
int a[100010], n, m;
char op[100010], buf[10];
int calc(int x)
{
    for (int i = 0; i < n; i++)
    {
        if (op[i] == 'A') x &= a[i];
        if (op[i] == 'O') x |= a[i];
        if (op[i] == 'X') x ^= a[i];
    }
    return x;
}
int main()
{
    scanf("%d%d", &n, &m);
    for (int i = 0; i < n; i++)
    {
        scanf("%s%d", buf, a + i);
        op[i] = buf[0];
    }
    int cur = 1, ans = 0;
    while (cur <= m) cur <<= 1;
    for (cur >>= 1; cur; cur >>= 1)
        if ((!(calc(0) & cur)) && (ans + cur <= m) && (calc(cur) & cur))
            ans += cur;
    printf("%d", calc(ans));
    return 0;
}
```
<div id="__comment"></div>
