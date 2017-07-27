---
template: post_with_disqus
title: LYDSY 2048
pageId: lydsy_2048
---

# LYDSY 2048
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cmath>
#include <cstdio>
const double eps = 1e-10, r = 0.5772156649;
typedef long long ll;
int main()
{
    double ans;
    ll n, m;
    ans = n = m = 0;
    scanf("%lld%lld", &n, &m);
    if (n <= 10000)
        for (int i = 1; i <= n; i++)
            ans += 0.5 / i;
    else
        ans = log(n + 1.0) + r, ans /= 2.0;
    ans *= m;
    printf("%d\n", (int)(ans - eps));
}
```
<div id="__comment"></div>
