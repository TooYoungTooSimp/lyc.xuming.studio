---
template: post_with_disqus
title: SPOJ QTREE_HLD
pageId: spoj_qtree_hld
---

# SPOJ QTREE_HLD
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
#include <cstring>
#define L(x) ((x) << 1)
#define R(x) ((x) << 1 | 1)
#define avg(x, y) (((x) + (y)) >> 1)
const int N = 20005, M = N << 1, inf = 0x3f3f3f3f;
template <typename T>
inline void swap(T &x, T &y)
{
    T t = x;
    x = y;
    y = t;
}
template <typename T>
inline T max(const T &x, const T &y) { return x > y ? x : y; }
int U[N], V[N], W[N], adj[N], nxt[M], to[M], val[N], ecnt, mx[N << 2];
int sz[N], son[N], dep[N], top[N], fa[N], pos[N], idx[N];
inline void addEdge(int f, int t)
{
    ecnt++;
    nxt[ecnt] = adj[f];
    adj[f] = ecnt;
    to[ecnt] = t;
}
inline void read(int &x)
{
    int ch = x = 0, flag = 1;
    while (!isdigit(ch = getchar()))
        if (ch == '-') flag = -1;
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
    x *= flag;
}
void build(int k, int l, int r)
{
    if (l == r - 1) return void(mx[k] = val[idx[l]]);
    int m = avg(l, r);
    build(L(k), l, m);
    build(R(k), m, r);
    mx[k] = max(mx[L(k)], mx[R(k)]);
}
void modify(int k, int l, int r, int p, int v)
{
    if (l == r - 1) return void(mx[k] = v);
    int m = avg(l, r);
    (p < m) ? modify(L(k), l, m, p, v) : modify(R(k), m, r, p, v);
    mx[k] = max(mx[L(k)], mx[R(k)]);
}
int qmax(int k, int l, int r, int x, int y)
{
    if (x <= l && r <= y) return mx[k];
    int m = avg(l, r), res = -inf;
    if (x < m) res = max(res, qmax(L(k), l, m, x, y));
    if (y > m) res = max(res, qmax(R(k), m, r, x, y));
    return res;
}
int n;
int pmax(int x, int y)
{
    int res = -inf;
    while (top[x] != top[y])
    {
        if (dep[top[x]] < dep[top[y]]) swap(x, y);
        res = max(res, qmax(1, 0, n, pos[top[x]], pos[x] + 1));
        x = fa[top[x]];
    }
    if (dep[x] > dep[y]) swap(x, y);
    return max(res, qmax(1, 0, n, pos[x] + 1, pos[y] + 1));
}
int main()
{
    static int que[N];
    int T;
    read(T);
    while (T--)
    {
        ecnt = 0;
        memset(adj, 0, sizeof(adj));
        memset(son, 0, sizeof(son));
        memset(top, 0, sizeof(top));
        read(n);
        for (int i = 1; i < n; i++) read(U[i]), read(V[i]), read(W[i]), addEdge(U[i], V[i]), addEdge(V[i], U[i]);
        int len = 0, u, v;
        val[que[len++] = 1] = -inf;
        for (int i = 0; i < len; i++)
            for (int e = adj[u = que[i]]; e; e = nxt[e])
                if ((v = to[e]) != fa[u])
                    fa[v] = u, dep[v] = dep[u] + 1, que[len++] = v;
        for (int i = 1; i < n; ++i) val[dep[U[i]] > dep[V[i]] ? U[i] : V[i]] = W[i];
        for (int i = 0; i < len; i++) sz[que[i]] = 1;
        for (int i = len - 1; i > 0; i--)
        {
            u = que[i], v = fa[u];
            sz[v] += sz[u];
            if (sz[u] > sz[son[v]]) son[v] = u;
        }
        for (int i = 0, tot = 0; i < n; i++)
            if (top[u = que[i]] == 0)
                for (v = u; v; v = son[v])
                    idx[pos[v] = tot++] = v, top[v] = u;
        build(1, 0, n);
        char op[10];
        while (true)
        {
            scanf("%s", op);
            if (*op == 'D') break;
            read(u), read(v);
            if (*op == 'C') modify(1, 0, n, pos[dep[U[u]] > dep[V[u]] ? U[u] : V[u]], v);
            if (*op == 'Q') printf("%d\n", pmax(u, v));
        }
    }
    return 0;
}
```
<div id="__comment"></div>
