---
template: post_with_netease
title: LYDSY 2002
pageId: lydsy_2002
---

# LYDSY 2002

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
template <typename T>
inline T min(const T &x, const T &y) { return x < y ? x : y; }
template <typename T>
inline void swap(T &x, T &y)
{
    T t = x;
    x = y;
    y = t;
}
int K[200020];
struct node
{
    int sz;
    bool rev;
    node *ch[2], *fa;
    int dir() { return this == 0 || this->fa == 0 ? -1 : this == this->fa->ch[1]; }
    bool isRoot() { return this->fa == 0 || (this != this->fa->ch[0] && this != this->fa->ch[1]); }
} T[200020];
inline void update(node *x)
{
    x->sz = 1;
    if (x->ch[0]) x->sz += x->ch[0]->sz;
    if (x->ch[1]) x->sz += x->ch[1]->sz;
}
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
inline void makeRoot(node *x)
{
    access(x), splay(x), x->rev ^= 1;
}
inline node *findRoot(node *x)
{
    access(x), splay(x);
    while (push_down(x), x->ch[0]) x = x->ch[0];
    return splay(x), x;
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
    int n, m, op;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", K + i);
    for (int i = 0; i < n; i++) Link(&T[i], &T[min(i + K[i], n)]);
    scanf("%d", &m);
    while (m--)
    {
        scanf("%d", &op);
        if (op == 1)
        {
            int x;
            scanf("%d", &x);
            makeRoot(&T[n]);
            access(&T[x]), splay(&T[x]);
            printf("%d\n", T[x].ch[0] ? T[x].ch[0]->sz : 0);
        }
        if (op == 2)
        {
            int x, y;
            scanf("%d%d", &x, &y);
            Cut(&T[x], &T[min(x + K[x], n)]);
            K[x] = y;
            Link(&T[x], &T[min(x + K[x], n)]);
        }
    }
    return 0;
}
```
<div id="__comment"></div>
