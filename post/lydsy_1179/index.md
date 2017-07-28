---
template: post_with_isso
title: LYDSY 1179
pageId: lydsy_1179
---

# LYDSY 1179
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
inline int min(int a, int b) { return a < b ? a : b; }
inline int max(int a, int b) { return a > b ? a : b; }
const int maxn = 500010;
int n, m, s, p;
struct Graph
{
    int head[maxn], next[maxn], to[maxn], rnk[maxn], ecnt;
    bool ispub[maxn];
    inline void addEdge(int f, int t)
    {
        ecnt++;
        next[ecnt] = head[f];
        head[f] = ecnt;
        to[ecnt] = t;
    }
} g1, g2;
int low[maxn], dfn[maxn], scc[maxn], scccnt, idx, st[maxn], top, dis[maxn], que[maxn << 2];
bool inq[maxn];
void tarjan(int u)
{
    low[u] = dfn[u] = ++idx;
    st[top++] = u;
    for (int i = g1.head[u]; i; i = g1.next[i])
        if (!dfn[g1.to[i]])
            tarjan(g1.to[i]), low[u] = min(low[u], low[g1.to[i]]);
        else if (!scc[g1.to[i]])
            low[u] = min(low[u], dfn[g1.to[i]]);
    if (dfn[u] == low[u])
    {
        scccnt++;
        do
            scc[st[--top]] = scccnt;
        while (st[top] != u);
    }
}
void spfa()
{
    int h, t;
    h = t = 0;
    que[t++] = s;
    dis[s] = g2.rnk[s];
    inq[s] = true;
    for (int x = 0; h ^ t; inq[que[h++]] = false)
        for (int i = g2.head[x = que[h]]; i; i = g2.next[i])
            if (dis[g2.to[i]] < g2.rnk[g2.to[i]] + dis[x])
            {
                dis[g2.to[i]] = g2.rnk[g2.to[i]] + dis[x];
                if (!inq[g2.to[i]]) inq[que[t++] = g2.to[i]] = true;
            }
}
int main()
{
    scanf("%d%d", &n, &m);
    for (int i = 1, x, y; i <= m; i++)
    {
        scanf("%d%d", &x, &y);
        g1.addEdge(x, y);
    }
    for (int i = 1; i <= n; i++) scanf("%d", &g1.rnk[i]);
    scanf("%d%d", &s, &p);
    for (int i = 0, x; i < p; i++)
        scanf("%d", &x), g1.ispub[x] = true;
    for (int i = 1; i <= n; i++)
        if (!dfn[i]) tarjan(i);
    for (int i = 1; i <= n; i++)
    {
        if (g1.ispub[i]) g2.ispub[scc[i]] = true;
        g2.rnk[scc[i]] += g1.rnk[i];
    }
    for (int i = 1; i <= n; i++)
        for (int j = g1.head[i]; j; j = g1.next[j])
            if (scc[i] != scc[g1.to[j]])
                g2.addEdge(scc[i], scc[g1.to[j]]);
    s = scc[s];
    spfa();
    int ans = 0;
    for (int i = 1; i <= scccnt; i++)
        if (g2.ispub[i])
            ans = max(ans, dis[i]);
    printf("%d", ans);
    return 0;
}
```
<div id="__comment"></div>
