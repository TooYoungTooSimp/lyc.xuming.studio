---
template: post_with_isso
title: LYDSY 1015
pageId: lydsy_1015
---

# LYDSY 1015
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
const int maxn = 500010;
int fa[maxn], to[maxn], next[maxn], head[maxn], ecnt, destroy[maxn], ans, st[maxn], s_top;
bool destroyed[maxn];
inline void readInt(int &x)
{
    int ch = x = 0;
    while (!isdigit(ch = getchar()))
        ;
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
}
int find(int x) { return fa[x] == x ? x : fa[x] = find(fa[x]); }
void link(int x, int y)
{
    int fx = find(x), fy = find(y);
    if (fx != fy) fa[fx] = fy, ans--;
}
inline void addEdge(int x, int y)
{
    ecnt++;
    to[ecnt] = y;
    next[ecnt] = head[x];
    head[x] = ecnt;
}
int main()
{
    for (int i = 0; i < maxn; i++) fa[i] = i;
    int n, m, k;
    readInt(n), readInt(m);
    for (int i = 0, x, y; i < m; i++)
        readInt(x), readInt(y),
            addEdge(x, y), addEdge(y, x);
    readInt(k);
    for (int i = 0; i < k; i++)
        readInt(destroy[i]), destroyed[destroy[i]] = true;
    ans = n - k;
    for (int i = 0; i < n; i++)
        if (!destroyed[i])
            for (int cur = head[i]; cur; cur = next[cur])
                if (!destroyed[to[cur]])
                    link(i, to[cur]);
    st[s_top++] = ans;
    for (int i = k - 1; i >= 0; i--)
    {
        int x = destroy[i];
        destroyed[x] = false;
        ans++;
        for (int cur = head[x]; cur; cur = next[cur])
            if (!destroyed[to[cur]])
                link(x, to[cur]);
        st[s_top++] = ans;
    }
    while (s_top) printf("%d\n", st[--s_top]);
    return 0;
}
```
<div id="__comment"></div>
