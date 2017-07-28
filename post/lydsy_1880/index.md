---
template: post_with_isso
title: LYDSY 1880
pageId: lydsy_1880
---

# LYDSY 1880
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
inline int abs(int x) { return x >= 0 ? x : -1; }
inline int max(int a, int b) { return a > b ? a : b; }
int head[1510], next[1000010], to[1000010], len[1000010], ecnt, ans;
int disS1[1510], disS2[1510], disE1[1510], disE2[1510], que[1000010];
bool inq[1510];
inline void addEdge(int f, int t, int l)
{
    ecnt++;
    next[ecnt] = head[f];
    head[f] = ecnt;
    to[ecnt] = t;
    len[ecnt] = l;
}
void spfa(int s, int *dis)
{
    memset(inq, 0, sizeof(inq));
    int h, t, x;
    h = t = x = 0;
    for (dis[s] = 0, que[t++] = s, inq[s] = true; h ^ t; inq[que[h++]] = false)
        for (int cur = head[que[h]]; cur; cur = next[cur])
            if (dis[to[cur]] > dis[que[h]] + len[cur])
            {
                dis[to[cur]] = dis[que[h]] + len[cur];
                if (!inq[to[cur]]) que[t++] = to[cur], inq[to[cur]] = true;
            }
}
int main()
{
    memset(disS1, 0x3f3f3f3f, sizeof(disS1));
    memset(disS2, 0x3f3f3f3f, sizeof(disS2));
    memset(disE1, 0x3f3f3f3f, sizeof(disE1));
    memset(disE2, 0x3f3f3f3f, sizeof(disE2));
    int n, m, x1, y1, x2, y2;
    scanf("%d%d%d%d%d%d", &n, &m, &x1, &y1, &x2, &y2);
    for (int i = 0, x, y, z; i < m; i++)
    {
        scanf("%d%d%d", &x, &y, &z);
        addEdge(x, y, z);
        addEdge(y, x, z);
    }
    spfa(x1, disS1), spfa(x2, disS2), spfa(y1, disE1), spfa(y2, disE2);
    int len1 = disS1[y1], len2 = disS2[y2];
    for (int i = 1; i <= n; i++)
        if (disS1[i] + disE1[i] == len1 && disS2[i] + disE2[i] == len2)
            for (int j = 1; j <= n; j++)
                if (disS1[j] + disE1[j] == len1 && disS2[j] + disE2[j] == len2)
                    ans = max(ans, abs(disS1[i] - disS1[j]));
    printf("%d", ans);
    return 0;
}
```
<div id="__comment"></div>
