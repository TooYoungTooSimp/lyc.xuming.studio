---
template: post_with_netease
title: POJ 1006
pageId: poj_1006
---

# POJ 1006
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
int a, b, c, d, t;
int main()
{
    while (~scanf("%d%d%d%d", &a, &b, &c, &d) && ~a && ~b && ~c && ~d)
        printf("Case %d: the next triple peak occurs in %d days.\n", ++t,
               (5544 * a + 14421 * b + 1288 * c - d + 21252 + 21251) % 21252 + 1);
    return 0;
}
```
<div id="__comment"></div>
