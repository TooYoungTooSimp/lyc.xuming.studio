---
template: post_with_isso
title: LYDSY 1968
pageId: lydsy_1968
---

# LYDSY 1968
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
int m, n;
int main()
{
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) m += n / i;
    printf("%d", m);
    return 0;
}
```
<div id="__comment"></div>
