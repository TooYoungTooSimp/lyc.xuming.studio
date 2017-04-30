---
template: post_with_netease
title: CODEFORCES ROUND #367 (DIV. 2) D
pageId: codeforces_round_#367_(div._2)_d
---

# CODEFORCES ROUND #367 (DIV. 2) D

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
inline int max(int a, int b) { return (a > b ? a : b); }
struct Node
{
    int size;
    Node *ch[2], *fa;
    Node() { fa = ch[0] = ch[1] = 0, size = 0; }
};
typedef Node *lpNode;
struct Trie
{
    lpNode root;
    Trie() : root(new Node()) {}
    void insert(int x)
    {
        lpNode cur = root;
        cur->size++;
        for (int i = 31; i >= 0; i--)
        {
            int id = (x >> i) & 1;
            if (cur->ch[id] == 0)
                cur->ch[id] = new Node(), cur->ch[id]->fa = cur;
            cur = cur->ch[id];
            cur->size++;
        }
    }
    void remove(int x)
    {
        lpNode cur = root;
        cur->size--;
        for (int i = 31; i >= 0; i--)
        {
            cur = cur->ch[(x >> i) & 1];
            cur->size--;
        }
        while (cur->fa != 0 && cur->size == 0)
            cur->fa->ch[cur == cur->fa->ch[1]] = 0, cur = cur->fa;
    }
    int query(int x)
    {
        x = ~x;
        int ans = 0;
        lpNode p = root;
        for (int i = 31; i >= 0; i--)
        {
            ans <<= 1;
            if ((x >> i) & 1 && p)
                if (p->ch[1])
                    p = p->ch[1], ans++;
                else
                    p = p->ch[0];
            else if (p->ch[0])
                p = p->ch[0];
            else
                p = p->ch[1], ans++;
        }
        return ans;
    }
};
int main()
{
    int q, tmp;
    char ch;
    Trie t;
    t.insert(0);
    scanf("%d", &q);
    for (int i = 0; i < q; i++)
    {
        ch = getchar();
        while (ch != '+' && ch != '-' && ch != '?') ch = getchar();
        scanf("%d", &tmp);
        if (ch == '+')
            t.insert(tmp);
        else if (ch == '-')
            t.remove(tmp);
        else if (ch == '?')
            printf("%d\n", t.query(tmp) ^ tmp);
    }
    return 0;
}
```
<div id="__comment"></div>
