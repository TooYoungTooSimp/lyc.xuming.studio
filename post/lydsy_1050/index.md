---
template: post_with_netease
title: LYDSY 1050
pageId: lydsy_1050
---

# LYDSY 1050

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <algorithm>
#include <cstdio>
#include <cstring>
struct edge
{
    int from, to, len;
    bool operator<(const edge &rhs) const { return len < rhs.len; };
} edges[5010];
int fa[510];
int Find(int x) { return fa[x] == -1 ? x : fa[x] = Find(fa[x]); }
int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }
int n, m, s, t, ans1, ans2, flag;
int main()
{
    scanf("%d%d", &n, &m);
    for (int i = 0; i < m; i++) scanf("%d%d%d", &edges[i].from, &edges[i].to, &edges[i].len);
    std::sort(edges, edges + m);
    scanf("%d%d", &s, &t);
    ans1 = edges[m - 1].len, ans2 = edges[0].len;
    for (int i = 0, mn, mx; i < m; i++)
    {
        memset(fa, -1, sizeof(fa));
        mn = edges[i].len;
        for (int j = i, fx, fy; j < m; j++)
        {
            mx = edges[j].len;
            fx = Find(edges[j].from), fy = Find(edges[j].to);
            if (fx != fy) fa[fx] = fy;
            if (Find(s) == Find(t))
            {
                if (ans1 * mn > ans2 * mx) ans1 = mx, ans2 = mn;
                flag = 1;
                break;
            }
        }
    }
    if (!flag)
        printf("IMPOSSIBLE");
    else
    {
        int k = gcd(ans1, ans2);
        ans1 /= k, ans2 /= k;
        if (ans2 == 1)
            printf("%d", ans1);
        else
            printf("%d/%d", ans1, ans2);
    }
    return 0;
}
```
