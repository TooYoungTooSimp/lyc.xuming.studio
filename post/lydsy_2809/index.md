---
template: post_with_netease
title: LYDSY 2809
pageId: lydsy_2809
---

# LYDSY 2809

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
template <typename T> inline void swap(T &x, T &y)
{
    T t = x;
    x = y;
    y = t;
}
template <typename T> inline T max(T x, T y) { return x > y ? x : y; }
inline void read(int &x)
{
    int ch = x = 0;
    while (!isdigit(ch = getchar()));
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
}
const int maxn = 100010;
int n, m, fa[maxn], C[maxn], L[maxn], cnt;
typedef struct Node
{
    Node *lc, *rc;
    int val, dis, sz;
    long long sum;
} *lpNode;
lpNode merge(lpNode x, lpNode y)
{
    if (x == 0) return y;
    if (y == 0) return x;
    if (x->val < y->val) swap(x, y);
    x->rc = merge(x->rc, y);
    if (x->lc == 0 || x->lc->dis < x->rc->dis) swap(x->lc, x->rc);
    x->dis = x->rc ? x->rc->dis + 1 : 0;
    x->sz = (x->lc ? x->lc->sz : 0) + (x->rc ? x->rc->sz : 0) + 1;
    x->sum = (x->lc ? x->lc->sum : 0) + (x->rc ? x->rc->sum : 0) + x->val;
    return x;
}
Node mem[maxn];
lpNode nodes[maxn];
int head[maxn], to[maxn], next[maxn], ecnt, arr[maxn], aend;
inline void addEdge(int f, int t)
{
    ecnt++;
    next[ecnt] = head[f];
    head[f] = ecnt;
    to[ecnt] = t;
}
int main()
{
    read(n), read(m);
    for (int i = 1; i <= n; i++)
        read(fa[i]), read(C[i]), read(L[i]), addEdge(fa[i], i),
        (nodes[i] = mem + i)->sz = 1, nodes[i]->sum = nodes[i]->val = C[i];
    for (int i = 0; i <= n; i++)
        for (int cur = head[i]; cur; cur = next[cur])
            arr[++aend] = to[cur];
    long long ans = 0;
    for (int i = aend; i; i--)
    {
        int x = arr[i], y = fa[x];
        ans = max(ans, 1ll * nodes[x]->sz * L[x]);
        nodes[y] = merge(nodes[y], nodes[x]);
        while (y && nodes[y]->sum > m)
            nodes[y] = merge(nodes[y]->lc, nodes[y]->rc);
    }
    printf("%lld", ans);
    return 0;
}
```
