---
template: post_with_isso
title: LYDSY 1432
pageId: lydsy_1432
---

# LYDSY 1432
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
int main()
{
    int n, k;
    scanf("%d%d", &n, &k);
    printf("%d", (n == 1) ? 1 : (k < n - k + 1 ? k : n - k + 1) << 1);
}
```
<div id="__comment"></div>
