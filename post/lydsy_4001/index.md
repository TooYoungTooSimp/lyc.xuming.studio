---
template: post_with_isso
title: LYDSY 4001
pageId: lydsy_4001
---

# LYDSY 4001
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
//http://blog.miskcoo.com/2015/04/bzoj-4001
#include <cstdio>
int main()
{
    int n;
    scanf("%d", &n);
    printf("%.9lf", 1.0 * n * (n + 1) / 2 / (n * 2 - 1));
    return 0;
}
```
<div id="__comment"></div>
