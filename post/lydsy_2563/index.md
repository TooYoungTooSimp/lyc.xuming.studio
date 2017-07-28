---
template: post_with_isso
title: LYDSY 2563
pageId: lydsy_2563
---

# LYDSY 2563
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <algorithm>
#include <cstdio>
int a[10010];
int main()
{
    int n, m, ans = 0;
    scanf("%d%d", &n, &m);
    for (int i = 1, x; i <= n; i++)
    {
        scanf("%d", &x);
        ans -= x;
        a[i] = x << 1;
    }
    for (int i = 1, x, y, z; i <= m; i++)
    {
        scanf("%d%d%d", &x, &y, &z);
        ans -= z, a[x] += z, a[y] += z;
    }
    std::sort(a + 1, a + n + 1);
    for (int i = 2; i <= n; i += 2)
        ans += a[i];
    printf("%d", ans);
    return 0;
}
```
<div id="__comment"></div>
