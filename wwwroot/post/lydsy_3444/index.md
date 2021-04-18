---
template: post_with_isso
title: LYDSY 3444
pageId: lydsy_3444
---

# LYDSY 3444
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
#include <map>
typedef long long int64;
const int64 mod = 989381;
const int maxn = 500010;
inline void readInt(int &x)
{
    int ch = x = 0;
    bool F = false;
    for (; !isdigit(ch = getchar()); F = (ch == '-'))
        ;
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
    F && (x = -x);
}
int fa[maxn], cnt[maxn], deg[maxn], head[maxn], to[maxn << 1], next[maxn << 1], idx, n, m, num;
bool vis[maxn];
std::map<int, bool> M[maxn];
int Find(int x) { return x == fa[x] ? x : fa[x] = Find(fa[x]); }
void link(int x, int y)
{
    int fx = Find(x), fy = Find(y);
    if (fx != fy)
    {
        fa[fx] = fy;
        cnt[fy] += cnt[fx];
        cnt[fx] = 0;
    }
}
inline void addEdge(int x, int y)
{
    idx++;
    to[idx] = y;
    next[idx] = head[x];
    head[x] = idx;
}
int fast_pow(int64 base, int pow)
{
    int ans = 1;
    for (; pow; base = (base * base) % mod, pow >>= 1)
        if (pow & 1)
            ans = (ans * base) % mod;
    return ans;
}
void dfs(int id, int f)
{
    num++;
    vis[id] = true;
    if (num > n) return;
    for (int cur = head[id]; cur; cur = next[cur])
        if (to[cur] != f)
            dfs(to[cur], id);
}
bool check()
{
    for (int i = 1; i <= n; i++)
        if (deg[i] > 2) return false;
    for (int i = 1; i <= n; i++)
        if (!vis[i])
            if (deg[i] == 1)
                dfs(i, 0);
            else if (deg[i] == 0)
                vis[i] = true, num++;
    return num == n;
}
int main()
{
    for (int i = 0; i < maxn; i++) fa[i] = i, cnt[i] = 1;
    readInt(n), readInt(m);
    for (int i = 0, x, y; i < m; i++)
    {
        readInt(x), readInt(y);
        if (M[x][y] || M[y][x]) continue;
        addEdge(x, y), addEdge(y, x);
        deg[x]++, deg[y]++;
        link(x, y);
        M[x][y] = M[y][x] = true;
    }
    int64 ans = 0;
    if (check())
    {
        ans = 1;
        int l = 0, p = 0;
        for (int i = 1; i <= n; i++)
            if (fa[i] == i)
                (cnt[i] > 1 ? l : p)++;
        for (int i = 1; i <= l + p; i++) ans = (ans * i) % mod;
        ans = (ans * fast_pow(2, l)) % mod;
    }
    printf("%lld", ans);
    return 0;
}
```
<div id="__comment"></div>
