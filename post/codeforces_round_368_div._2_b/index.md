---
template: post_with_disqus
title: CODEFORCES ROUND #368 (DIV. 2) B
pageId: codeforces_round_#368_(div._2)_b
---

# CODEFORCES ROUND #368 (DIV. 2) B
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
struct Edge
{
    int from, to, dist;
    Edge *next;
    Edge(int f = 0, int t = 0, int d = 0, Edge *n = 0) : from(f), to(t), dist(d), next(n) {}
} * G[100005];
const int inf = 1 << 30;
int scs[100005];
bool isStor[100005];
int main()
{
    int n, m, k, ans;
    ans = inf;
    scanf("%d%d%d", &n, &m, &k);
    for (int i = 0, u, v, l; i < m; i++)
    {
        scanf("%d%d%d", &u, &v, &l);
        G[u] = new Edge(u, v, l, G[u]);
        G[v] = new Edge(v, u, l, G[v]);
    }
    for (int i = 0; i < k; i++) scanf("%d", scs + i), isStor[scs[i]] = true;
    for (int i = 0; i < k; i++)
        for (Edge *cur = G[scs[i]]; cur; cur = cur->next)
            if (cur->dist < ans && !isStor[cur->to])
                ans = cur->dist;
    if (ans >= inf) ans = -1;
    printf("%d", ans);
    return 0;
}
```
<div id="__comment"></div>
