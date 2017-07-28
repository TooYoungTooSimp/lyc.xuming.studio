---
template: post_with_isso
title: LYDSY 1854
pageId: lydsy_1854
---

# LYDSY 1854
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
int head[10010], next[2000010], to[2000010], ecnt, ts;
int vis[1000010], pre[1000010];
inline void addEdge(int f, int t)
{
    ecnt++;
    next[ecnt] = head[f];
    head[f] = ecnt;
    to[ecnt] = t;
}
bool dfs(int u)
{
    for (int cur = head[u], v; cur; cur = next[cur])
        if (vis[to[cur]] != ts)
        {
            v = to[cur], vis[v] = ts;
            if (!pre[v] || dfs(pre[v]))
            {
                pre[v] = u;
                return true;
            }
        }
    return false;
}
int main()
{
    int n;
    scanf("%d", &n);
    for (int i = 1, x, y; i <= n; i++)
    {
        scanf("%d%d", &x, &y);
        addEdge(x, i);
        addEdge(y, i);
    }
    for (ts = 1; ts <= 10001; ts++)
        if (!dfs(ts)) break;
    printf("%d", ts - 1);
    return 0;
}
```
<div id="__comment"></div>
