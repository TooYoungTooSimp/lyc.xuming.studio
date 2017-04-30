---
template: post_with_netease
title: LYDSY 1036_HLD
pageId: lydsy_1036_hld
---

# LYDSY 1036_HLD

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cctype>
#define L(x) ((x) << 1)
#define R(x) ((x) << 1 | 1)
#define avg(x, y) (((x) + (y)) >> 1)
inline int max(int a, int b) { return a > b ? a : b; }
inline int min(int a, int b) { return a < b ? a : b; }
template <typename T> inline void swap(T &a, T &b)
{
    T t = a;
    a = b;
    b = t;
}
inline void read(int &x)
{
    int ch = x = 0, sign = 1;
    while (!isdigit(ch = getchar())) if (ch == '-') sign = -1;
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
    x *= sign;
}
const int N = int(3e4 + 5), inf = 0x3f3f3f3f;
int adj[N], nxt[N << 1], to[N << 1], ecnt;
int sum[N << 2], mx[N << 2];
int n, sz[N], son[N], dep[N], fa[N], top[N], idx[N], pos[N], val[N];
inline void addEdge(int f, int t)
{
    ecnt++;
    nxt[ecnt] = adj[f];
    adj[f] = ecnt;
    to[ecnt] = t;
}
void build(int k, int l, int r)
{
    if (l == r - 1) return void(sum[k] = mx[k] = val[idx[l]]);
    int m = avg(l, r);
    build(L(k), l, m);
    build(R(k), m, r);
    sum[k] = sum[L(k)] + sum[R(k)];
    mx[k] = max(mx[L(k)], mx[R(k)]);
}
void modify(int k, int l, int r, int p, int v)
{
    if (l == r - 1) return void(sum[k] = mx[k] = v);
    int m = avg(l, r);
    (p < m) ? modify(L(k), l, m, p, v) : modify(R(k), m, r, p, v);
    sum[k] = sum[L(k)] + sum[R(k)];
    mx[k] = max(mx[L(k)], mx[R(k)]);
}
int qsum(int k, int l, int r, int x, int y)
{
    if (x <= l && r <= y) return sum[k];
    int m = avg(l, r), res = 0;
    if (x < m) res += qsum(L(k), l, m, x, y);
    if (y > m) res += qsum(R(k), m, r, x, y);
    return res;
}
int qmax(int k, int l, int r, int x, int y)
{
    if (x <= l && r <= y) return mx[k];
    int m = avg(l, r), res = -inf;
    if (x < m) res = max(res, qmax(L(k), l, m, x, y));
    if (y > m) res = max(res, qmax(R(k), m, r, x, y));
    return res;
}
int psum(int u, int v)
{
    int res = 0;
    while (top[u] != top[v])
    {
        if (dep[top[u]] < dep[top[v]]) swap(u, v);
        res += qsum(1, 0, n, pos[top[u]], pos[u] + 1);
        u = fa[top[u]];
    }
    if (dep[u] > dep[v]) swap(u, v);
    return res + qsum(1, 0, n, pos[u], pos[v] + 1);
}
int pmax(int u, int v)
{
    int res = -inf;
    while (top[u] != top[v])
    {
        if (dep[top[u]] < dep[top[v]]) swap(u, v);
        res = max(res, qmax(1, 0, n, pos[top[u]], pos[u] + 1));
        u = fa[top[u]];
    }
    if (dep[u] > dep[v]) swap(u, v);
    return max(res, qmax(1, 0, n, pos[u], pos[v] + 1));
}
void init()
{
    static int que[N];
    int len = 0, u, v;
    que[len++] = 1;
    for (int i = 0; i < len; i++)
    {
        sz[u = que[i]] = 1;
        for (int e = adj[u]; e; e = nxt[e])
            if ((v = to[e]) != fa[u])
                fa[v] = u, dep[v] = dep[u] + 1, que[len++] = v;
    }
    for (int i = len - 1; i; i--)
    {
        u = que[i], v = fa[u];
        sz[v] += sz[u];
        if (sz[u] > sz[son[v]]) son[v] = u;
    }
    for (int i = 0, tot = 0; i < len; i++)
        if (top[u = que[i]] == 0)
            for (v = u; v; v = son[v])
                idx[pos[v] = tot++] = v, top[v] = u;
}
int main()
{
    read(n);
    for (int i = 1, x, y; i < n; i++)
    {
        read(x), read(y);
        addEdge(x, y), addEdge(y, x);
    }
    for (int i = 1; i <= n; i++) read(val[i]);
    init();
    build(1, 0, n);
    int m, u, v;
    read(m);
    static char op[10];
    while (m--)
    {
        scanf("%s", op);
        read(u), read(v);
        if (op[1] == 'H') modify(1, 0, n, pos[u], v);
        if (op[1] == 'M') printf("%d\n", pmax(u, v));
        if (op[1] == 'S') printf("%d\n", psum(u, v));
    }
    return 0;
}
```
<div id="__comment"></div>
