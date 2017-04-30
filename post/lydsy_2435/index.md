---
template: post_with_netease
title: LYDSY 2435
pageId: lydsy_2435
---

# LYDSY 2435
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
typedef long long int64;
const int maxn = 1000010;
int head[maxn], to[maxn << 1], next[maxn << 1], ecnt, sz[maxn], u[maxn], v[maxn], w[maxn];
inline void addEdge(int f, int t)
{
    ecnt++;
    next[ecnt] = head[f];
    head[f] = ecnt;
    to[ecnt] = t;
}
inline int min(int x, int y) { return x < y ? x : y; }
inline int64 abs(int64 x) { return x >= 0 ? x : -x; }
void dfs(int x, int f)
{
    sz[x] = 1;
    for (int cur = head[x]; cur; cur = next[cur])
        if (to[cur] != f)
        {
            dfs(to[cur], x);
            sz[x] += sz[to[cur]];
        }
}
int main()
{
    int n;
    scanf("%d", &n);
    for (int i = 1; i < n; i++)
    {
        scanf("%d%d%d", u + i, v + i, w + i);
        addEdge(u[i], v[i]);
        addEdge(v[i], u[i]);
    }
    dfs(1, 0);
    int64 ans = 0;
    for (int i = 1; i < n; i++)
        ans += abs(n - (min(sz[u[i]], sz[v[i]]) << 1)) * w[i];
    printf("%lld", ans);
    return 0;
}
```
<div id="__comment"></div>
