---
template: post_with_isso
title: LYDSY 2463
pageId: lydsy_2463
---

# LYDSY 2463
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
    int n;
    while (scanf("%d", &n) && n)
        puts(n & 1 ? "Bob" : "Alice");
    return 0;
}

```
<div id="__comment"></div>
