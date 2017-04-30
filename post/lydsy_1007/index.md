---
template: post_with_netease
title: LYDSY 1007
pageId: lydsy_1007
---

# LYDSY 1007
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <algorithm>
#include <cstdio>
struct line
{
    int k, b, id;
    bool operator<(const line &rhs) const { return (k < rhs.k) || (k == rhs.k && b > rhs.b); }
} a[50010];
int n;
int stk[50010], top;
bool ans[50010];
bool check(int x, int y, int z)
{
    return 1ll * (a[y].k - a[z].k) * (a[y].b - a[x].b) >= 1ll * (a[z].b - a[y].b) * (a[x].k - a[y].k);
}
int main()
{
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d%d", &a[i].k, &a[i].b), a[i].id = i + 1;
    std::sort(a, a + n);
    stk[top++] = 0;
    for (int i = 1; i < n; i++)
    {
        if (a[i].k == a[stk[top - 1]].k) continue;
        while (top > 1 && check(stk[top - 2], stk[top - 1], i)) top--;
        stk[top++] = i;
    }
    while (top) ans[a[stk[--top]].id] = true;
    for (int i = 0; i <= n; i++)
        if (ans[i]) printf("%d ", i);
    return 0;
}
```
<div id="__comment"></div>
