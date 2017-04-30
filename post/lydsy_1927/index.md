---
template: post_with_netease
title: LYDSY 1927
pageId: lydsy_1927
---

# LYDSY 1927
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
const int inf = 0x3f3f3f3f, maxn = 4010, maxm = 50010;
int head[maxn], next[maxm], to[maxm], cap[maxm], cost[maxm], ecnt;
int que[maxn << 2], dis[maxn], curFlow[maxn], fa[maxn];
bool inq[maxn];
inline void addEdge_impl_(int u, int v, int ca, int co)
{
    next[ecnt] = head[u];
    head[u] = ecnt;
    to[ecnt] = v;
    cap[ecnt] = ca;
    cost[ecnt] = co;
    ecnt++;
}
inline void addEdge(int u, int v, int ca, int co)
{
    addEdge_impl_(u, v, ca, co);
    addEdge_impl_(v, u, 0, -co);
}
bool MCMF(int S, int T, int &F, int &C)
{
    memset(inq, 0, sizeof(inq));
    memset(dis, inf, sizeof(dis));
    int h = 0, t = 0;
    que[t++] = S;
    inq[S] = true;
    curFlow[S] = inf;
    dis[S] = 0;
    for (int x; h != t; inq[que[h++]] = false)
        for (int i = head[x = que[h]]; ~i; i = next[i])
            if (cap[i] > 0 && dis[to[i]] > dis[x] + cost[i])
            {
                dis[to[i]] = dis[x] + cost[i];
                curFlow[to[i]] = min(curFlow[x], cap[i]);
                fa[to[i]] = i;
                if (!inq[to[i]]) inq[que[t++] = to[i]] = true;
            }
    if (dis[T] == inf) return false;
    F += curFlow[T], C += curFlow[T] * dis[T];
    for (int i = T; i != S; i = to[fa[i] ^ 1])
        cap[fa[i]] -= curFlow[T], cap[fa[i] ^ 1] += curFlow[T];
    return true;
}
int main()
{
    memset(head, -1, sizeof(head));
    int n, m;
    scanf("%d%d", &n, &m);
    int S = 0, T = n << 1 | 1;
    for (int i = 1, x; i <= n; i++)
    {
        scanf("%d", &x);
        addEdge(S, i, 1, 0);
        addEdge(S, n + i, 1, x);
        addEdge(n + i, T, 1, 0);
    }
    for (int i = 1, x, y, z, t; i <= m; i++)
    {
        scanf("%d%d%d", &x, &y, &z);
        if (x > y) t = x, x = y, y = t;
        addEdge(x, n + y, 1, z);
    }
    int C = 0, F = 0;
    while (MCMF(S, T, F, C))
        ;
    printf("%d", C);
    return 0;
}
```
<div id="__comment"></div>
