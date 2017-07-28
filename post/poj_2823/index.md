---
template: post_with_isso
title: POJ 2823
pageId: poj_2823
---

# POJ 2823
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
//����POJ������TLE
#include <cstdio>
int n, k, a[1000001], que[1000001][2], head, tail;
int main()
{
    scanf("%d%d", &n, &k);
    for (int i = 0; i < n; i++) scanf("%d", a + i);
    head = tail = 0;
    for (int i = 0; i < k; i++)
    {
        while (head < tail && que[tail - 1][0] > a[i]) tail--;
        que[tail][0] = a[que[tail][1] = i];
        tail++;
    }
    printf("%d ", que[head][0]);
    for (int i = k; i < n; i++)
    {
        while (head < tail && que[tail - 1][0] > a[i]) tail--;
        que[tail][0] = a[que[tail][1] = i];
        tail++;
        while (head < tail && i - que[head][1] >= k) head++;
        printf("%d ", que[head][0]);
    }
    putchar('\n');
    head = tail = 0;
    for (int i = 0; i < k; i++)
    {
        while (head < tail && que[tail - 1][0] < a[i]) tail--;
        que[tail][0] = a[que[tail][1] = i];
        tail++;
    }
    printf("%d ", que[head][0]);
    for (int i = k; i < n; i++)
    {
        while (head < tail && que[tail - 1][0] < a[i]) tail--;
        que[tail][0] = a[que[tail][1] = i];
        tail++;
        while (head < tail && i - que[head][1] >= k) head++;
        printf("%d ", que[head][0]);
    }
    return 0;
}

```
<div id="__comment"></div>
