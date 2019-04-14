---
template: post_with_isso
title: LYDSY 1193
pageId: lydsy_1193
---

# LYDSY 1193
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
inline int abs(int x) { return x > 0 ? x : -x; }
inline void swap(int &x, int &y)
{
    int t = x;
    x = y;
    y = t;
}
const int dx[] = {1, 2, 2, 1, -1, -2, -2, -1};
const int dy[] = {2, 1, -1, -2, -2, -1, 1, 2};
int que[1 << 20], head, tail, dis[(1 << 14) - 1];
#define zip(x, y) ((x << 7) + y)
#define unzip(x, y, val) (x = val >> 7, y = val & 127)
int main()
{
    int x, y, xp, yp, xs, ys;
    scanf("%d%d%d%d", &xp, &yp, &xs, &ys);
    x = abs(xs - xp), y = abs(ys - yp);
    int ans = 0;
    while (x + y >= 50)
    {
        if (x < y) swap(x, y);
        if (x - 4 >= y << 1)
            x -= 4;
        else
            x -= 4, y -= 2;
        ans += 2;
    }
    memset(dis, -1, sizeof(dis));
    int i = x, j = y;
    dis[que[tail++] = zip(i, j)] = 0;
    while (head < tail)
    {
        unzip(i, j, que[head]);
        head++;
        for (int k = 0; k < 8; k++)
            if (dis[zip(i + dx[k], j + dy[k])] == -1)
                dis[que[tail++] = zip(i + dx[k], j + dy[k])] = dis[zip(i, j)] + 1;
    }
    printf("%d", dis[0] + ans);
    return 0;
}
```
<div id="__comment"></div>
