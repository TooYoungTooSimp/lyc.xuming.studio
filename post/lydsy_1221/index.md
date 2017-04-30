---
template: post_with_netease
title: LYDSY 1221
pageId: lydsy_1221
---

# LYDSY 1221

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
inline int min(int a, int b) { return a < b ? a : b; }
const int inf = 0x3f3f3f3f, maxn = 2010, maxm = maxn << 4;
int head[maxn], next[maxm], to[maxm], cap[maxm], cost[maxm], ecnt;
int que[maxn << 4], curFlow[maxn], dis[maxn], fa[maxn];
bool inq[maxn];
inline void addEdge_impl_(int f, int t, int ca, int co)
{
    next[ecnt] = head[f];
    head[f] = ecnt;
    to[ecnt] = t;
    cap[ecnt] = ca;
    cost[ecnt] = co;
    ecnt++;
}
inline void addEdge(int f, int t, int ca, int co)
{
    addEdge_impl_(f, t, ca, co);
    addEdge_impl_(t, f, 0, -co);
}
bool MCMF(int S, int T, int &C, int &F)
{
    memset(inq, 0, sizeof(inq));
    memset(dis, inf, sizeof(dis));
    int h = 0, t = 0;
    que[t++] = S, inq[S] = true, curFlow[S] = inf, dis[S] = 0;
    for (int x; h != t; inq[que[h++]] = false)
        for (int i = head[x = que[h]]; ~i; i = next[i])
            if (cap[i] && dis[to[i]] > dis[x] + cost[i])
            {
                dis[to[i]] = dis[x] + cost[i];
                curFlow[to[i]] = min(curFlow[x], cap[i]);
                fa[to[i]] = i;
                if (!inq[to[i]]) inq[que[t++] = to[i]] = true;
            }
    if (dis[T] == inf) return false;
    for (int i = T; i != S; i = to[fa[i] ^ 1])
        cap[fa[i]] -= curFlow[T], cap[fa[i] ^ 1] += curFlow[T];
    C += dis[T] * curFlow[T], F += curFlow[T];
    return true;
}
int main()
{
    memset(head, -1, sizeof(head));
    int n, a, b, f, fA, fB;
    scanf("%d%d%d%d%d%d", &n, &a, &b, &f, &fA, &fB);
    int S = 0, T = n << 1 | 1;
    for (int i = 1, x; i <= n; i++)
    {
        scanf("%d", &x);
        addEdge(S, i, x, 0);
        addEdge(i + n, T, x, 0);
        addEdge(S, i + n, inf, f);
        if (i + a + 1 <= n) addEdge(i, i + n + a + 1, inf, fA);
        if (i + b + 1 <= n) addEdge(i, i + n + b + 1, inf, fB);
        if (i + 1 <= n) addEdge(i, i + 1, inf, 0);
    }
    int F = 0, C = 0;
    while (MCMF(S, T, C, F))
        ;
    printf("%d", C);
    return 0;
}
```
<div id="__comment"></div>
