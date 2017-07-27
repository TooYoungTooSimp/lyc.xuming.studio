---
template: post_with_disqus
title: CODEFORCES ROUND #367 (DIV. 2) A
pageId: codeforces_round_#367_(div._2)_a
---

# CODEFORCES ROUND #367 (DIV. 2) A
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cmath>
#include <cstdio>
int main()
{
    int n, x0, y0, x, y, v;
    double ans = 1e16, tmp;
    scanf("%d%d%d", &x0, &y0, &n);
    for (int i = 0; i < n; i++)
    {
        scanf("%d%d%d", &x, &y, &v);
        x -= x0;
        y -= y0;
        tmp = sqrt(x * x + y * y) / v;
        if (tmp < ans) ans = tmp;
    }
    printf("%.10lf", ans);
    return 0;
}
```
<div id="__comment"></div>
