---
template: post_with_disqus
title: LYDSY 3224_SPLAY
pageId: lydsy_3224_splay
---

# LYDSY 3224_SPLAY
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstdlib>
#define sz(x) (x == 0 ? 0 : x->size)
#define update(x) \
    if (x) x->size = sz(x->child[0]) + sz(x->child[1]) + 1
#define getVal(x) (x == 0 ? 0 : x->val)
typedef int valType;
const int arrSize = 100005;
struct Node
{
    valType val;
    int size;
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
    allocator(int size)
    {
        this->i = 0;
        for (int j = 0; j < size; j++) pt[j] = data + j;
    }
    lpNode alloc(int x, lpNode f)
    {
        lpNode newNode = pt[i++];
        newNode->val = x;
        newNode->father = f;
        newNode->size = 1;
        newNode->child[0] = newNode->child[1] = 0;
        return newNode;
    }
    void free(lpNode ptr) { pt[--i] = ptr; }
};
lpNode root = 0;
allocator *mem;
struct SplayTree
{
private:
    void rotate(lpNode x)
    {
        if (x == 0 || x->father == 0) return;
        int d = (x == x->father->child[0]);
        lpNode y = x->father;
        y->child[!d] = x->child[d];
        if (x->child[d]) x->child[d]->father = y;
        x->father = y->father;
        if (y->father) y->father->child[y == y->father->child[1]] = x;
        y->father = x;
        x->child[d] = y;
        update(y);
        update(x);
    }
    void Splay(lpNode x, lpNode &target)
    {
        lpNode targetFather = target->father;
        while (x->father != targetFather)
            if (x->father == target)
                rotate(x);
            else if ((x->father->father->child[0] == x->father) == (x->father->child[0] == x))
                rotate(x->father), rotate(x);
            else
                rotate(x), rotate(x);
        target = x;
    }
    lpNode find(int x)
    {
        lpNode s = root;
        while (true)
            if (s == 0)
                return 0;
            else if (s->val == x)
            {
                Splay(s, root);
                return s;
            }
            else
                s = s->child[x > s->val];
    }
    lpNode join(lpNode x, lpNode y)
    {
        if (x == 0)
            return y;
        else
        {
            lpNode m = max_min(x, 1);
            Splay(m, x);
            m->child[1] = y;
            if (y) y->father = m;
            return x;
        }
    }

public:
    SplayTree(int _) { mem = new allocator(_); }
    lpNode max_min(lpNode x, int i)
    {
        while (x && x->child[i]) x = x->child[i];
        return x;
    }
    void insert(int x)
    {
        if (root == 0)
            root = mem->alloc(x, 0);
        else
        {
            lpNode s = root, p = 0;
            while (s)
                p = s, s = s->child[x > s->val];
            s = mem->alloc(x, p);
            p->child[x > p->val] = s;
            Splay(s, root);
        }
    }
    void remove(int x)
    {
        lpNode p = find(x);
        if (p)
        {
            root = join(p->child[0], p->child[1]);
            root->father = 0;
            mem->free(p);
        }
    }
    int rank(int x)
    {
        lpNode s = root;
        int ans = 0;
        while (s)
            if (x <= s->val)
                s = s->child[0];
            else
                ans = ans + 1 + sz(s->child[0]), s = s->child[1];
        return ans + 1;
    }
    lpNode select(int x)
    {
        lpNode s = root;
        while (s)
            if (x == sz(s->child[0]) + 1)
                return s;
            else if (x <= sz(s->child[0]))
                s = s->child[0];
            else
                x = x - 1 - sz(s->child[0]), s = s->child[1];
        return 0;
    }
    lpNode pred(int x)
    {
        lpNode s = root, ans = 0;
        while (s)
            if (s->val < x)
                ans = s, s = s->child[1];
            else
                s = s->child[0];
        return ans;
    }
    lpNode succ(int x)
    {
        lpNode s = root, ans = 0;
        while (s)
            if (s->val > x)
                ans = s, s = s->child[0];
            else
                s = s->child[1];
        return ans;
    }
};
int main()
{
    SplayTree st(arrSize);
    int n, op, num;
    scanf("%d", &n);
    for (int i = 0; i < n; i++)
    {
        scanf("%d%d", &op, &num);
        switch (op)
        {
        case 1:
            st.insert(num);
            break;
        case 2:
            st.remove(num);
            break;
        case 3:
            printf("%d\n", st.rank(num));
            break;
        case 4:
            printf("%d\n", getVal(st.select(num)));
            break;
        case 5:
            printf("%d\n", getVal(st.pred(num)));
            break;
        case 6:
            printf("%d\n", getVal(st.succ(num)));
            break;
        default:
            break;
        }
    }
    return 0;
}

```
<div id="__comment"></div>
