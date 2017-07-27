---
template: post_with_disqus
title: LYDSY 1218
pageId: lydsy_1218
---

# LYDSY 1218
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
inline int max(int a, int b) { return a > b ? a : b; }
inline void readInt(int &x)
{
    int ch = x = 0;
    while (!isdigit(ch = getchar()))
        ;
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
}
int a[5010][5010];
int main()
{
    int n, r;
    readInt(n), readInt(r);
    for (int i = 0, x, y, z; i < n; i++)
    {
        readInt(x), readInt(y), readInt(z);
        a[x + 1][y + 1] += z;
    }
    for (int i = 1; i < 5010; i++)
        for (int j = 1; j < 5010; j++)
            a[i][j] += a[i][j - 1];
    for (int i = 1; i < 5010; i++)
        for (int j = 1; j < 5010; j++)
            a[i][j] += a[i - 1][j];
    int ans = 0;
    for (int i = r; i < 5010; i++)
        for (int j = r; j < 5010; j++)
            ans = max(ans, a[i][j] - a[i][j - r] - a[i - r][j] + a[i - r][j - r]);
    printf("%d", ans);
    return 0;
}

```
<div id="__comment"></div>
