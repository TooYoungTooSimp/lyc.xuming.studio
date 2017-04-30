---
template: post_with_netease
title: POJ 3468_PERSISTENTTAG
pageId: poj_3468_persistenttag
---

# POJ 3468_PERSISTENTTAG

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
#define C(x) ((x) = getchar())
#define L(x) ((x) << 1)
#define R(x) ((x) << 1 | 1)
#define avg(x, y) (((x) + (y)) >> 1)
typedef long long i64;
inline int max(int a, int b) { return a > b ? a : b; }
inline int min(int a, int b) { return a < b ? a : b; }
inline void read(int &x)
{
    int ch = x = 0, sign = 1;
    while (!isdigit(C(ch))) if (ch == '-') sign = -1;
    for (; isdigit(ch); C(ch))
        x = x * 10 + ch - '0';
    x *= sign;
}
const int N = int(1e5 + 5);
i64 add[N << 2], sum[N << 2];
int a[N];
void build(int k, int l, int r)
{
    if (l == r - 1) return void(sum[k] = a[l]);
    int m = avg(l, r);
    build(L(k), l, m);
    build(R(k), m, r);
    sum[k] = sum[L(k)] + sum[R(k)];
}
void modify(int k, int l, int r, int x, int y, int v)
{
    if (x <= l && r <= y)
        return void(add[k] += v);
    sum[k] += 1ll * (min(r, y) - max(l, x)) * v;
    int m = avg(l, r);
    if (x < m) modify(L(k), l, m, x, y, v);
    if (y > m) modify(R(k), m, r, x, y, v);
}
i64 query(int k, int l, int r, int x, int y)
{
    if (x <= l && r <= y)
        return sum[k] + (r - l) * add[k];
    int m = avg(l, r);
    i64 res = add[k] * (min(r, y) - max(l, x));
    if (x < m) res += query(L(k), l, m, x, y);
    if (y > m) res += query(R(k), m, r, x, y);
    return res;
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
        while (op != 'C' && op != 'Q') C(op);
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
    return  0;
}
```
<div id="__comment"></div>
