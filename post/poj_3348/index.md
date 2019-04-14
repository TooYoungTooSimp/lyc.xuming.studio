---
template: post_with_isso
title: POJ 3348
pageId: poj_3348
---

# POJ 3348
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <algorithm>
const int N = int(1e4 + 5);
struct point
{
    int x, y;
    point() {}
    point(int _x, int _y) : x(_x), y(_y) {}
}a[N], stk[N];
inline point operator+(const point &L, const point &R) { return point(L.x + R.x, L.y + R.y); }
inline point operator-(const point &L, const point &R) { return point(L.x - R.x, L.y - R.y); }
inline int cross(const point &L, const point &R) { return L.x * R.y - L.y * R.x; }
inline int dot(const point &L, const point &R) { return L.x * R.x + L.y * R.y; }
inline int len2(const point &u, const point &v)
{
    point p = u - v;
    return p.x * p.x + p.y * p.y;
}
inline bool cmp1(const point &L, const point &R) { return L.x < R.x || (L.x == R.x && L.y < R.y); }
inline bool cmp2(const point &L, const point &R)
{
    int det = cross(L - a[0], R - a[0]);
    return det != 0 ? det > 0: len2(L, a[0]) < len2(R, a[0]);
}
int main()
{
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++)
        scanf("%d%d", &a[i].x, &a[i].y);
    std::swap(*std::min_element(a, a + n, cmp1), a[0]);
    std::sort(a + 1, a + n, cmp2);
    int top = 0;
    stk[top++] = a[0];
    for (int i = 1; i < n; i++)
    {
        while (top >= 2 && cross(a[i] - stk[top - 1], stk[top - 1] - stk[top - 2]) >= 0) top--;
        stk[top++] = a[i];
    }
    stk[top] = stk[0];
    int res = 0;
    for (int i = 0; i < top; i++)
        res += cross(stk[i], stk[i + 1]);
    printf("%d", res / 100);
    return 0;
}
```
<div id="__comment"></div>
