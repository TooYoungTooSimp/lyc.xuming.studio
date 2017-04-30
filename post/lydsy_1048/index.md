---
template: post_with_netease
title: LYDSY 1048
pageId: lydsy_1048
---

# LYDSY 1048

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cmath>
#include <cstdio>
#include <cstring>
inline double min(double a, double b) { return a < b ? a : b; }
int a, b, n;
double g[11][11], sum[11][11], f[11][11][11][11][11], avg;
double dfs(int x1, int y1, int x2, int y2, int v)
{
    if (f[x1][y1][x2][y2][v] < f[0][0][0][0][0] - 100)
        return f[x1][y1][x2][y2][v];
    else if (v == 0)
        return f[x1][y1][x2][y2][v] =
                   (sum[x2][y2] - sum[x1 - 1][y2] - sum[x2][y1 - 1] + sum[x1 - 1][y1 - 1] - avg) *
                   (sum[x2][y2] - sum[x1 - 1][y2] - sum[x2][y1 - 1] + sum[x1 - 1][y1 - 1] - avg);
    else
    {
        double ans = *****f;
        for (int i = x1; i < x2; i++)
            for (int j = 0; j < v; j++)
                ans = min(ans, dfs(x1, y1, i, y2, j) + dfs(i + 1, y1, x2, y2, v - j - 1));
        for (int i = y1; i < y2; i++)
            for (int j = 0; j < v; j++)
                ans = min(ans, dfs(x1, y1, x2, i, j) + dfs(x1, i + 1, x2, y2, v - j - 1));
        return f[x1][y1][x2][y2][v] = ans;
    }
}
int main()
{
    memset(f, 0x7f, sizeof(f));
    scanf("%d%d%d", &a, &b, &n);
    for (int i = 1; i <= a; i++)
        for (int j = 1; j <= b; j++)
            scanf("%lf", &g[i][j]);
    for (int i = 1; i <= a; i++)
        for (int j = 1; j <= b; j++)
            sum[i][j] = sum[i - 1][j] + sum[i][j - 1] - sum[i - 1][j - 1] + g[i][j];
    avg = sum[a][b] / n;
    printf("%.2f", sqrt(dfs(1, 1, a, b, n - 1) / n));
    return 0;
}

```
<div id="__comment"></div>
