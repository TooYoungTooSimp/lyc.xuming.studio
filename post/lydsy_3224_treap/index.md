---
template: post_with_netease
title: LYDSY 3224_TREAP
pageId: lydsy_3224_treap
---

# LYDSY 3224_TREAP

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cassert>
#include <cstdio>
#include <cstdlib>
#define sz(x) ((x) == 0 ? 0 : (x)->sz)
template <typename T>
struct Allocator
{
    int idx;
    T *data;
    T **ptr;
    Allocator(int size)
    {
        idx = 0;
        data = new T[size];
        ptr = new T *[size];
        for (int i = 0; i < size; i++) ptr[i] = &data[i];
    }
    ~Allocator()
    {
        delete[] data;
        delete[] ptr;
    }
    T *alloc() { return ptr[idx++]; }
    void free(T *pt) { ptr[--idx] = pt; }
};
struct Treap
{
    typedef struct Node
    {
        int val, pri, sz;
        Node *ch[2];
        void Init(int x = 0)
        {
            pri = rand();
            ch[0] = ch[1] = 0;
            val = x;
            sz = 1;
        }
        void update()
        {
            sz = 1 + sz(ch[0]) + sz(ch[1]);
        }
    } * lpNode;
    Treap(int max_size, int _seed)
    {
        srand(_seed);
        alloc = new Allocator<Node>(max_size);
        root = 0;
    }
    void ins(int x)
    {
        insert(root, x);
    }
    void del(int x)
    {
        remove(root, x);
    }
    int rnk(int x)
    {
        int ans = 1;
        lpNode cur = root;
        while (cur)
            if (x <= cur->val)
                cur = cur->ch[0];
            else
                ans += sz(cur->ch[0]) + 1, cur = cur->ch[1];
        return ans;
    }
    int kth(int x)
    {
        lpNode cur = root;
        while (cur)
            if (x == sz(cur->ch[0]) + 1)
                return cur->val;
            else if (x <= sz(cur->ch[0]))
                cur = cur->ch[0];
            else
                x -= sz(cur->ch[0]) + 1,
                    cur = cur->ch[1];
        return 0;
    }

private:
    Allocator<Node> *alloc;
    lpNode root;
    void rotate(lpNode &node, int d)
    {
        if (node == 0) return;
        lpNode ch = node->ch[d ^ 1];
        if (ch)
        {
            node->ch[d ^ 1] = ch->ch[d];
            ch->ch[d] = node;
            node = ch;
            node->ch[d]->update();
            node->update();
        }
    }
    void insert(lpNode &node, int x)
    {
        if (node == 0)
            (node = alloc->alloc())->Init(x);
        else
        {
            int cmp = x < node->val;
            insert(node->ch[cmp ^ 1], x);
            node->update();
            if (node->ch[cmp ^ 1]->pri < node->pri) rotate(node, cmp);
        }
    }
    void remove(lpNode &node, int x)
    {
        if (node == 0)
            return;
        else
        {
            if (x < node->val)
                remove(node->ch[0], x);
            else if (x > node->val)
                remove(node->ch[1], x);
            else if (node->ch[0] == 0)
                node = node->ch[1];
            else if (node->ch[1] == 0)
                node = node->ch[0];
            else
            {
                int d = node->ch[0]->pri < node->ch[1]->pri;
                rotate(node, d);
                remove(node->ch[d], x);
            }
            if (node) node->update();
        }
    }
};
int main()
{
    Treap T(100005, 3224);
    int n;
    scanf("%d", &n);
    for (int i = 0, op, x; i < n; i++)
    {
        scanf("%d%d", &op, &x);
        if (op == 1) T.ins(x);
        if (op == 2) T.del(x);
        if (op == 3) printf("%d\n", T.rnk(x));
        if (op == 4) printf("%d\n", T.kth(x));
        if (op == 5) printf("%d\n", T.kth(T.rnk(x) - 1));
        if (op == 6) printf("%d\n", T.kth(T.rnk(x + 1)));
    }
    return 0;
}
```
<div id="__comment"></div>
