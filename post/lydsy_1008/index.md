---
template: post_with_disqus
title: LYDSY 1008
pageId: lydsy_1008
---

# LYDSY 1008
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
typedef long long int64;
const int MOD = 100003;
int fast_pow(int64 a, int64 b)
{
    int64 ans = 1;
    for (; b; a = (a * a) % MOD, b >>= 1)
        if (b & 1)
            ans = (ans * a) % MOD;
    return ans;
}
int main()
{
    int64 m, n;
    scanf("%lld%lld", &m, &n);
    printf("%lld", (fast_pow(m, n) - (m * fast_pow(m - 1, n - 1)) % MOD + MOD) % MOD);
    return 0;
}
```
<div id="__comment"></div>
