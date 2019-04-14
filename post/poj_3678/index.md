---
template: post_with_isso
title: POJ 3678
pageId: poj_3678
---

# POJ 3678
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
inline int min(int a, int b) { return a < b ? a : b; }
const int maxn = 10010, maxm = 4000010;
int head[maxn], next[maxm], to[maxm], ecnt;
inline void addEdge(int f, int t)
{
    next[ecnt] = head[f];
    head[f] = ecnt;
    to[ecnt] = t;
    ecnt++;
}
int dfn[maxn], low[maxn], stk[maxn], scc[maxn], top, idx, scccnt;
void tarjan(int x)
{
    dfn[x] = low[x] = ++idx;
    stk[top++] = x;
    for (int i = head[x]; ~i; i = next[i])
        if (!dfn[to[i]])
            tarjan(to[i]), low[x] = min(low[x], low[to[i]]);
        else if (!scc[to[i]])
            low[x] = min(low[x], dfn[to[i]]);
    if (dfn[x] == low[x])
    {
        scccnt++;
        do
            scc[stk[--top]] = scccnt;
        while (stk[top] != x);
    }
}
int main()
{
    int n, m;
    while (~scanf("%d%d", &n, &m))
    {
        memset(dfn, 0, sizeof(dfn));
        memset(low, 0, sizeof(low));
        memset(scc, 0, sizeof(scc));
        memset(head, -1, sizeof(head));
        ecnt = top = idx = scccnt = 0;
        for (int i = 0, u, v, w; i < m; ++i)
        {
            char op[5];
            scanf("%d%d%d%s", &u, &v, &w, op);
            if (op[0] == 'A')
                if (w)
                {
                    addEdge(u << 1, v << 1 | 1), addEdge(v << 1, u << 1 | 1);
                    addEdge(u << 1, v << 1), addEdge(v << 1 | 1, u << 1 | 1);
                    addEdge(u << 1 | 1, v << 1 | 1), addEdge(v << 1, u << 1);
                }
                else
                {
                    addEdge(u << 1 | 1, v << 1), addEdge(v << 1 | 1, u << 1);
                }
            if (op[0] == 'O')
                if (w)
                {
                    addEdge(u << 1, v << 1 | 1), addEdge(v << 1, u << 1 | 1);
                }
                else
                {
                    addEdge(u << 1, v << 1), addEdge(v << 1 | 1, u << 1 | 1);
                    addEdge(u << 1 | 1, v << 1 | 1), addEdge(v << 1, u << 1);
                    addEdge(u << 1 | 1, v << 1), addEdge(v << 1 | 1, u << 1);
                }
            if (op[0] == 'X')
                if (w)
                {
                    addEdge(u << 1, v << 1 | 1), addEdge(v << 1, u << 1 | 1);
                    addEdge(u << 1 | 1, v << 1), addEdge(v << 1 | 1, u << 1);
                }
                else
                {
                    addEdge(u << 1, v << 1), addEdge(v << 1 | 1, u << 1 | 1);
                    addEdge(u << 1 | 1, v << 1 | 1), addEdge(v << 1, u << 1);
                }
        }
        for (int i = 0; i < (n << 1); i++)
            if (!dfn[i]) tarjan(i);
        bool flag = true;
        for (int i = 0; i < n && flag; i++)
            if (scc[i << 1] == scc[i << 1 | 1])
                flag = false;
        puts(flag ? "YES" : "NO");
    }
    return 0;
}
```
<div id="__comment"></div>
