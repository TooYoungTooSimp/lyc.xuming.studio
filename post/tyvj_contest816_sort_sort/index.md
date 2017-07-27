---
template: post_with_disqus
title: TYVJ CONTEST816 SORT SORT
pageId: tyvj_contest816_sort_sort
---

# TYVJ CONTEST816 SORT SORT
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <algorithm>
#include <cstdio>
#include <cstring>
using namespace std;
const int maxn = 100010;
int n, a[maxn], dp[maxn];
int main()
{
    freopen("sort.in", "r", stdin);
    freopen("sort.out", "w", stdout);
    scanf("%d", &n);
    for (int i = 0; i < n; i++)
        scanf("%d", a + i);
    memset(dp, 0, sizeof(dp));
    int len = 1;
    dp[0] = a[0];
    for (int i = 1, pos; i < n; ++i)
    {
        pos = lower_bound(dp, dp + len, a[i]) - dp;
        dp[pos] = a[i];
        len = max(len, pos + 1);
    }
    printf("%d", len);
    return 0;
}
```
<div id="__comment"></div>
