---
template: post_with_netease
title: LYDSY 1497
pageId: lydsy_1497
---

# LYDSY 1497

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
inline int min(int a, int b) { return a < b ? a : b; }
const int inf = 0x3f3f3f3f, maxn = 100010, maxm = maxn << 2;
int head[maxn], next[maxm], to[maxm], cap[maxm], ecnt, cnt;
int dis[maxn], cur[maxn], num[maxn], que[maxn], fa[maxn];
inline void addEdge_impl_(int f, int t, int c)
{
    next[ecnt] = head[f];
    head[f] = ecnt;
    to[ecnt] = t;
    cap[ecnt] = c;
    ecnt++;
}
inline void addEdge(int f, int t, int c)
{
    addEdge_impl_(f, t, c);
    addEdge_impl_(t, f, 0);
}
int ISAP(int s, int e)
{
    int h = 0, t = 0, x, flow = 0;
    for (int i = 0; i <= cnt; i++) dis[i] = cnt;
    dis[que[t++] = e] = 0;
    while (h != t)
        for (int i = head[x = que[h++]]; ~i; i = next[i])
            if (cap[i ^ 1] > 0 && dis[to[i]] > dis[x] + 1)
                dis[que[t++] = to[i]] = dis[x] + 1;
    memset(num, 0, sizeof(num));
    for (int i = 0; i <= cnt; i++) num[dis[i]]++, cur[i] = head[i];
    x = s;
    while (dis[s] < cnt)
    {
        if (x == e)
        {
            int curFlow = inf;
            for (x = e; x != s; x = to[fa[x] ^ 1]) curFlow = min(curFlow, cap[fa[x]]);
            for (x = e; x != s; x = to[fa[x] ^ 1]) cap[fa[x]] -= curFlow, cap[fa[x] ^ 1] += curFlow;
            flow += curFlow, x = s;
        }
        bool needRetreat = true;
        for (int i = cur[x]; needRetreat && ~i; i = next[i])
            if (cap[i] > 0 && dis[x] == dis[to[i]] + 1)
                needRetreat = false, cur[x] = i, fa[x = to[i]] = i;
        if (needRetreat)
        {
            int mn = cnt - 1;
            for (int i = head[x]; ~i; i = next[i])
                if (cap[i]) mn = min(mn, dis[to[i]]);
            if (--num[dis[x]] == 0) break;
            ++num[dis[x] = mn + 1];
            cur[x] = head[x];
            if (x != s) x = to[fa[x] ^ 1];
        }
    }
    return flow;
}
int main()
{
    memset(head, -1, sizeof(head));
    int n, m, sum = 0;
    scanf("%d%d", &n, &m);
    cnt = n + m + 2;
    for (int i = 1, x; i <= n; i++)
    {
        scanf("%d", &x);
        addEdge(0, i, x);
    }
    for (int i = 1, x, y, z; i <= m; i++)
    {
        scanf("%d%d%d", &x, &y, &z);
        addEdge(x, n + i, inf);
        addEdge(y, n + i, inf);
        addEdge(n + i, n + m + 1, z);
        sum += z;
    }
    printf("%d", sum - ISAP(0, n + m + 1));
    return 0;
}
```
<div id="__comment"></div>
