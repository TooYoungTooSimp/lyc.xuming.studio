---
template: post_with_disqus
title: LYDSY 1500
pageId: lydsy_1500
---

# LYDSY 1500
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
template <typename T>
inline T max(const T &x, const T &y) { return x > y ? x : y; }
template <typename T>
inline void swap(T &x, T &y)
{
    T t = x;
    x = y;
    y = t;
}
char buf[1 << 24], *S;
inline void read(int &x)
{
    char ch = x = 0, flag = 1;
    while (!isdigit(ch = *S++))
        if (ch == '-') flag = -1;
    for (; isdigit(ch); ch = *S++) x = x * 10 + ch - '0';
    x *= flag;
}
inline char readop()
{
    while (!isupper(*S++))
        ;
    char *ret = ++S;
    S += 5;
    return *ret;
}
struct node
{
    int val, sum, mx, lx, rx, sz;
    node *fa, *ch[2];
    bool rev, tag;
    #define _get(x, y) \
    int get##x() { return this == 0 ? (y) : this->x; }
    _get(sum, 0) _get(mx, -inf) _get(lx, 0) _get(rx, 0) _get(sz, 0)
} *root;
struct
{
    int cnt;
    node pool[510010], *ptrs[510010];
    void init()
    {
        cnt = 0;
        for (int i = 0; i < 510010; i++) ptrs[i] = &pool[i];
    }
    inline node *alloc() { return ptrs[cnt++]; }
    inline void free(node *x) { ptrs[--cnt] = x; }
} mem;
int a[510010];
inline int dir(node *x)
{
    node *f = x->fa;
    if (f == 0)
        return -1;
    else
        return x == f->ch[1];
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
    x->mx = max(v, v * x->sz);
    x->lx = x->rx = max(0, x->mx);
    x->tag = true, x->rev = false;
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
inline void push_down_recursive(node *x)
{
    static node *stk[500010];
    int top = 0;
    while (x->fa) stk[top++] = (x = x->fa);
    while (top) push_down(stk[--top]);
}
inline void update(node *x)
{
    node *lc = x->ch[0], *rc = x->ch[1];
    x->sum = x->val + lc->getsum() + rc->getsum();
    x->sz = lc->getsz() + rc->getsz() + 1;
    x->mx = max(x->val, max(lc->getmx(), rc->getmx()));
    x->mx = max(x->mx, lc->getrx() + x->val + rc->getlx());
    x->lx = max(lc->getlx(), lc->getsum() + x->val + max(0, rc->getlx()));
    x->rx = max(rc->getrx(), rc->getsum() + x->val + max(0, lc->getrx()));
}
node *build_tree(int l, int r, node *f)
{
    node *newNode = mem.alloc();
    newNode->tag = newNode->rev = false;
    int m = l + ((r - l) >> 1);
    newNode->fa = f;
    newNode->val = newNode->lx = newNode->rx = a[m];
    newNode->ch[0] = l < m ? build_tree(l, m - 1, newNode) : 0;
    newNode->ch[1] = m < r ? build_tree(m + 1, r, newNode) : 0;
    update(newNode);
    return newNode;
}
inline void liftup(node *x)
{
    node *f = x->fa;
    if (f == 0) return;
    int d = dir(x);
    node *ff = f->fa, *c = x->ch[d ^ 1];
    if (ff == 0)
        root = x;
    else
        ff->ch[dir(f)] = x;
    x->fa = ff, f->fa = x, x->ch[d ^ 1] = f, f->ch[d] = c;
    if (c) c->fa = f;
    update(f), update(x);
}
inline void splay(node *x, node *target)
{
    if (x == 0) return;
    push_down_recursive(x);
    node *f = 0, *ff = 0;
    while ((f = x->fa) != target)
        if ((ff = f->fa) == target)
            liftup(x);
        else if (dir(x) ^ dir(f))
            liftup(x), liftup(x);
        else
            liftup(f), liftup(x);
}
inline void erase(node *x)
{
    if (x == 0) return;
    erase(x->ch[0]);
    erase(x->ch[1]);
    mem.free(x);
}
node *kth(node *x, int k)
{
    push_down(x);
    if (x->ch[0]->getsz() == k - 1)
        return x;
    else if (x->ch[0]->getsz() > k - 1)
        return kth(x->ch[0], k);
    else
        return kth(x->ch[1], k - x->ch[0]->getsz() - 1);
}
int main()
{
    fread(buf, 1, 1 << 24, stdin);
    S = buf;
    mem.init();
    int n, m;
    read(n), read(m);
    a[0] = a[n + 1] = -inf;
    for (int i = 1; i <= n; i++) read(a[i]);
    root = build_tree(0, n + 1, 0);
    while (m--)
    {
        char op = readop();
        if (op == 'S') //INSERT
        {
            int posi, tot;
            read(posi), read(tot);
            for (int i = 1; i <= tot; i++) read(a[i]);
            splay(kth(root, posi + 1), 0);
            splay(kth(root->ch[1], 1), root);
            root->ch[1]->ch[0] = build_tree(1, tot, root->ch[1]);
            update(root->ch[1]), update(root);
        }
        if (op == 'L') //DELETE
        {
            int posi, tot;
            read(posi), read(tot);
            splay(kth(root, posi), 0);
            splay(kth(root->ch[1], tot + 1), root);
            erase(root->ch[1]->ch[0]);
            root->ch[1]->ch[0] = 0;
            update(root->ch[1]), update(root);
        }
        if (op == 'K') //MAKE-SAME
        {
            int posi, tot, val;
            read(posi), read(tot), read(val);
            splay(kth(root, posi), 0);
            splay(kth(root->ch[1], tot + 1), root);
            set_tree(root->ch[1]->ch[0], val);
            update(root->ch[1]), update(root);
        }
        if (op == 'V') //REVERSE
        {
            int posi, tot;
            read(posi), read(tot);
            splay(kth(root, posi), 0);
            splay(kth(root->ch[1], tot + 1), root);
            rev_tree(root->ch[1]->ch[0]);
            update(root->ch[1]), update(root);
        }
        if (op == 'T') //GET-SUM
        {
            int posi, tot;
            read(posi), read(tot);
            splay(kth(root, posi), 0);
            splay(kth(root->ch[1], tot + 1), root);
            printf("%d\n", root->ch[1]->ch[0]->getsum());
        }
        if (op == 'X') //MAX-SUM
        {
            printf("%d\n", root->getmx());
        }
    }
    return 0;
}
```
<div id="__comment"></div>
