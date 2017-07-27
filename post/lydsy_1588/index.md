---
template: post_with_disqus
title: LYDSY 1588
pageId: lydsy_1588
---

# LYDSY 1588
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstdlib>
static const int arrSize = 40000;
typedef int valType;
struct Node
{
    valType val;
    Node *child[2], *father;
};
typedef Node *lpNode;
struct allocator
{
private:
    int i;
    Node data[arrSize];
    lpNode pt[arrSize];

public:
    allocator()
    {
        this->i = 0;
        for (int j = 0; j < arrSize; j++) pt[j] = data + j;
    }
    lpNode alloc() { return pt[i++]; }
    void free(lpNode ptr) { pt[--i] = ptr; }
} mem;
void rotate(lpNode x, int direction)
{
    lpNode p = x->father;
    p->child[!direction] = x->child[direction];
    if (x->child[direction]) x->child[direction]->father = p;
    x->father = p->father;
    if (p->father) p->father->child[p != p->father->child[0]] = x;
    p->father = x;
    x->child[direction] = p;
}
void Splay(lpNode x, lpNode target)
{
    lpNode p;
    target = target->father;
    while (x->father != target)
    {
        p = x->father;
        if (p->father == target)
        {
            rotate(x, x == p->child[0]);
            break;
        }
        else if (x == p->child[0])
            if (p == p->father->child[0]) {
                rotate(p, 1);
                rotate(x, 1);
            }
            else
            {
                rotate(x, 1);
                rotate(x, 0);
            }
        else if (p == p->father->child[1])
        {
            rotate(p, 0);
            rotate(x, 0);
        }
        else
        {
            rotate(x, 0);
            rotate(x, 1);
        }
    }
}
lpNode max(lpNode x)
{
    while (x && x->child[1]) x = x->child[1];
    return x;
}
lpNode min(lpNode x)
{
    while (x && x->child[0]) x = x->child[0];
    return x;
}
lpNode find(valType x, lpNode s)
{
    lpNode p = s;
    while (true)
        if (p == 0)
            return p;
        else if (p->val == x)
        {
            Splay(p, s);
            return p;
        }
        else
            p = p->child[x > p->val];
}
lpNode pred(valType x, lpNode s) { return max(find(x, s)->child[0]); }
lpNode succ(valType x, lpNode s) { return min(find(x, s)->child[1]); }
void ins(valType x, lpNode &s)
{
    if (s == 0)
    {
        s = mem.alloc();
        s->val = x;
    }
    else
    {
        lpNode p = 0, _s = s;
        while (s)
        {
            p = s;
            s = s->child[x > s->val];
        }
        if (p == 0)
            s->val = x;
        else
        {
            lpNode n = mem.alloc();
            n->val = x;
            n->father = p;
            p->child[x > p->val] = n;
            s = _s;
            Splay(n, s);
            s = n;
        }
    }
}
valType _min(valType a, valType b) { return (a < b ? a : b); }
lpNode root = 0;
int main()
{
    int n, tmp, ans = 0;
    scanf("%d", &n);
    for (int i = 0; i < n; i++)
    {
        scanf("%d", &tmp);
        ins(tmp, root);
        if (i == 0)
            ans += tmp;
        else
        {
            lpNode p = pred(tmp, root), s = succ(tmp, root);
            if (p == 0)
                ans += abs(tmp - s->val);
            else if (s == 0)
                ans += abs(tmp - p->val);
            else
                ans += _min(abs(tmp - s->val), abs(tmp - p->val));
        }
    }
    printf("%d", ans);
    return 0;
}

```
<div id="__comment"></div>
