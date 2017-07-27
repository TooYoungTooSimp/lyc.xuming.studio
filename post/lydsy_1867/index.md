---
template: post_with_disqus
title: LYDSY 1867
pageId: lydsy_1867
---

# LYDSY 1867
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <iostream>
typedef unsigned long long int64;
inline int64 gcd(int64 a, int64 b)
{
    int64 tmp;
    if (a < b) {
        tmp = a;
        a = b;
        b = tmp;
    } //make sure a>b
    while (b)
    {
        tmp = b;
        b = a % b;
        a = tmp;
    }
    return a;
}
int64 a[51][51];
char c[51][51];
int n, m;
void calc(int i, int j)
{
    if (j > i || i >= n)
        return;
    else
    {
        if (c[i][j] == '*')
        {
            a[i + 1][j] += (a[i][j] / 2);
            a[i + 1][j + 1] += (a[i][j] / 2);
        }
        else if (c[i][j] == '.')
        {
            a[i + 2][j + 1] += a[i][j];
        }
        else
            return;
    }
}
int main()
{
    scanf("%d%d", &n, &m);
    int64 total = (1ULL << n);
    for (int i = 0; i < n; i++)
        for (int j = 0; j <= i; j++)
            std::cin >> c[i][j];
    a[0][0] = total;
    for (int i = 0; i < n; i++)
        for (int j = 0; j <= i; j++)
            calc(i, j);
    int64 k = gcd(a[n][m], total);
    printf("%lld/%lld", a[n][m] / k, total / k);
    return 0;
}

```
<div id="__comment"></div>
