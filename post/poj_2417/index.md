---
template: post_with_netease
title: POJ 2417
pageId: poj_2417
---

# POJ 2417

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cmath>
#include <cstdio>
#include <cstring>
typedef long long i64;
void exgcd(i64 a, i64 b, i64 &x, i64 &y)
{
    b == 0 ? (x = 1, y = 0) : (exgcd(b, a % b, y, x), y -= (a / b) * x);
}
struct HashTable
{
    static const size_t sz = 500009;
    i64 idx[sz], val[sz];
    void init()
    {
        memset(idx, -1, sizeof(idx));
        memset(val, -1, sizeof(val));
    }
    void insert(i64 i, i64 v)
    {
        i64 j = i % sz;
        while (idx[j] != -1 && idx[j] != i)
        {
            j++;
            if (j == sz)
                j = 0;
        }
        if (val[j] == -1)
        {
            idx[j] = i;
            val[j] = v;
        }
    }
    i64 find(i64 i)
    {
        i64 j = i % sz;
        while (idx[j] != -1 && idx[j] != i)
        {
            j++;
            if (j == sz)
                j = 0;
        }
        return val[j];
    }
} H;
int main()
{
    for (i64 a, b, c; ~scanf("%lld%lld%lld", &c, &a, &b) && a | b | c;)
    {
        H.init();
        i64 m = i64(ceil(sqrt(c))), d = 1;
        for (int i = 0; i < m; i++, d = d * a % c)
            H.insert(d, i);
        i64 res = 1, x, y;
        bool flag = false;
        for (i64 i = 0; i < m && !flag; i++, res = res * d % c)
        {
            exgcd(res, c, x, y);
            x = (x * b % c + c) % c;
            i64 j = H.find(x);
            if (j != -1)
                printf("%lld\n", i * m + j), flag = true;
        }
        if (!flag)
            puts("no solution");
    }
    return 0;
}
```
<div id="__comment"></div>
