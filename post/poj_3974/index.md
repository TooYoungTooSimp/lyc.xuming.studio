---
template: post_with_netease
title: POJ 3974
pageId: poj_3974
---

# POJ 3974

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
inline int min(int a, int b) { return a < b ? a : b; }
inline int max(int a, int b) { return a > b ? a : b; }
char buf[1000100], str[2000200];
int R[2000200], T;
int main()
{
    while (scanf("%s", buf), buf[0] != 'E')
    {
        int m = int(strlen(buf)), n = 0;
        str[n++] = '!';
        str[n++] = '#';
        for (int i = 0; i < m; i++)
            str[n++] = buf[i], str[n++] = '#';
        str[n++] = '#';
        str[n++] = '?';
        int p = 0, mx = 0, ans = 0;
        for (int i = 1; i < n; i++)
        {
            R[i] = mx > i ? min(R[2 * p - i], mx - i) : 1;
            while (str[i + R[i]] == str[i - R[i]]) R[i]++;
            if (R[i] + i > mx)
                mx = i + R[p = i];
            ans = max(ans, R[i]);
        }
        printf("Case %d: %d\n", ++T, ans - 1);
    }
    return 0;
}
```
