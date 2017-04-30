---
template: post_with_netease
title: LYDSY 1509
pageId: lydsy_1509
---

# LYDSY 1509
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
template <typename T>
inline T max(T a, T b) { return a > b ? a : b; }
template <typename T>
inline T min(T a, T b) { return a < b ? a : b; }
int head[200005], next[200005 << 2], to[200005 << 2], len[200005 << 2], ecnt, n, m, que[200005 << 1];
long long disa[200005], disb[200005];
inline void addEdge(int f, int t, int l)
{
    ecnt++;
    next[ecnt] = head[f];
    head[f] = ecnt;
    to[ecnt] = t;
    len[ecnt] = l;
}
int bfs(int s, long long *dis)
{
    int h = 0, t = 0;
    dis[s] = 0;
    que[t++] = s;
    for (int x; h != t; h++)
        for (int cur = head[x = que[h]]; cur; cur = next[cur])
            if (dis[to[cur]] == -1)
                dis[que[t++] = to[cur]] = dis[x] + len[cur];
    int id = -1;
    long long val = -1;
    for (int i = 1; i <= n; i++)
        if (dis[i] > val) val = dis[id = i];
    return id;
}
int main()
{
    scanf("%d%d", &n, &m);
    for (int i = 0, x, y, z; i < m; i++)
    {
        scanf("%d%d%d", &x, &y, &z);
        addEdge(x, y, z);
        addEdge(y, x, z);
    }
    memset(disa, -1, sizeof(disa));
    memset(disb, -1, sizeof(disb));
    int a = bfs(1, disa);
    memset(disa, -1, sizeof(disa));
    int b = bfs(a, disa);
    bfs(b, disb);
    long long ans = 0;
    for (int i = 1; i <= n; i++) ans = max(ans, min(disa[i], disb[i]));
    ans += disb[a];
    printf("%lld", ans);
    return 0;
}
```
<div id="__comment"></div>
