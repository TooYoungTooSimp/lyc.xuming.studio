---
template: post_with_isso
title: LYDSY 2005
pageId: lydsy_2005
---

# LYDSY 2005
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
//http://blog.csdn.net/popoqqq/article/details/39924877
#include <cstdio>
long long f[100100], ans;
int main()
{
    int m, n, k;
    scanf("%d%d", &m, &n);
    k = (m < n ? m : n);
    for (int i = k; i; i--)
    {
        f[i] = 1ll * (m / i) * (n / i);
        for (int j = 2; j * i <= k; j++)
            f[i] -= f[i * j];
        ans += f[i] * (i + i - 1);
    }
    printf("%lld", ans);
    return 0;
}
```
<div id="__comment"></div>
