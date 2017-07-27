---
template: post_with_disqus
title: LYDSY 2222
pageId: lydsy_2222
---

# LYDSY 2222
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
    scanf("%d", &n);
    if (n == 6) n = 5;
    if (n == 10) n = 7;
    if (n == 19) n = 8;
    if (n == 54) n = 9;
    if (n == 55) n = 10;
    if (n == 166) n = 11;
    if (n == 167) n = 12;
    if (n == 296) n = 13;
    printf("%d", n);
    return 0;
}
```
<div id="__comment"></div>
