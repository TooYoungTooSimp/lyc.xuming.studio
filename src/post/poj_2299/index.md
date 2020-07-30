---
template: post_with_isso
title: POJ 2299
pageId: poj_2299
---

# POJ 2299
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
#include <stdint.h>
#define lowbit(x) ((x) & -(x))
const int N = 500005;
int sum[N];
int query(int x)
{
    int ans = 0;
    for (; x; x -= lowbit(x)) ans += sum[x];
    return ans;
}
void update(int x, int y)
{
    for (; x <= N; x += lowbit(x)) sum[x] += y;
}
struct abcd
{
    int val, pos;
    bool operator<(const abcd &rhs) const { return val < rhs.val; }
} nodes[N];
int map[N];
int main()
{
    int n;
    while (~scanf("%d", &n) && n)
    {
        memset(sum, 0, sizeof(sum));
        for (int i = 1; i <= n; i++) scanf("%d", &nodes[i].val), nodes[i].pos = i;
        std::sort(nodes + 1, nodes + n + 1);
        for (int i = 1; i <= n; i++) map[nodes[i].pos] = i;
        int64_t ans = 0;
        for (int i = 1; i <= n; i++)
        {
            update(map[i], 1);
            ans += i - query(map[i]);
        }
        printf("%lld\n", ans);
    }
    return 0;
}
```
<div id="__comment"></div>
