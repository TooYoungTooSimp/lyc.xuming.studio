---
template: post_with_isso
title: POJ 3264
pageId: poj_3264
---

# POJ 3264
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
inline int min(int a, int b) { return a < b ? a : b; }
inline int max(int a, int b) { return a > b ? a : b; }
const int N = 50010;
const int LogN = 16;
int minT[LogN][N], maxT[LogN][N], Log[N];
int main()
{
    Log[0] = -1;
    for (int i = 1; i < N; i++) Log[i] = Log[i >> 1] + 1;
    int m, n;
    scanf("%d%d", &n, &m);
    for (int i = 1, x; i <= n; i++)
    {
        scanf("%d", &x);
        minT[0][i] = maxT[0][i] = x;
    }
    for (int j = 1; j < LogN; j++)
        for (int i = 1; i + (1 << j) - 1 <= n; i++)
            minT[j][i] = min(minT[j - 1][i], minT[j - 1][i + (1 << (j - 1))]),
            maxT[j][i] = max(maxT[j - 1][i], maxT[j - 1][i + (1 << (j - 1))]);
    for (int i = 1, x, y, z; i <= m; i++)
    {
        scanf("%d%d", &x, &y);
        z = Log[y - x + 1];
        printf("%d\n", max(maxT[z][x], maxT[z][y - (1 << z) + 1]) - min(minT[z][x], minT[z][y - (1 << z) + 1]));
    }
    return 0;
}
```
<div id="__comment"></div>
