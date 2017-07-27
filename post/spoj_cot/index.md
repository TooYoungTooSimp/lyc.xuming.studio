---
template: post_with_disqus
title: SPOJ COT
pageId: spoj_cot
---

# SPOJ COT
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <algorithm>
#include <cctype>
#include <cstdio>
#include <cstring>
#define avg(x, y) (x + ((y - x) >> 1))
inline void read(int &x)
{
    int ch = x = 0, sign = 1;
    while (!isdigit(ch = getchar()))
        if (ch == '-') sign = -1;
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
    x *= sign;
}
const int N = 400010;
int W[N], adj[N], to[N << 1], nxt[N << 1], ecnt;
int fa[N], dep[N], root[N], rcnt;
inline void addEdge(int f, int t)
{
    ecnt++;
    nxt[ecnt] = adj[f];
    adj[f] = ecnt;
    to[ecnt] = t;
}
int n;
struct node
{
    int l, r, v;
} t[N << 5];
void insert(int p, int &x, int l, int r, int v)
{
    (t[x = ++rcnt] = t[p]).v++;
    if (l == r - 1) return;
    int m = avg(l, r);
    v < m ? insert(t[p].l, t[x].l, l, m, v) : insert(t[p].r, t[x].r, m, r, v);
}
int query(int a, int b, int c, int d, int k)
{
    int l = 0, r = n;
    while (l != r - 1)
    {
        int mid = avg(l, r);
        if (t[t[a].l].v + t[t[b].l].v - t[t[c].l].v - t[t[d].l].v >= k)
        {
            a = t[a].l, b = t[b].l, c = t[c].l, d = t[d].l;
            r = mid;
        }
        else
        {
            k -= t[t[a].l].v + t[t[b].l].v - t[t[c].l].v - t[t[d].l].v;
            a = t[a].r, b = t[b].r, c = t[c].r, d = t[d].r;
            l = mid;
        }
    }
    return l;
}
int F[N][20];
void init_lca()
{
    for (int i = 1; i <= n; i++) F[i][0] = fa[i];
    for (int j = 1; j < 20; j++)
        for (int i = 1; i <= n; i++)
            F[i][j] = F[F[i][j - 1]][j - 1];
}
int LCA(int x, int y)
{
    if (dep[x] < dep[y]) std::swap(x, y);
    for (int i = 19; i >= 0; --i)
        if (dep[F[x][i]] >= dep[y])
            x = F[x][i];
    if (x == y) return x;
    for (int i = 19; i >= 0; --i)
        if (F[x][i] != F[y][i])
            x = F[x][i], y = F[y][i];
    return fa[x];
}
int main()
{
    int m;
    read(n), read(m);
    for (int i = 1; i <= n; i++) read(W[i]);
    static int H[N];
    memcpy(H, W + 1, n << 4);
    std::sort(H, H + n);
    int tend = int(std::unique(H, H + n) - H);
    for (int i = 1; i <= n; i++) W[i] = int(std::lower_bound(H, H + tend, W[i]) - H);
    for (int i = 1, u, v; i < n; i++)
        read(u), read(v), addEdge(u, v), addEdge(v, u);
    static int que[N];
    int len = 0;
    que[len++] = 1;
    for (int i = 0; i < len; i++)
    {
        int x = que[i];
        dep[x] = dep[fa[x]] + 1;
        insert(root[fa[x]], root[x], 0, n, W[x]);
        for (int e = adj[x]; e; e = nxt[e])
            if (to[e] != fa[x])
                fa[que[len++] = to[e]] = x;
    }
    init_lca();
    for (int i = 0, u, v, k, ans = 0; i < m; i++)
    {
        read(u), read(v), read(k);
        ans = H[query(root[u], root[v], root[LCA(u, v)], root[fa[LCA(u, v)]], k)];
        printf("%d", ans);
        if (i != m - 1) putchar('\n');
    }
    return 0;
}
```
<div id="__comment"></div>
