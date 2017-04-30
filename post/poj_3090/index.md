---
template: post_with_netease
title: POJ 3090
pageId: poj_3090
---

# POJ 3090
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
const int maxn = 1010;
int phi[maxn], sum[maxn];
int main()
{
    phi[1] = 1;
    for (int i = 2; i <= 1005; i++) if (!phi[i])
        for (int j = i; j <= 1005; j += i)
        {
            if (!phi[j]) phi[j] = j;
            phi[j] = phi[j] / i * (i - 1);
        }
    for (int i = 1; i <= 1005; i++) sum[i] = sum[i - 1] + phi[i];
    int T, x;
    scanf("%d", &T);
    for (int i = 1; i <= T; i++)
    {
        scanf("%d", &x);
        printf("%d %d %d\n", i, x, sum[x] << 1 | 1);
    }
    return 0;
}

```
<div id="__comment"></div>
