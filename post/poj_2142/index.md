---
template: post_with_isso
title: POJ 2142
pageId: poj_2142
---

# POJ 2142
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
inline int abs(int x) { return x >= 0 ? x : -x; }
void exgcd(int a, int b, int &d, int &x, int &y) { !b ? (x = 1, y = 0, d = a) : (exgcd(b, a % b, d, y, x), y -= x * (a / b)); }
int main()
{
    int a, b, c, x, y, g, u1, v1, u2, v2;
    while (~scanf("%d%d%d", &a, &b, &c) && a + b + c)
    {
        exgcd(a, b, g, x, y);
        a /= g, b /= g, c /= g;
        u1 = (x % b * c % b + b) % b;
        v1 = abs((c - u1 * a) / b);
        v2 = (y % a * c % a + a) % a;
        u2 = abs((c - v2 * b) / a);
        if (u1 + v1 > u2 + v2 || (u1 + v1 == u2 + v2 && a * u1 + b * v1 > a * u2 + b * v2)) u1 = u2, v1 = v2;
        printf("%d %d\n", u1, v1);
    }
    return 0;
}
```
<div id="__comment"></div>
