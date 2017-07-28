---
template: post_with_isso
title: LYDSY 2038
pageId: lydsy_2038
---

# LYDSY 2038
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <algorithm>
#include <cstdio>
int C[50050], bSize, res;
template <typename T>
T gcd(T a, T b) { return b == 0 ? a : gcd(b, a % b); }
struct query
{
    int l, r, id;
} Q[50050];
inline bool operator<(const query &lhs, const query &rhs) { return lhs.l / bSize == rhs.l / bSize ? lhs.r < rhs.r : lhs.l / bSize < rhs.l / bSize; }
int ans[50050][2], cnt[50050];
inline void ins(int x)
{
    res -= cnt[x] * cnt[x];
    cnt[x]++;
    res += cnt[x] * cnt[x];
}
inline void del(int x)
{
    res -= cnt[x] * cnt[x];
    cnt[x]--;
    res += cnt[x] * cnt[x];
}
int main()
{
    int n, m;
    scanf("%d%d", &n, &m);
    while (bSize * bSize < n) bSize++;
    for (int i = 1; i <= n; i++) scanf("%d", C + i);
    for (int i = 0; i < m; i++) scanf("%d%d", &Q[i].l, &Q[i].r), Q[i].id = i;
    std::sort(Q, Q + m);
    for (int i = 0, L = 1, R = 0; i < m; i++)
        if (Q[i].l == Q[i].r)
            ans[Q[i].id][0] = 0, ans[Q[i].id][1] = 1;
        else
        {
            while (L < Q[i].l) del(C[L]), L++;
            while (R < Q[i].r) R++, ins(C[R]);
            while (L > Q[i].l) L--, ins(C[L]);
            while (R > Q[i].r) del(C[R]), R--;
            int range = Q[i].r - Q[i].l + 1;
            long long a = res - range, b = 1ll * range * (range - 1), c = gcd(a, b);
            ans[Q[i].id][0] = int(a / c), ans[Q[i].id][1] = int(b / c);
        }
    for (int i = 0; i < m; i++) printf("%d/%d\n", ans[i][0], ans[i][1]);
    return 0;
}
```
<div id="__comment"></div>
