---
template: post_with_isso
title: LYDSY 1024
pageId: lydsy_1024
---

# LYDSY 1024
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
double min(double a, double b) { return a < b ? a : b; };
double max(double a, double b) { return a > b ? a : b; };
double dfs(double x, double y, int t)
{
    if (t == 1) return max(x / y, y / x);
    double ans = 1e300;
    for (int i = 1; i <= t / 2; i++)
        ans = min(ans, min(
                           max(dfs(x / t * i, y, i), dfs(x / t * (t - i), y, t - i)),
                           max(dfs(x, y / t * i, i), dfs(x, y / t * (t - i), t - i))));
    return ans;
}
int main()
{
    int n, m, k;
    scanf("%d%d%d", &n, &m, &k);
    printf("%.6lf", dfs(n, m, k));
    return 0;
}
```
<div id="__comment"></div>
