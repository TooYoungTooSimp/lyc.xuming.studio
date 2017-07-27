---
template: post_with_disqus
title: LYDSY 1257
pageId: lydsy_1257
---

# LYDSY 1257
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
long long n, k, ans;
int main()
{
    scanf("%lld%lld", &n, &k);
    long long sz = n < k ? n : k;
    for (long long i = 1, last, t; i <= sz; i = last + 1)
    {
        t = k / i, last = k / t;
        if (last >= n) last = n;
        ans -= ((last - i + 1) * (i + last) >> 1) * t;
    }
    printf("%lld", ans + n * k);
}
```
<div id="__comment"></div>
