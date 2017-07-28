---
template: post_with_isso
title: POJ 2135
pageId: poj_2135
---

# POJ 2135
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
const int inf = 0x3f3f3f3f, N = 1005, M = 50005;
int adj[N], nxt[M], to[M], cap[M], cost[M], dis[N], ecnt, idx;
inline void addEdge_impl_(int f, int t, int c, int w)
{
    nxt[ecnt] = adj[f];
    adj[f] = ecnt;
    to[ecnt] = t;
    cap[ecnt] = c;
    cost[ecnt] = w;
    ecnt++;
}
inline void addEdge(int f, int t, int c, int w)
{
    addEdge_impl_(f, t, c, w);
    addEdge_impl_(t, f, 0, -w);
}
int T;
bool bfs(int S)
{
    memset(dis, inf, sizeof(dis)), idx++;
    static int que[N << 1];
    static bool inq[N];
    int len = 0;
    dis[que[len++] = S] = 0;
    for (int i = 0; i < len; inq[que[i++]] = false)
        for (int e = adj[que[i]]; ~e; e = nxt[e])
            if (cap[e] && dis[to[e]] > dis[que[i]] + cost[e])
            {
                dis[to[e]] = dis[que[i]] + cost[e];
                if (!inq[to[e]]) que[len++] = to[e];
            }
    return dis[T] < inf;
}
int dfs(int x, int rest)
{
    static int vis[N];
    if (x == T) return rest;
    vis[x] = idx;
    int flow = 0;
    for (int e = adj[x], curFlow; rest && ~e; e = nxt[e])
        if (vis[to[e]] != idx && cap[e] && dis[to[e]] == dis[x] + cost[e])
            if (bool(curFlow = dfs(to[e], min(cap[e], rest))))
                rest -= curFlow, flow += curFlow, cap[e] -= curFlow,
                cap[e ^ 1] += curFlow;
    return flow;
}
int main()
{
    memset(adj, -1, sizeof(adj));
    int n, m;
    scanf("%d%d", &n, &m);
    T = n + 1;
    for (int i = 0, x, y, z; i < m; i++)
        scanf("%d%d%d", &x, &y, &z), addEdge(x, y, 1, z), addEdge(y, x, 1, z);
    addEdge(0, 1, 2, 0);
    addEdge(n, T, 2, 0);
    int ans = 0;
    while (bfs(0)) ans += dis[T] * dfs(0, inf);
    printf("%d", ans);
    return 0;
}
```
<div id="__comment"></div>
