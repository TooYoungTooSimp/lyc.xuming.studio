---
template: post_with_isso
title: LYDSY 1295
pageId: lydsy_1295
---

# LYDSY 1295
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cmath>
#include <cstdio>
#include <cstring>
struct point
{
    int x, y;
} que[1 << 16 | 1];
const int dx[] = {0, 0, 1, -1};
const int dy[] = {1, -1, 0, 0};
int m, n, T, a[33][33], f[33][33];
char buf[35];
double ans;
bool inq[33][33];
inline double dis(const point &l, const point &r)
{
    return sqrt((l.x - r.x) * (l.x - r.x) + (l.y - r.y) * (l.y - r.y));
}
void spfa(const point &s)
{
    int h = 0, t = 0;
    memset(f, 0x3f, sizeof(f));
    memset(inq, 0, sizeof(inq));
    que[t++] = s;
    f[s.x][s.y] = a[s.x][s.y];
    inq[s.x][s.y] = true;
    for (point cur, tmp; h != t; h++)
    {
        cur = que[h];
        inq[cur.x][cur.y] = false;
        for (int i = 0; i < 4; i++)
        {
            tmp.x = cur.x + dx[i], tmp.y = cur.y + dy[i];
            if (tmp.x >= 0 && tmp.x < m && tmp.y >= 0 && tmp.y < n)
                if (f[tmp.x][tmp.y] > f[cur.x][cur.y] + a[tmp.x][tmp.y] &&
                    f[cur.x][cur.y] + a[tmp.x][tmp.y] <= T)
                {
                    f[tmp.x][tmp.y] = f[cur.x][cur.y] + a[tmp.x][tmp.y];
                    if (!inq[tmp.x][tmp.y]) que[t++] = tmp, inq[tmp.x][tmp.y] = true;
                }
        }
    }
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            if (f[i][j] <= T)
                ans = fmax(ans, dis(s, {i, j}));
}
int main()
{
    scanf("%d%d%d\n", &m, &n, &T);
    for (int i = 0; i < n; i++)
    {
        scanf("%s", buf);
        for (int j = 0; j < m; j++)
            a[i][j] = buf[j] - '0';
    }
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            spfa({i, j});
    printf("%.6lf", ans);
    return 0;
}
```
<div id="__comment"></div>
