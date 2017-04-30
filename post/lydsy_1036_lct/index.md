---
template: post_with_netease
title: LYDSY 1036_LCT
pageId: lydsy_1036_lct
---

# LYDSY 1036_LCT
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
const int inf = 0x3f3f3f3f;
inline void read(int &x)
{
    int ch = x = 0, flag = 1;
    while (!isdigit(ch = getchar()))
        if (ch == '-') flag = -1;
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
    x *= flag;
}
template <typename T>
inline void swap(T &x, T &y)
{
    T t = x;
    x = y;
    y = t;
}
template <typename T>
inline T max(const T &a, const T &b) { return a > b ? a : b; }
struct node
{
    int val, sum, max;
    node *fa, *ch[2];
    bool rev;
    inline int dir() { return (this == 0 || fa == 0) ? -1 : this == fa->ch[1]; }
    bool isRoot() { return fa == 0 || (fa->ch[0] != this && fa->ch[1] != this); }
    int getsum() { return this == 0 ? 0 : sum; }
    int getmax() { return this == 0 ? -inf : max; }
} T[30050];
inline void push_down(node *x)
{
    if (x->rev)
    {
        swap(x->ch[0], x->ch[1]);
        if (x->ch[0]) x->ch[0]->rev ^= 1;
        if (x->ch[1]) x->ch[1]->rev ^= 1;
        x->rev = false;
    }
}
void push_down_rec(node *x)
{
    if (!x->isRoot()) push_down_rec(x->fa);
    push_down(x);
}
inline void update(node *x)
{
    if (x == 0) return;
    x->sum = x->ch[0]->getsum() + x->val + x->ch[1]->getsum();
    x->max = max(x->val, max(x->ch[0]->getmax(), x->ch[1]->getmax()));
}
inline void liftup(node *x)
{
    if (x == 0 || x->isRoot()) return;
    int d = x->dir();
    node *f = x->fa, *ff = f->fa, *c = x->ch[d ^ 1];
    if (!f->isRoot()) ff->ch[f->dir()] = x;
    x->fa = ff, f->fa = x, x->ch[d ^ 1] = f, f->ch[d] = c;
    if (c) c->fa = f;
    update(f), update(x);
}
inline void splay(node *x)
{
    push_down_rec(x);
    for (; !x->isRoot(); liftup(x))
        if (!x->fa->isRoot())
            liftup(x->dir() ^ x->fa->dir() ? x : x->fa);
    update(x);
}
inline void access(node *x)
{
    for (node *y = 0; x; y = x, x = x->fa)
    {
        splay(x), x->ch[1] = y;
        if (y) y->fa = x;
    }
}
inline node *findRoot(node *x)
{
    access(x), splay(x);
    while (push_down(x), x->ch[0]) x = x->ch[0];
    return splay(x), x;
}
inline void makeRoot(node *x)
{
    access(x), splay(x);
    x->rev ^= 1;
}
inline void Link(node *x, node *f)
{
    makeRoot(x), x->fa = f;
}
inline void Cut(node *x, node *y)
{
    makeRoot(x), access(y), splay(y);
    x->fa = y->ch[0] = 0;
}
inline node *Select(node *x, node *y)
{
    return makeRoot(x), findRoot(y);
}
inline void Change(node *x, int v)
{
    access(x), splay(x);
    x->val = v;
    update(x);
}
int main()
{
    int n, m;
    read(n);
    {
        static int u[30050], v[30050];
        for (int i = 1; i < n; i++) read(u[i]), read(v[i]);
        for (int i = 0; i < n; i++) read(T[i + 1].val), update(&T[i + 1]);
        for (int i = 1; i < n; i++) Link(&T[u[i]], &T[v[i]]);
    }
    int u, v;
    char op[10];
    read(m);
    while (m--)
    {
        scanf("%s", op);
        if (op[1] == 'M') //QMAX
            read(u), read(v), printf("%d\n", Select(&T[u], &T[v])->max);
        if (op[1] == 'S') //QSUM
            read(u), read(v), printf("%d\n", Select(&T[u], &T[v])->sum);
        if (op[1] == 'H') //CHANGE
            read(u), read(v), Change(&T[u], v);
    }
    return 0;
}
```
<div id="__comment"></div>
