---
template: post_with_isso
title: LYDSY 2761
pageId: lydsy_2761
---

# LYDSY 2761
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <set>
int main()
{
    int t, n;
    scanf("%d", &t);
    while (t--)
    {
        scanf("%d", &n);
        std::set<int> S;
        for (int i = 0, x; i < n; i++)
        {
            scanf("%d", &x);
            if (S.count(x) == 0)
                S.insert(x), printf(i == 0 ? "%d" : " %d", x);
        }
        putchar('\n');
    }
}
```
<div id="__comment"></div>
