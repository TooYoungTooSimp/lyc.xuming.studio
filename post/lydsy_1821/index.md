---
template: post_with_isso
title: LYDSY 1821
pageId: lydsy_1821
---

# LYDSY 1821
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <algorithm>
#include <cmath>
#include <cstdio>
#include <cstring>
using namespace std;
int n, k, fa[1010], X[1010], Y[1010], cnt, ecnt;
double ans;
int Find(int x) { return fa[x] == -1 ? x : fa[x] = Find(fa[x]); }
struct edge
{
    int u, v;
    double l;
    bool operator<(const edge &rhs) const { return l < rhs.l; }
} edges[1000010];
int main()
{
    memset(fa, -1, sizeof(fa));
    scanf("%d%d", &n, &k);
    for (int i = 1; i <= n; i++) scanf("%d%d", X + i, Y + i);
    for (int i = 1; i <= n; i++)
        for (int j = 1; j < i; j++, ecnt++)
            edges[ecnt].u = i, edges[ecnt].v = j,
            edges[ecnt].l = sqrt((X[i] - X[j]) * (X[i] - X[j]) +
                                 (Y[i] - Y[j]) * (Y[i] - Y[j]));
    sort(edges, edges + ecnt);
    for (int i = 0, fx, fy; i < ecnt; i++)
        if ((fx = Find(edges[i].u)) != (fy = Find(edges[i].v)))
        {
            fa[fx] = fy;
            cnt++, ans = edges[i].l;
            if (cnt - 1 == n - k) break;
        }
    printf("%.2lf", ans);
    return 0;
}
```
<div id="__comment"></div>
