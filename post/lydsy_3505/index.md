---
template: post_with_isso
title: LYDSY 3505
pageId: lydsy_3505
---

# LYDSY 3505
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
//http://blog.csdn.net/popoqqq/article/details/39779647
#include <cstdio>
int gcd(int x, int y) { return y == 0 ? x : gcd(y, x % y); }
int main()
{
    int m, n;
    scanf("%d%d", &m, &n);
    m++, n++;
    long long ans = m * n;
    ans = ans * (ans - 1) * (ans - 2) / 6;
    for (int i = 0; i <= m; i++)
        for (int j = 0; j <= n; j++)
            if (i || j)
                ans -= (i && j ? 2ll : 1ll) * (gcd(i, j) - 1) * (m - i) * (n - j);
    printf("%lld", ans);
    return 0;
}
```
<div id="__comment"></div>
