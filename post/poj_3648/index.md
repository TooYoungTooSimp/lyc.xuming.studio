---
template: post_with_disqus
title: POJ 3648
pageId: poj_3648
---

# POJ 3648
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
const int maxn = 2010, maxm = 500010;
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
    int m, n;
    while (scanf("%d%d", &n, &m) && (m + n))
    {
        memset(head, -1, sizeof(head));
        memset(dfn, 0, sizeof(dfn));
        memset(low, 0, sizeof(low));
        memset(scc, 0, sizeof(scc));
        idx = top = ecnt = scccnt = 0;
        int a1, a2;
        char c1, c2;
        for (int i = 0; i < m; i++)
        {
            scanf("%d%c %d%c", &a1, &c1, &a2, &c2);
            a1 = a1 << 1 | (c1 == 'h'), a2 = a2 << 1 | (c2 == 'h');
            addEdge(a1, a2 ^ 1), addEdge(a2, a1 ^ 1);
        }
        addEdge(0, 1);
        for (int i = 0; i < (n << 1); i++)
            if (!dfn[i]) tarjan(i);
        bool flag = true;
        for (int i = 0; i < n && flag; i++)
            if (scc[i << 1] == scc[i << 1 | 1])
                flag = false;
        if (!flag)
            puts("bad luck");
        else if (n < 1)
            putchar('\n');
        else
            for (int i = 1; i < n; i++)
                printf("%d%c%c", i, (scc[i << 1] > scc[i << 1 | 1]) ? 'w' : 'h', " \n"[i == n - 1]);
    }
    return 0;
}

```
<div id="__comment"></div>
