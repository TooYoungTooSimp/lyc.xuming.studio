---
template: post_with_disqus
title: POJ 2406
pageId: poj_2406
---

# POJ 2406
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
char str[1 << 20 | 1];
int next[1 << 20 | 1];
int len;
int main()
{
    next[0] = -1;
    while (scanf("%s", str))
    {
        if (str[0] == '.') break;
        len = strlen(str);
        for (int i = 0, j = -1; i < len;)
            (~j && str[i] != str[j]) ? j = next[j] : next[++i] = ++j;
        printf("%d\n", len % (len - next[len]) == 0 ? len / (len - next[len]) : 1);
    }
    return 0;
}
```
<div id="__comment"></div>
