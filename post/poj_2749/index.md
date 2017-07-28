---
template: post_with_isso
title: POJ 2749
pageId: poj_2749
---

# POJ 2749
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
inline int abs(int x) { return x >= 0 ? x : -x; }
inline int min(int a, int b) { return a < b ? a : b; }
const int inf = 0x3f3f3f3f, maxn = 10010, maxm = 1200010;
int head[maxn], next[maxm], to[maxm], ecnt, n, A, B;
int dfn[maxn], low[maxn], stk[maxn], scc[maxn], top, idx, scccnt;
int sx1, sy1, sx2, sy2, sLen, X[maxn], Y[maxn], hate[maxn][2], like[maxn][2], d[maxn];
inline void addEdge(int f, int t)
{
    next[ecnt] = head[f];
    head[f] = ecnt;
    to[ecnt] = t;
    ecnt++;
}
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
bool check(int x)
{
    memset(dfn, 0, sizeof(dfn));
    memset(low, 0, sizeof(low));
    memset(scc, 0, sizeof(scc));
    memset(head, -1, sizeof(head));
    ecnt = top = idx = scccnt = 0;
    for (int i = 1; i <= n; i++)
        for (int j = i + 1; j <= n; j++)
        {
            int l1 = d[i << 1], l2 = d[i << 1 | 1];
            int r1 = d[j << 1], r2 = d[j << 1 | 1];
            if (l1 + r1 > x)
                addEdge(i << 1, j << 1 | 1),
                    addEdge(j << 1, i << 1 | 1);
            if (l1 + r2 + sLen > x)
                addEdge(i << 1, j << 1),
                    addEdge(j << 1 | 1, i << 1 | 1);
            if (l2 + r1 + sLen > x)
                addEdge(i << 1 | 1, j << 1 | 1),
                    addEdge(j << 1, i << 1);
            if (l2 + r2 > x)
                addEdge(i << 1 | 1, j << 1),
                    addEdge(j << 1 | 1, i << 1);
        }
    for (int i = 1, a, b; i <= A; i++)
    {
        a = hate[i][0], b = hate[i][1];
        addEdge(a << 1, b << 1 | 1);
        addEdge(a << 1 | 1, b << 1);
        addEdge(b << 1, a << 1 | 1);
        addEdge(b << 1 | 1, a << 1);
    }
    for (int i = 1, a, b; i <= B; i++)
    {
        a = like[i][0], b = like[i][1];
        addEdge(a << 1, b << 1);
        addEdge(a << 1 | 1, b << 1 | 1);
        addEdge(b << 1, a << 1);
        addEdge(b << 1 | 1, a << 1 | 1);
    }
    for (int i = 1; i <= (n << 1); i++)
        if (!dfn[i]) tarjan(i);
    for (int i = 1; i <= n; i++)
        if (scc[i << 1] == scc[i << 1 | 1])
            return false;
    return true;
}
int main()
{
    scanf("%d%d%d%d%d%d%d", &n, &A, &B, &sx1, &sy1, &sx2, &sy2);
    sLen = abs(sx1 - sx2) + abs(sy1 - sy2);
    for (int i = 1; i <= n; i++)
        scanf("%d%d", X + i, Y + i);
    for (int i = 1; i <= n; i++)
        d[i << 1] = abs(X[i] - sx1) + abs(Y[i] - sy1),
               d[i << 1 | 1] = abs(X[i] - sx2) + abs(Y[i] - sy2);
    for (int i = 1; i <= A; i++)
        scanf("%d%d", &hate[i][0], &hate[i][1]);
    for (int i = 1; i <= B; i++)
        scanf("%d%d", &like[i][0], &like[i][1]);
    int l = 0, r = 8000000, m, ans = -1;
    while (l <= r) check(m = (l + r) >> 1) ? r = (ans = m) - 1 : l = m + 1;
    printf("%d\n", ans);
    return 0;
}

```
<div id="__comment"></div>
