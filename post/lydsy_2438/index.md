---
template: post_with_netease
title: LYDSY 2438
pageId: lydsy_2438
---

# LYDSY 2438
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
inline int min(int a, int b) { return a < b ? a : b; }
int n, m, head[100010], next[300010], to[300010], ecnt,
    scc[100010], scccnt, st[100010], top, dfn[100010], low[100010], idx,
    nHead[100010], nNext[300010], nTo[300010], nEcnt, in[100010], sccsz[100010];
bool instack[100010];
inline void addEdge(int f, int t)
{
    ecnt++;
    next[ecnt] = head[f];
    head[f] = ecnt;
    to[ecnt] = t;
}
inline void addEdgeN(int f, int t)
{
    nEcnt++;
    nNext[nEcnt] = nHead[f];
    nHead[f] = nEcnt;
    nTo[nEcnt] = t;
}
void tarjan(int u)
{
    dfn[u] = low[u] = ++idx;
    instack[st[top++] = u] = true;
    for (int cur = head[u]; cur; cur = next[cur])
        if (!dfn[to[cur]])
            tarjan(to[cur]), low[u] = min(low[u], low[to[cur]]);
        else if (instack[to[cur]])
            low[u] = min(low[u], dfn[to[cur]]);
    if (dfn[u] == low[u])
    {
        scccnt++;
        do
        {
            top--;
            scc[st[top]] = scccnt;
            instack[st[top]] = false;
            sccsz[scccnt]++;
        } while (st[top] != u);
    }
}
int main()
{
    scanf("%d%d", &n, &m);
    for (int i = 1, x, y; i <= m; i++)
    {
        scanf("%d%d", &x, &y);
        addEdge(x, y);
    }
    for (int i = 1; i <= n; i++)
        if (!dfn[i]) tarjan(i);
    for (int i = 1; i <= n; i++)
        for (int cur = head[i]; cur; cur = next[cur])
            if (scc[i] != scc[to[cur]])
                addEdgeN(scc[i], scc[to[cur]]), in[scc[to[cur]]]++;
    int cnt = 0;
    for (int i = 1; i <= scccnt; i++)
        if (in[i] == 0) cnt++;
    for (int i = 1; i <= scccnt; i++)
        if (sccsz[i] == 1 && in[i] == 0)
        {
            bool flag = true;
            for (int j = nHead[i]; j; j = nNext[j])
                if (in[nTo[j]] <= 1) {
                    flag = false;
                    break;
                }
            if (flag) {
                cnt--;
                break;
            }
        }
    printf("%.6lf", 1.0 * (n - cnt) / n);
    return 0;
}
```
<div id="__comment"></div>
