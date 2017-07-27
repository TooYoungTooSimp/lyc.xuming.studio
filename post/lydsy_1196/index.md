---
template: post_with_disqus
title: LYDSY 1196
pageId: lydsy_1196
---

# LYDSY 1196
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
int fa[10010], X[20010], Y[20010], C1[20010], C2[20010], n, k, m;
int Find(int x) { return fa[x] == -1 ? x : fa[x] = Find(fa[x]); }
bool check(int x)
{
    memset(fa, -1, sizeof(fa));
    int cnt1 = 0, cnt2 = 0;
    for (int i = 1, fx, fy; i < m; i++)
        if ((C1[i] <= x) && ((fx = Find(X[i])) != (fy = Find(Y[i]))))
            cnt1++, fa[fx] = fy;
    for (int i = 1, fx, fy; i < m; i++)
        if ((C2[i] <= x) && ((fx = Find(X[i])) != (fy = Find(Y[i]))))
            cnt2++, fa[fx] = fy;
    return cnt1 >= k && cnt1 + cnt2 == n - 1;
}
int main()
{
    scanf("%d%d%d", &n, &k, &m);
    for (int i = 1; i < m; i++)
        scanf("%d%d%d%d", X + i, Y + i, C1 + i, C2 + i);
    int l = 0, r = 0x3f3f3f3f, mid;
    while (l < r) check(mid = (l + r) >> 1) ? r = mid : l = mid + 1;
    printf("%d", l);
    return 0;
}
```
<div id="__comment"></div>
