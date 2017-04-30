---
template: post_with_netease
title: LYDSY 1433
pageId: lydsy_1433
---

# LYDSY 1433

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
inline int readInt(int &x)
{
    int ch = x = 0;
    while (!isdigit(ch = getchar()))
        ;
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
    return x;
}
int T, n, tmp, g[55][55], b[55], c[55], st, vis[55], pre[55];
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
    readInt(T);
    while (T--)
    {
        readInt(n);
        for (int i = 1; i <= n; i++) readInt(b[i]);
        for (int i = 1; i <= n; i++) readInt(c[i]);
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
            {
                readInt(tmp);
                g[i][j] = ((i == j && b[i] == 1 && c[i] == 0) || ((b[i] == 0 || (b[i] == 1 && c[i] == 0)) && tmp && b[j] == 1));
            }
        tmp = 0;
        for (int i = 1; i <= n; i++) pre[i] = vis[i] = 0;
        for (int i = 1; i <= n; i++)
            if (b[i] == 0 || (b[i] == 1 && c[i] == 0)) tmp++;
        for (st = 1; st <= n; st++) tmp -= dfs(st);
        puts(tmp ? "T_T" : "^_^");
    }
    return 0;
}

```
<div id="__comment"></div>
