---
template: post_with_isso
title: POJ 2187
pageId: poj_2187
---

# POJ 2187
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <algorithm>
inline int max(int a, int b) { return a > b ? a : b; }
const int N = 50005;
struct point
{
    int x, y;
    point() {}
    point(int _x, int _y) : x(_x), y(_y) {}
}a[N], stk[N];
#define pArg(x) const point &x
inline point operator+(pArg(l), pArg(r)) { return point(l.x + r.x, l.y + r.y); }
inline point operator-(pArg(l), pArg(r)) { return point(l.x - r.x, l.y - r.y); }
inline int cross(pArg(l), pArg(r)) { return l.x * r.y - l.y * r.x; }
inline int dot(pArg(l), pArg(r)) { return l.x * r.x + l.y * r.y; }
inline int len2(pArg(p)) { return p.x * p.x + p.y * p.y; }
inline bool cmp1(pArg(l), pArg(r)) { return l.x < r.x || (l.x == r.x && l.y < r.y); }
inline bool cmp2(pArg(l), pArg(r))
{
    int det = cross(l - a[0], r - a[0]);
    return det != 0 ? det > 0 : len2(l - a[0]) < len2(r - a[0]);
}
#define nxt(x) ((x) == n - 1 ? 0 : (x) + 1)
#define area(p, u, v) cross(u - p, v - p)
int main()
{
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++)
        scanf("%d%d", &a[i].x, &a[i].y);
    std::swap(a[0], *std::min_element(a, a + n, cmp1));
    std::sort(a + 1, a + n, cmp2);
    int top = 0;
    for (int i = 0; i < n; i++)
    {
        while (top >= 2 && cross(a[i] - stk[top - 1], stk[top - 1] - stk[top - 2]) >= 0) top--;
        stk[top++] = a[i];
    }
    stk[top] = stk[0];
    int res = 0;
    if (top == 2)
        res = len2(stk[1] - stk[0]);
    else for (int i = 0, j = 2; i < n; i++)
    {
        while (nxt(j) != i &&
               area(stk[j], stk[i], stk[i + 1]) <=
               area(stk[j + 1], stk[i], stk[i + 1]))
            j = nxt(j);
        res = max(res, max(len2(stk[j] - stk[i]), len2(stk[j] - stk[i + 1])));
    }
    printf("%d", res);
    return 0;
}
```
<div id="__comment"></div>
