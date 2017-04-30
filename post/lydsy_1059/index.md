---
template: post_with_netease
title: LYDSY 1059
pageId: lydsy_1059
---

# LYDSY 1059

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
int T, n, tmp, g[205][205], st, vis[205], pre[205];
bool dfs(int u)
{
    for (int v = 1; v <= n; v++)
        if (g[u][v])
            if (vis[v] != st)
            {
                vis[v] = st;
                if (pre[v] == 0 || dfs(pre[v]))
                {
                    pre[v] = u;
                    return true;
                }
            }
    return false;
}
int main()
{
    scanf("%d", &T);
    while (T--)
    {
        scanf("%d", &n);
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                scanf("%d", &g[i][j]);
        tmp = n;
        for (int i = 1; i <= n; i++) pre[i] = vis[i] = 0;
        for (st = 1; st <= n; st++) tmp -= dfs(st);
        puts(tmp ? "No" : "Yes");
    }
    return 0;
}

```
<div id="__comment"></div>
