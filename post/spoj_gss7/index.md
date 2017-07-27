---
template: post_with_disqus
title: SPOJ GSS7
pageId: spoj_gss7
---

# SPOJ GSS7
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
template <typename T>
inline T max(const T &x, const T &y) { return x > y ? x : y; }
template <typename T>
inline void swap(T &x, T &y)
{
    T t = x;
    x = y;
    y = t;
}
struct node
{
    int val, lx, rx, mx, sum, sz;
    node *ch[2], *fa;
    bool rev, tag;
    int dir() { return this == 0 || this->fa == 0 ? -1 : this == this->fa->ch[1]; }
    bool isRoot() { return this->fa == 0 || (this != this->fa->ch[0] && this != this->fa->ch[1]); }
#define _get(x, v) \
    int get##x() { return this == 0 ? 0 : max(v, this->x); }
    _get(lx, 0) _get(rx, 0) _get(mx, 0) _get(sum, -0x3f3f3f3f) _get(sz, 0)
};
inline void update(node *x)
{
    if (x == 0) return;
    node *lc = x->ch[0], *rc = x->ch[1];
    x->sz = lc->getsz() + 1 + rc->getsz();
    x->sum = x->val + lc->getsum() + rc->getsum();
    x->mx = max(x->val, max(lc->getmx(), rc->getmx()));
    x->mx = max(x->mx, lc->getrx() + x->val + rc->getlx());
    x->lx = max(lc->getlx(), lc->getsum() + x->val + rc->getlx());
    x->rx = max(rc->getrx(), rc->getsum() + x->val + lc->getrx());
}
inline void rev_tree(node *x)
{
    if (x == 0) return;
    swap(x->lx, x->rx);
    swap(x->ch[0], x->ch[1]);
    x->rev ^= 1;
}
inline void set_tree(node *x, int v)
{
    if (x == 0) return;
    x->sum = x->sz * (x->val = v);
    x->lx = x->rx = x->mx = max(0, x->sum);
    x->tag = true;
}
inline void push_down(node *x)
{
    if (x == 0) return;
    if (x->rev)
    {
        if (x->ch[0]) rev_tree(x->ch[0]);
        if (x->ch[1]) rev_tree(x->ch[1]);
        x->rev = false;
    }
    if (x->tag)
    {
        if (x->ch[0]) set_tree(x->ch[0], x->val);
        if (x->ch[1]) set_tree(x->ch[1], x->val);
        x->tag = false;
    }
}
void push_down_rec(node *x)
{
    if (!x->isRoot()) push_down_rec(x->fa);
    push_down(x);
}
inline void liftup(node *x)
{
    if (x == 0 || x->isRoot()) return;
    int d = x->dir();
    node *f = x->fa, *ff = f->fa, *c = x->ch[d ^ 1];
    if (!f->isRoot()) ff->ch[f->dir()] = x;
    f->fa = x, x->fa = ff, x->ch[d ^ 1] = f, f->ch[d] = c;
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
inline node *access(node *x)
{
    node *y = 0;
    for (; x; y = x, x = x->fa)
    {
        splay(x), x->ch[1] = y;
        if (y) y->fa = x;
    }
    return y;
}
inline node *findRoot(node *x)
{
    access(x), splay(x);
    while (push_down(x), x->ch[0]) x = x->ch[0];
    return splay(x), x;
}
inline void makeRoot(node *x)
{
    access(x), splay(x), rev_tree(x);
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
int main()
{
    static node T[100010];
    int n, q;
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) scanf("%d", &T[i].val), update(&T[i]);
    for (int i = 1, u, v; i < n; i++)
        scanf("%d%d", &u, &v), Link(&T[u], &T[v]);
    scanf("%d", &q);
    while (q--)
    {
        int op, a, b, c;
        scanf("%d%d%d", &op, &a, &b);
        node *target = Select(&T[a], &T[b]);
        if (op == 1)
            printf("%d\n", target->getmx());
        if (op == 2)
            scanf("%d", &c), set_tree(target, c);
    }
    return 0;
}

```
<div id="__comment"></div>
