---
template: post_with_isso
title: LYDSY 2429
pageId: lydsy_2429
---

# LYDSY 2429
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
int fa[1010], X[1010], Y[1010], monkeys[510], m, n, ecnt, ans1;
double ans2;
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
    scanf("%d", &m);
    for (int i = 0; i < m; i++) scanf("%d", monkeys + i);
    sort(monkeys, monkeys + m);
    scanf("%d", &n);
    for (int i = 1; i <= n; i++)
        scanf("%d%d", X + i, Y + i);
    for (int i = 1; i <= n; i++)
        for (int j = 1; j < i; j++, ecnt++)
            edges[ecnt].u = i, edges[ecnt].v = j, edges[ecnt].l =
                                                      sqrt((X[i] - X[j]) * (X[i] - X[j]) + (Y[i] - Y[j]) * (Y[i] - Y[j]));
    sort(edges, edges + ecnt);
    for (int i = 0, fx, fy; i < ecnt; i++)
        if ((fx = Find(edges[i].u)) != (fy = Find(edges[i].v)))
        {
            fa[fx] = fy;
            ans1++, ans2 = edges[i].l;
            if (ans1 == n - 1) break;
        }
    printf("%d", int(monkeys + m - lower_bound(monkeys, monkeys + m, ans2)));
    return 0;
}
```
<div id="__comment"></div>
