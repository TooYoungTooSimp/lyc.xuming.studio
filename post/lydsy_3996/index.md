---
template: post_with_disqus
title: LYDSY 3996
pageId: lydsy_3996
---

# LYDSY 3996
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
const int inf = 0x3f3f3f3f, maxn = 260000, maxm = maxn << 3, cnt = maxn - 1;
int head[maxn], next[maxm], to[maxm], cap[maxm], ecnt;
int que[maxn << 2], num[maxn], fa[maxn], dis[maxn], cur[maxn];
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
int ISAP(int S, int T)
{
    int h = 0, t = 0, x, flow = 0;
    for (int i = 0; i <= cnt; i++) dis[i] = cnt;
    dis[que[t++] = T] = 0;
    while (h != t)
        for (int i = head[x = que[h++]]; ~i; i = next[i])
            if (cap[i ^ 1] && dis[to[i]] > dis[x] + 1)
                dis[que[t++] = to[i]] = dis[x] + 1;
    memset(num, 0, sizeof(num));
    for (int i = 0; i <= cnt; i++) num[dis[i]]++, cur[i] = head[i];
    x = S;
    while (dis[S] < cnt)
    {
        if (x == T)
        {
            int curFlow = inf;
            for (x = T; x != S; x = to[fa[x] ^ 1]) curFlow = min(curFlow, cap[fa[x]]);
            for (x = T; x != S; x = to[fa[x] ^ 1]) cap[fa[x]] -= curFlow, cap[fa[x] ^ 1] += curFlow;
            flow += curFlow, x = S;
        }
        bool needRetreat = true;
        for (int i = cur[x]; needRetreat && ~i; i = next[i])
            if (cap[i] && dis[to[i]] == dis[x] - 1)
                needRetreat = false, cur[x] = i, fa[x = to[i]] = i;
        if (needRetreat)
        {
            int mn = cnt - 1;
            for (int i = head[x]; ~i; i = next[i])
                if (cap[i]) mn = min(mn, dis[to[i]]);
            if (--num[dis[x]] == 0) break;
            ++num[dis[x] = mn + 1];
            cur[x] = head[x];
            if (x != S) x = to[fa[x] ^ 1];
        }
    }
    return flow;
}
int main()
{
    memset(head, -1, sizeof(head));
    int n, S, T, idx, ans;
    scanf("%d", &n);
    S = 0, T = n + n * n + 1, idx = n, ans = 0;
    for (int i = 1; i <= n; i++)
        for (int j = 1, w; j <= n; j++)
        {
            scanf("%d", &w);
            addEdge(S, ++idx, w);
            addEdge(idx, i, inf);
            addEdge(idx, j, inf);
            ans += w;
        }
    for (int i = 1, w; i <= n; i++)
    {
        scanf("%d", &w);
        addEdge(i, T, w);
    }
    printf("%d", ans - ISAP(S, T));
    return 0;
}
```
<div id="__comment"></div>
