---
template: post_with_netease
title: LYDSY 2049
pageId: lydsy_2049
---

# LYDSY 2049

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
template <typename T>
inline void swap(T &x, T &y)
{
    T t = x;
    x = y;
    y = t;
}
inline void read(int &x)
{
    int ch = x = 0;
    while (!isdigit(ch)) ch = getchar();
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
}
struct node
{
    bool rev;
    node *fa, *ch[2];
    int dir() { return fa == 0 ? -1 : this == fa->ch[1]; }
    bool isRoot() { return fa == 0 || (fa->ch[0] != this && fa->ch[1] != this); }
} T[10001];
inline void push_down(node *x)
{
    if (x == 0) return;
    if (x->rev)
    {
        swap(x->ch[0], x->ch[1]);
        if (x->ch[0]) x->ch[0]->rev ^= 1;
        if (x->ch[1]) x->ch[1]->rev ^= 1;
        x->rev = false;
    }
}
void push_down_recursive(node *x)
{
    if (!x->isRoot()) push_down_recursive(x->fa);
    push_down(x);
}
inline void liftup(node *x)
{
    if (x == 0 || x->isRoot()) return;
    int d = x->dir();
    node *f = x->fa, *ff = f->fa, *c = x->ch[d ^ 1];
    if (ff && !f->isRoot()) ff->ch[f->dir()] = x;
    x->fa = ff, f->fa = x, x->ch[d ^ 1] = f, f->ch[d] = c;
    if (c) c->fa = f;
}
inline void Splay(node *x)
{
    push_down_recursive(x);
    for (; !x->isRoot(); liftup(x))
        if (!x->fa->isRoot())
            liftup((x->dir() ^ x->fa->dir()) ? x : x->fa);
}
inline void access(node *x)
{
    for (node *y = 0; x; y = x, x = x->fa)
    {
        Splay(x), x->ch[1] = y;
        if (y) y->fa = x;
    }
}
inline node *findRoot(node *x)
{
    access(x), Splay(x);
    while (push_down(x), x->ch[0]) x = x->ch[0];
    Splay(x);
    return x;
}
inline void makeRoot(node *x)
{
    access(x), Splay(x);
    x->rev ^= 1;
}
inline void Link(node *x, node *f)
{
    makeRoot(x);
    x->fa = f;
}
inline void Cut(node *x, node *y)
{
    makeRoot(x), access(y), Splay(y);
    x->fa = y->ch[0] = 0;
}
int main()
{
    int n, m, u, v;
    read(n), read(m);
    while (m--)
    {
        int op = getchar();
        while (!isupper(op)) op = getchar();
        read(u), read(v);
        if (op == 'Q')
            puts(findRoot(&T[u]) == findRoot(&T[v]) ? "Yes" : "No");
        if (op == 'C')
            Link(&T[u], &T[v]);
        if (op == 'D')
            Cut(&T[u], &T[v]);
    }
    return 0;
}
```
