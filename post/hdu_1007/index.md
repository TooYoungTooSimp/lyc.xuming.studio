---
template: post_with_disqus
title: HDU 1007
pageId: hdu_1007
---

# HDU 1007
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
﻿#include <algorithm>
#include <cmath>
#include <cstdio>
#include <cstring>
template <typename T>
inline T min(T a, T b) { return a < b ? a : b; }
const int N = int(1e5 + 3);
struct Point
{
    double x, y;
} p[N];
double len(const Point &P) { return sqrt(P.x * P.x + P.y * P.y); }
inline bool operator<(const Point &l, const Point &r) { return l.x < r.x; }
inline Point operator-(const Point &l, const Point &r)
{
    Point ret;
    ret.x = l.x - r.x;
    ret.y = l.y - r.y;
    return ret;
}
double solve(int l, int r)
{
    if (l == r - 1) return 1e20;
    int m = (l + r) >> 1;
    double ans = min(solve(l, m), solve(m, r));
    double x0 = (p[m - 1].x + p[m].x) / 2;
    static Point a[N], b[N], c[N];
    int bn = 0, cn = 0;
    for (int i = l, li = l, ri = m; i < r; i++)
        if (li < m && (ri == r || p[li].y < p[ri].y))
        {
            a[i] = p[li++];
            if (x0 - a[i].x < ans) b[bn++] = a[i];
        }
        else
        {
            a[i] = p[ri++];
            if (a[i].x - x0 < ans) c[cn++] = a[i];
        }
    memcpy(p + l, a + l, (r - l) << 4);
    for (int i = 0, j = 0, k; i < bn || j < cn;)
        if (i < bn && (j == cn || b[i].y < c[j].y))
            for (k = j - 1; (k >= 0 && b[i].y - ans < c[k].y) || i++ > INT_MAX; k--)
                ans = min(ans, len(c[k] - b[i]));
        else
            for (k = i - 1; (k >= 0 && c[j].y - ans < b[k].y) || j++ > INT_MAX; k--)
                ans = min(ans, len(b[k] - c[j]));
    return ans;
}
int main()
{
    int n;
    while (scanf("%d", &n), n)
    {
        for (int i = 0; i < n; i++) scanf("%lf%lf", &p[i].x, &p[i].y);
        std::sort(p, p + n);
        printf("%.2f\n", solve(0, n) / 2);
    }
    return 0;
}
```
<div id="__comment"></div>
