---
template: post_with_disqus
title: POJ 2104
pageId: poj_2104
---

# POJ 2104
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <algorithm>
#include <cstdio>
#include <cstring>
const int N = int(1e5 + 5);
int n, a[N], b[N], idx, rt[N];
struct node
{
    int ch[2], sz;
} T[N * 20];
void insert(int y, int &x, int l, int r, int p)
{
    T[x = ++idx] = T[y];
    T[x].sz++;
    if (l == r - 1) return;
    int m = (l + r) >> 1;
    p < m ?
        insert(T[y].ch[0], T[x].ch[0], l, m, p) :
        insert(T[y].ch[1], T[x].ch[1], m, r, p);
}
int query(int nl, int nr, int l, int r, int k)
{
    if (l == r - 1) return l;
    int delta = T[T[nr].ch[0]].sz - T[T[nl].ch[0]].sz, m = (l + r) >> 1;
    return delta >= k ?
        query(T[nl].ch[0], T[nr].ch[0], l, m, k) :
        query(T[nl].ch[1], T[nr].ch[1], m, r, k - delta);
}
int main()
{
    int q;
    scanf("%d%d", &n, &q);
    for (int i = 1; i <= n; i++) scanf("%d", a + i);
    memcpy(b, a + 1, n << 2);
    std::sort(b, b + n);
    int m = int(std::unique(b, b + n) - b);
    for (int i = 1; i <= n; i++)
        a[i] = int(std::lower_bound(b, b + m, a[i]) - b);
    for (int i = 1; i <= n; i++) insert(rt[i - 1], rt[i], 0, m, a[i]);
    while (q--)
    {
        int l, r, k;
        scanf("%d%d%d", &l, &r, &k);
        printf("%d\n", b[query(rt[l - 1], rt[r], 0, m, k)]);
    }
    return 0;
}
```
<div id="__comment"></div>
