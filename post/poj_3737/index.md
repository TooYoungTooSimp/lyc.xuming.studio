---
template: post_with_netease
title: POJ 3737
pageId: poj_3737
---

# POJ 3737
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cmath>
#include <cstdio>
const double pi = acos(-1.0), eps = 1e-6;
double S;
inline double calc(double r)
{
    double l = (S - r * r) / r;
    double h = sqrt(l * l - r * r);
    return pi * r * r * h / 3;
}
int main()
{
    while (~scanf("%lf", &S))
    {
        S /= pi;
        double l = 0, r = sqrt(S), m1, m2, d;
        while ((d = r - l) > eps)
            calc(m1 = l + d / 3) < calc(m2 = r - d / 3) ? l = m1 : r = m2;
        l = (S - r * r) / r;
        double h = sqrt(l * l - r * r);
        double V = pi * r * r * h / 3;
        printf("%.2f\n%.2f\n%.2f\n", V, h, r);
    }
    return 0;
}
```
<div id="__comment"></div>
