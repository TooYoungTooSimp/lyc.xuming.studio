---
template: post_with_disqus
title: CODEFORCES ROUND #369 (DIV. 2) B
pageId: codeforces_round_#369_(div._2)_b
---

# CODEFORCES ROUND #369 (DIV. 2) B
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
long long a[501][501], sum, tmp;
int n, x, y;
int main()
{
    scanf("%d", &n);
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
        {
            scanf("%I64d", &a[i][j]);
            if (a[i][j] == 0) x = i, y = j;
        }
    tmp = (x + 1) % n;
    for (int i = 0; i < n; i++)
        sum += a[tmp][i];
    tmp = sum;
    for (int i = 0; i < n; i++)
        tmp -= a[x][i];
    if (tmp == 0 && n == 1) tmp = sum = 1;
    a[x][y] = tmp;
    bool flag = tmp > 0;
    for (int i = 0; i < n && flag; i++)
    {
        tmp = 0;
        for (int j = 0; j < n; j++)
            tmp += a[i][j];
        if (tmp != sum) flag = false;
    }
    for (int i = 0; i < n && flag; i++)
    {
        tmp = 0;
        for (int j = 0; j < n; j++)
            tmp += a[j][i];
        if (tmp != sum) flag = false;
    }
    tmp = 0;
    if (flag)
        for (int i = 0; i < n; i++) tmp += a[i][i];
    if (tmp != sum) flag = false;
    tmp = 0;
    if (flag)
        for (int i = 0; i < n; i++) tmp += a[i][n - i - 1];
    if (tmp != sum) flag = false;
    printf("%I64d", flag ? a[x][y] : -1);
    return 0;
}
```
<div id="__comment"></div>
