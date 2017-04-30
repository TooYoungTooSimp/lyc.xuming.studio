---
template: post_with_netease
title: TYVJ CONTEST799 TOUR TOUR
pageId: tyvj_contest799_tour_tour
---

# TYVJ CONTEST799 TOUR TOUR

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <algorithm>
#include <cctype>
#include <cstdio>
#include <cstring>
#include <iostream>
using namespace std;
const int inf = 0x3f3f3f3f;
const int maxn = 1010;
int G[maxn][maxn], to[maxn][maxn], tail[maxn], fa[maxn], f[maxn][maxn];
bool vis[maxn];
int n, l, r, mid, ans = inf;
void dfs(int x, int tmp, int step)
{
    if (step == n)
        ans = min(ans, tmp);
    else
        for (int i = 1; i <= n; i++)
            if ((!vis[i]) && (tmp + G[x][i] < ans))
            {
                vis[i] = true;
                dfs(i, tmp + G[x][i], step + 1);
                vis[i] = false;
            }
}
int main()
{
    freopen("tour.in", "r", stdin);
    freopen("tour.out", "w", stdout);
    memset(G, inf, sizeof(G));
    scanf("%d", &n);
    for (int i = 1, a, b, c; i < n; i++)
    {
        scanf("%d%d%d", &a, &b, &c);
        G[a][b] = G[b][a] = c;
    }
    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                G[i][j] = min(G[i][j], G[i][k] + G[k][j]);
    vis[1] = true;
    dfs(1, 0, 1);
    cout << ans;
    return 0;
}
```
<div id="__comment"></div>
