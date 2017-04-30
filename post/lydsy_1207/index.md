---
template: post_with_netease
title: LYDSY 1207
pageId: lydsy_1207
---

# LYDSY 1207
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
inline int abs(int x) { return x >= 0 ? x : -x; }
int t[100010], x[100010], y[100010], f[100010], n, m, ans;
int main()
{
    scanf("%d%d", &n, &m);
    for (int i = 0; i < m; i++) f[i] = 1, scanf("%d%d%d", t + i, x + i, y + i);
    for (int i = 0; i < m; i++)
        for (int j = 0; j < i; j++)
            if (abs(x[i] - x[j]) + abs(y[i] - y[j]) <= abs(t[i] - t[j]) && f[i] < f[j] + 1)
                f[i] = f[j] + 1;
    for (int i = 0; i < m; i++)
        if (f[i] > ans) ans = f[i];
    printf("%d", ans);
    return 0;
}
```
<div id="__comment"></div>
