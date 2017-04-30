---
template: post_with_netease
title: POJ 3041
pageId: poj_3041
---

# POJ 3041

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
int adj[505], nxt[10005], to[10005], ecnt, mate[505], vis[505], idx, n, m;
inline void addEdge(int f, int t)
{
    nxt[++ecnt] = adj[f], adj[f] = ecnt, to[ecnt] = t;
}
bool hungry(int u)
{
    for (int e = adj[u]; e; e = nxt[e])
        if (!mate[to[e]])
            return mate[to[e]] = u, true;
    for (int e = adj[u]; e; e = nxt[e])
        if (vis[to[e]] != idx)
        {
            vis[to[e]] = idx;
            if (hungry(mate[to[e]])) return mate[to[e]] = u, true;
        }
    return false;
}
int main()
{
    scanf("%d%d", &n, &m);
    for (int i = 0, x, y; i < m; i++)
        scanf("%d%d", &x, &y), addEdge(x, y);
    int ans = 0;
    for (int i = 1; i <= n; i++)
    {
        idx++;
        if (hungry(i)) ans++;
    }
    printf("%d", ans);
    return 0;
}
```
