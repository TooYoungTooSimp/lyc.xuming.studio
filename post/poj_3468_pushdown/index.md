---
template: post_with_netease
title: POJ 3468_PUSHDOWN
pageId: poj_3468_pushdown
---

# POJ 3468_PUSHDOWN

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cctype>
#define C(x) (x = getchar())
#define L(x) ((x) << 1)
#define R(x) ((x) << 1 | 1)
#define avg(x, y) (((x) + (y)) >> 1)
inline void read(int &x)
{
    int ch = x = 0, flag = 1;
    while (!isdigit(C(ch))) if (ch == '-') flag = -1;
    for (; isdigit(ch); C(ch))
        x = x * 10 + ch - '0';
    x *= flag;
}
const int N = int(1e5 + 5);
typedef long long i64;
int a[N];
i64 A[N << 2], S[N << 2];
inline void add(int k, int l, int r, i64 v)
{
    A[k] += v;
    S[k] += (r - l) * v;
}
inline void pushdown(int k, int l, int r)
{
    if (A[k] == 0) return;
    int m = avg(l, r);
    add(L(k), l, m, A[k]);
    add(R(k), m, r, A[k]);
    A[k] = 0;
}
void build(int k, int l, int r)
{
    if (l == r - 1) return void(S[k] = a[l]);
    int m = avg(l, r);
    build(L(k), l, m);
    build(R(k), m, r);
    S[k] = S[L(k)] + S[R(k)];
}
i64 query(int k, int l, int r, int x, int y)
{
    if (x <= l && r <= y) return S[k];
    pushdown(k, l, r);
    int m = avg(l, r);
    i64 res = 0;
    if (x < m) res += query(L(k), l, m, x, y);
    if (y > m) res += query(R(k), m, r, x, y);
    return res;
}
void modify(int k, int l, int r, int x, int y, int v)
{
    if (x <= l && r <= y) return add(k, l, r, v);
    int m = avg(l, r);
    pushdown(k, l, r);
    if (x < m) modify(L(k), l, m, x, y, v);
    if (y > m) modify(R(k), m, r, x, y, v);
    S[k] = S[L(k)] + S[R(k)];
}
int main()
{
    int n, m;
    read(n), read(m);
    for (int i = 0; i < n; i++) read(a[i]);
    build(1, 0, n);
    while (m--)
    {
        int op = 0, x, y, z;
        while (op != 'Q' && op != 'C') C(op);
        if (op == 'Q')
        {
            read(x), read(y);
            printf("%lld\n", query(1, 0, n, x - 1, y));
        }
        else
        {
            read(x), read(y), read(z);
            modify(1, 0, n, x - 1, y, z);
        }
    }
    return 0;
}
```
<div id="__comment"></div>
