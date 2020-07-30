---
template: post_with_isso
title: LYDSY 4538
pageId: lydsy_4538
---

# LYDSY 4538
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
#include <queue>
inline void read(int &x)
{
    int ch = x = 0, flag = 1;
    while (!isdigit(ch = getchar()))
        if (ch == '-') flag = -1;
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
    x *= flag;
}
const int inf = 0x3f3f3f3f, N = int(1e5 + 5), M = N << 1;
#define avg(x, y) ((x) + (((y) - (x)) >> 1))
#define L(x) ((x) << 1)
#define R(x) ((x) << 1 | 1)
template <typename T>
struct __ext_priority_queue
{
private:
    std::priority_queue<T> a, b;

public:
    void push(const T &x) { a.push(x); }
    void pop(const T &x) { b.push(x); }
    T top()
    {
        while (!b.empty() && a.top() == b.top()) a.pop(), b.pop();
        return a.empty() ? -1 : a.top();
    }
};
__ext_priority_queue<int> node[N << 2];
void modify(int k, int l, int r, int x, int y, int v, bool t)
{
    if (x <= l && r <= y) return void(t ? node[k].push(v) : node[k].pop(v));
    int m = avg(l, r);
    if (x < m) modify(L(k), l, m, x, y, v, t);
    if (y > m) modify(R(k), m, r, x, y, v, t);
}
int query(int k, int l, int r, int p)
{
    int cur = node[k].top();
    if (l == r - 1) return cur;
    int m = avg(l, r);
    return std::max(cur, p < m ? query(L(k), l, m, p) : query(R(k), m, r, p));
}
int adj[N], nxt[N << 1], to[N << 1], ecnt;
inline void addEdge(int f, int t)
{
    ecnt++;
    nxt[ecnt] = adj[f];
    adj[f] = ecnt;
    to[ecnt] = t;
}
int n, m;
int sz[N], fa[N], dep[N], son[N], top[N], idx[N], pos[N];
void HLD()
{
    int u, v, len = 0;
    static int que[N];
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
                top[idx[pos[v] = tot++] = v] = u;
}
void work(int u, int v, int w, bool t)
{
    typedef std::pair<int, int> seg;
    static seg segs[N];
    int scnt = 0;
    segs[scnt++] = seg(-1, -1);
    while (top[u] != top[v])
    {
        if (dep[top[u]] < dep[top[v]]) std::swap(u, v);
        segs[scnt++] = seg(pos[top[u]], pos[u]);
        u = fa[top[u]];
    }
    if (dep[u] > dep[v]) std::swap(u, v);
    segs[scnt++] = seg(pos[u], pos[v]);
    segs[scnt] = seg(n, n);
    std::sort(segs, segs + scnt);
    for (int i = 0; i <= scnt; i++)
        if (segs[i].second + 1 < segs[i + 1].first)
            modify(1, 0, n, segs[i].second + 1, segs[i + 1].first, w, t);
}
int main()
{
    read(n), read(m);
    for (int i = 1, u, v; i < n; i++) read(u), read(v), addEdge(u, v), addEdge(v, u);
    HLD();
    for (int i = 1; i <= m; i++)
    {
        static int Qf[M], Qt[M], Qv[M];
        int type;
        read(type);
        if (type == 0)
        {
            read(Qf[i]), read(Qt[i]), read(Qv[i]);
            work(Qf[i], Qt[i], Qv[i], true);
        }
        if (type == 1)
        {
            int t;
            read(t);
            work(Qf[t], Qt[t], Qv[t], false);
        }
        if (type == 2)
        {
            int x;
            read(x);
            printf("%d\n", query(1, 0, n, pos[x]));
        }
    }
    return 0;
}

```
<div id="__comment"></div>
