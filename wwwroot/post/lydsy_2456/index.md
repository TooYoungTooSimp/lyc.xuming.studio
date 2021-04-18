---
template: post_with_isso
title: LYDSY 2456
pageId: lydsy_2456
---

# LYDSY 2456
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
int n, x, t, tot;
int main()
{
    scanf("%d", &n);
    while (n--)
    {
        scanf("%d", &x);
        if (tot == 0) {
            t = x;
            tot = 1;
        }
        else if (t == x)
            tot++;
        else
            tot--;
    }
    printf("%d", t);
    return 0;
}
```
<div id="__comment"></div>
