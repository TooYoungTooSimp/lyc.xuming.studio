---
template: post_with_netease
title: LYDSY 1486
pageId: lydsy_1486
---

# LYDSY 1486

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
const double eps = 1e-9;
template <typename T>
T max(T a, T b) { return a > b ? a : b; }
template <typename T>
T min(T a, T b) { return a < b ? a : b; }
int head[3010], next[10010], to[10010], ecnt, n, m, flag, flags[3010];
double a[10010], len[10010], dis[3010];
inline void addEdge(int x, int y)
{
    ecnt++;
    next[ecnt] = head[x];
    head[x] = ecnt;
    to[ecnt] = y;
}
bool dfs(int x)
{
    if (flags[x] == flag) return true;
    flags[x] = flag;
    for (int cur = head[x]; cur; cur = next[cur])
        if (dis[to[cur]] > dis[x] + len[cur])
        {
            dis[to[cur]] = dis[x] + len[cur];
            if (dfs(to[cur])) return true;
        }
    flags[x] = 0;
    return false;
}
bool check(double x)
{
    for (int i = 1; i <= m; i++) len[i] = a[i] - x;
    for (int i = 1; i <= n; i++)
    {
        flag++;
        memset(dis, 0, sizeof(dis));
        if (dfs(i)) return true;
    }
    return false;
}
int main()
{
    scanf("%d%d", &n, &m);
    for (int i = 1, x, y; i <= m; i++)
        scanf("%d%d%lf", &x, &y, a + i), addEdge(x, y);
    double l = 1e304, r = -1e304, mid;
    for (int i = 1; i <= m; i++)
        l = min(l, a[i]), r = max(r, a[i]);
    while (r - l > eps) (check(mid = (l + r) / 2) ? r : l) = mid;
    printf("%.8lf", (l + r) / 2);
    return 0;
}
```
