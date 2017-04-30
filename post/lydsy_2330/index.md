---
template: post_with_netease
title: LYDSY 2330
pageId: lydsy_2330
---

# LYDSY 2330
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
int head[100010], next[500010], to[500010], len[500010], ecnt, n, k;
int que[10000010], dis[100010], vis[100010];
bool inq[100010];
inline void addEdge(int f, int t, int l)
{
    ecnt++;
    next[ecnt] = head[f];
    head[f] = ecnt;
    to[ecnt] = t;
    len[ecnt] = l;
}
bool spfa()
{
    dis[0] = 0, inq[0] = true, vis[0] = 1;
    int f, r;
    f = r = 0;
    que[r++] = 0;
    for (int x; f ^ r; inq[que[f++]] = false)
        for (int cur = head[x = que[f]]; cur; cur = next[cur])
            if (dis[to[cur]] < dis[x] + len[cur])
            {
                dis[to[cur]] = dis[x] + len[cur];
                if (++vis[to[cur]] > n || to[cur] == x) return false;
                if (!inq[to[cur]]) inq[que[r++] = to[cur]] = true;
            }
    return true;
}
int main()
{
    scanf("%d%d", &n, &k);
    for (int i = 0, x, a, b; i < k; i++)
    {
        scanf("%d%d%d", &x, &a, &b);
        if (x == 1) addEdge(a, b, 0), addEdge(b, a, 0);
        if (x == 2) addEdge(a, b, 1);
        if (x == 3) addEdge(b, a, 0);
        if (x == 4) addEdge(b, a, 1);
        if (x == 5) addEdge(a, b, 0);
    }
    for (int i = n; i; i--) addEdge(0, i, 1);
    long long ans = 0;
    if (!spfa())
        ans = -1;
    else
        for (int i = 1; i <= n; i++) ans += dis[i];
    printf("%lld", ans);
    return 0;
}
```
<div id="__comment"></div>
