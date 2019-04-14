---
template: post_with_isso
title: LYDSY 4198
pageId: lydsy_4198
---

# LYDSY 4198
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <queue>
using namespace std;
typedef long long int64;
inline int64 _max(int64 a, int64 b) { return a > b ? a : b; }
struct word
{
    int64 w, h;
    bool operator<(const word &rhs) const
    {
        return w > rhs.w || (w == rhs.w && h > rhs.h);
    }
};
priority_queue<word> heap;
int main()
{
    int n, k;
    scanf("%d%d", &n, &k);
    for (int i = 0; i < n; i++)
    {
        int64 x;
        scanf("%lld", &x);
        heap.push({x, 0});
    }
    int top = (k - 1 - (n - 1) % (k - 1)) % (k - 1);
    for (int i = 0; i < top; i++) heap.push({0, 0});
    top += n;
    int64 ans = 0;
    for (; top != 1; top -= k - 1)
    {
        int64 w, h;
        w = h = 0;
        for (int i = 0; i < k; i++)
        {
            w += heap.top().w;
            h = _max(h, heap.top().h);
            heap.pop();
        }
        ans += w;
        heap.push({w, h + 1});
    }
    printf("%lld\n%lld", ans, heap.top().h);
    return 0;
}
```
<div id="__comment"></div>
