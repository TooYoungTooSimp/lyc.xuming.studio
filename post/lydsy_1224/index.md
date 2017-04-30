---
template: post_with_netease
title: LYDSY 1224
pageId: lydsy_1224
---

# LYDSY 1224

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
const double eps = 1e-10;
int n, m, x, y, ans;
double target, sum[55];
void dfs(int pos, int cnt, double cur)
{
    double mx = cur + sum[pos - 1 + n - cnt] - sum[pos - 1];
    double mn = cur + sum[m] - sum[m - (n - cnt)];
    if (mn - target > eps || mx - target < -eps) return;
    if (cnt == n) ans++;
    if (cnt == n || pos == m + 1) return;
    dfs(pos + 1, cnt, cur);
    dfs(pos + 1, cnt + 1, cur + 1.0 / pos);
}
int main()
{
    scanf("%d%d%d%d", &n, &m, &x, &y);
    target = 1.0 * x / y;
    for (int i = 1; i <= m; i++)
        sum[i] = sum[i - 1] + 1.0 / i;
    dfs(1, 0, 0.0);
    printf("%d", ans);
    return 0;
}
```
<div id="__comment"></div>
