---
template: post_with_netease
title: LYDSY 2208
pageId: lydsy_2208
---

# LYDSY 2208
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
int n, ans;
int next[2010 * 2010], to[2010 * 2010], head[2010], idx;
char buf[2010];
bool vis[2010];
void addEdge(int f, int t)
{
    idx++;
    next[idx] = head[f];
    head[f] = idx;
    to[idx] = t;
}
void dfs(int x)
{
    ans++;
    vis[x] = true;
    for (int cur = head[x]; cur; cur = next[cur])
        if (!vis[to[cur]])
            dfs(to[cur]);
}
int main()
{
    scanf("%d\n", &n);
    for (int i = 0; i < n; i++)
    {
        fgets(buf, 2010, stdin);
        for (int j = 0; j < n; j++)
            if (buf[j] == '1')
                addEdge(i + 1, j + 1);
    }
    for (int i = 1; i <= n; i++)
    {
        memset(vis, 0, sizeof(vis));
        dfs(i);
    }
    printf("%d", ans);
    return 0;
}
```
<div id="__comment"></div>
