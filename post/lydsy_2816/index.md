---
template: post_with_disqus
title: LYDSY 2816
pageId: lydsy_2816
---

# LYDSY 2816
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
#include <algorithm>
#include <map>
using namespace std;
struct node
{
    int val, max;
    bool rev;
    node *ch[2], *fa;
    bool isRoot() { return this->fa == 0 || (this != this->fa->ch[0] && this != this->fa->ch[1]); }
    int dir() { return this == 0 || this->isRoot() ? -1 : this == this->fa->ch[1]; }
} T[12][10010];
inline void update(node *x)
{
    x->max = x->val;
    if (x->ch[0]) x->max = max(x->max, x->ch[0]->max);
    if (x->ch[1]) x->max = max(x->max, x->ch[1]->max);
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
        if (x->fa->isRoot())
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
    access(x), splay(x);
    x->rev ^= 1;
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
inline void Change(node *x, int v)
{
    access(x), splay(x);
    x->val = v;
    update(x);
}
map<pair<int, int>, int> col;
int sum[10001][12];
int main()
{
    int n, m, c, k;
    scanf("%d%d%d%d", &n, &m, &c, &k);
    for (int i = 1, v; i <= n; i++)
    {
        scanf("%d", &v);
        for (int j = 0; j < c; j++) T[j][i].val = T[j][i].max = v;
    }
    for (int i = 1, u, v, w; i <= m; i++)
    {
        scanf("%d%d%d", &u, &v, &w);
        if (u > v) swap(u, v);
        col[make_pair(u, v)] = w;
        sum[u][w]++, sum[v][w]++;
        Link(&T[w][u], &T[w][v]);
    }
    for (int i = 1, op; i <= k; i++)
    {
        scanf("%d", &op);
        if (op == 0)
        {
            int x, v;
            scanf("%d%d", &x, &v);
            for (int j = 0; j < c; j++)
                Change(&T[j][x], v);
        }
        if (op == 1)
        {
            int u, v, w;
            scanf("%d%d%d", &u, &v, &w);
            if (u > v) swap(u, v);
            pair<int, int> p = make_pair(u, v);
            if (col.count(p) == 0)
                puts("No such edge.");
            else if (col[p] == w)
                puts("Success.");
            else if (sum[u][w] >= 2 || sum[v][w] >= 2)
                puts("Error 1.");
            else if (findRoot(&T[w][u]) == findRoot(&T[w][v]))
                puts("Error 2.");
            else
            {
                int ow = col[p];
                col[p] = w;
                Cut(&T[ow][u], &T[ow][v]);
                Link(&T[w][u], &T[w][v]);
                sum[u][w]++, sum[v][w]++;
                sum[u][ow]--, sum[v][ow]--;
                puts("Success.");
            }
        }
        if (op == 2)
        {
            int w, u, v;
            scanf("%d%d%d", &w, &u, &v);
            if (findRoot(&T[w][u]) != findRoot(&T[w][v]))
                puts("-1");
            else
                printf("%d\n", Select(&T[w][u], &T[w][v])->max);
        }
    }
    return 0;
}
```
<div id="__comment"></div>
