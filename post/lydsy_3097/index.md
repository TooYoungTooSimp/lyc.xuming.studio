---
template: post_with_netease
title: LYDSY 3097
pageId: lydsy_3097
---

# LYDSY 3097
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
int n = 1, l;
char s[100001];
int main()
{
    s[0] = 'a';
    for (int i = 0; i < 12; i++)
    {
        for (int j = 0; j < n; j++)
            s[j + n] = s[j] == 'a' ? 'b' : 'a';
        n <<= 1;
    }
    l = n >> 1;
    s[n++] = 'a';
    for (int i = 1; i < l; i++) s[n++] = 'a';
    s[n++] = 'b';
    for (int i = 1; i < l; i++) s[n++] = 'a';
    printf("8192 2048\n%s", s);
    return 0;
}
```
<div id="__comment"></div>
