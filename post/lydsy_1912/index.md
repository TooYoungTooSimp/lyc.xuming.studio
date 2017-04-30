---
template: post_with_netease
title: LYDSY 1912
pageId: lydsy_1912
---

# LYDSY 1912

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
int n, k, head[100010], next[100010 << 1], from[100010 << 1], to[100010 << 1], len[100010 << 1],
    maxlen, ecnt, fa[100010], mx1[100010], mx2[100010], en;
void addEdge(int f, int t)
{
    next[ecnt] = head[f];
    head[f] = ecnt;
    to[ecnt] = t;
    from[ecnt] = f;
    len[ecnt] = 1;
    ecnt++;
}
int dfs(int u, int fa)
{
    int max1 = 0, max2 = 0;
    for (int i = head[u]; ~i; i = next[i])
        if (to[i] != fa)
        {
            int tmp = len[i] + dfs(to[i], u);
            if (tmp > max1)
            {
                max2 = max1;
                max1 = tmp;
                mx2[u] = mx1[u];
                mx1[u] = i;
            }
            else if (tmp > max2)
            {
                max2 = tmp;
                mx2[u] = i;
            }
        }
    if (maxlen < max1 + max2) maxlen = max1 + max2, en = u;
    return max1;
}
int main()
{
    memset(head, -1, sizeof(head));
    scanf("%d%d", &n, &k);
    for (int i = 1, x, y; i < n; i++)
    {
        scanf("%d%d", &x, &y);
        addEdge(x, y);
        addEdge(y, x);
    }
    dfs(1, 0);
    int ans = ((n - 1) << 1) - (maxlen - 1);
    if (k == 2)
    {
        for (int i = mx1[en]; i; i = mx1[to[i]]) len[i] = len[i ^ 1] = -1;
        for (int i = mx2[en]; i; i = mx1[to[i]]) len[i] = len[i ^ 1] = -1;
        maxlen = 0;
        dfs(1, 0);
        ans -= maxlen - 1;
    }
    printf("%d", ans);
    return 0;
}
```
