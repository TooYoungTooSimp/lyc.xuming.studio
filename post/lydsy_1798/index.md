---
template: post_with_netease
title: LYDSY 1798
pageId: lydsy_1798
---

# LYDSY 1798

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
template <typename T>
inline void read(T &x)
{
    int ch = 0, flag = 1;
    x = 0;
    while (!isdigit(ch = getchar()))
        if (ch == '-') flag = -1;
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
    x *= flag;
}
const int N = 100010;
typedef long long i64;
i64 sum[N << 2], add[N << 2], mul[N << 2], a[N], ha;
#define avg(x, y) (x + ((y - x) >> 1))
#define L(x) ((x) << 1)
#define R(x) ((x) << 1 | 1)
inline void update(int x)
{
    sum[x] = (sum[L(x)] + sum[R(x)]) % ha;
}
void build(int k, int l, int r)
{
    mul[k] = 1;
    if (l == r - 1) return sum[k] = a[l], void();
    int m = avg(l, r);
    build(L(k), l, m);
    build(R(k), m, r);
    update(k);
}
inline void push_down(int k, int l, int r)
{
    if (l == r - 1) return;
    if (mul[k] != 1)
    {
        add[L(k)] = add[L(k)] * mul[k] % ha;
        add[R(k)] = add[R(k)] * mul[k] % ha;
        mul[L(k)] = mul[L(k)] * mul[k] % ha;
        mul[R(k)] = mul[R(k)] * mul[k] % ha;
        sum[L(k)] = sum[L(k)] * mul[k] % ha;
        sum[R(k)] = sum[R(k)] * mul[k] % ha;
        mul[k] = 1;
    }
    if (add[k] != 0)
    {
        int m = avg(l, r);
        sum[L(k)] = (sum[L(k)] + add[k] * (m - l)) % ha;
        sum[R(k)] = (sum[R(k)] + add[k] * (r - m)) % ha;
        add[L(k)] = (add[L(k)] + add[k]) % ha;
        add[R(k)] = (add[R(k)] + add[k]) % ha;
        add[k] = 0;
    }
}
void update_add(int k, int l, int r, int x, int y, int v)
{
    if (x <= l && r <= y)
    {
        add[k] = (add[k] + v) % ha;
        sum[k] = (sum[k] + v * (r - l)) % ha;
    }
    else
    {
        push_down(k, l, r);
        int m = avg(l, r);
        if (x < m) update_add(L(k), l, m, x, y, v);
        if (y > m) update_add(R(k), m, r, x, y, v);
        update(k);
    }
}
void update_mul(int k, int l, int r, int x, int y, int v)
{
    if (x <= l && r <= y)
    {
        mul[k] = (mul[k] * v) % ha;
        add[k] = (add[k] * v) % ha;
        sum[k] = (sum[k] * v) % ha;
    }
    else
    {
        push_down(k, l, r);
        int m = avg(l, r);
        if (x < m) update_mul(L(k), l, m, x, y, v);
        if (y > m) update_mul(R(k), m, r, x, y, v);
        update(k);
    }
}
i64 query(int k, int l, int r, int x, int y)
{
    push_down(k, l, r);
    if (x <= l && r <= y)
        return sum[k] % ha;
    else
    {
        int m = avg(l, r);
        i64 ret = 0;
        if (x < m) ret += query(L(k), l, m, x, y);
        if (y > m) ret += query(R(k), m, r, x, y);
        return ret % ha;
    }
}
int main()
{
    int n, q;
    read(n), read(ha);
    for (int i = 0; i < n; i++) read(a[i]);
    build(1, 0, n);
    read(q);
    while (q--)
    {
        int op, t, g, c;
        read(op), read(t), read(g), t--;
        if (op == 1)
            read(c), update_mul(1, 0, n, t, g, c);
        if (op == 2)
            read(c), update_add(1, 0, n, t, g, c);
        if (op == 3)
            printf("%lld\n", query(1, 0, n, t, g));
    }
    return 0;
}
```
<div id="__comment"></div>
