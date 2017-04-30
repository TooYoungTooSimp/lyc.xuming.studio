---
template: post_with_netease
title: LYDSY 1412
pageId: lydsy_1412
---

# LYDSY 1412

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
inline int min(int a, int b) { return a < b ? a : b; }
const int maxn = 10010, maxm = 100005, inf = 0x3f3f3f3f;
int head[maxn], next[maxm], to[maxm], cap[maxm], ecnt, cnt, a[110][110];
int num[maxn], dis[maxn], fa[maxn], que[maxm], cur[maxn];
int dx[] = {0, 1, 0, -1};
int dy[] = {1, 0, -1, 0};
inline void addEdge_impl_(int f, int t, int c)
{
    next[ecnt] = head[f];
    head[f] = ecnt;
    to[ecnt] = t;
    cap[ecnt] = c;
    ecnt++;
}
inline void addEdge(int f, int t, int c)
{
    addEdge_impl_(f, t, c);
    addEdge_impl_(t, f, 0);
}
int ISAP(int s, int e)
{
    int flow = 0;
    int h = 0, t = 0, x;
    for (int i = 0; i <= cnt; i++) dis[i] = cnt;
    dis[que[t++] = e] = 0;
    while (h != t)
        for (int i = head[x = que[h++]]; ~i; i = next[i])
            if (cap[i ^ 1] > 0 && dis[to[i]] > dis[x] + 1)
                dis[que[t++] = to[i]] = dis[x] + 1;
    memset(num, 0, sizeof(num));
    for (int i = 0; i <= cnt; i++) num[dis[i]]++, cur[i] = head[i];
    x = s;
    while (dis[s] < cnt)
    {
        if (x == e)
        {
            int curFlow = 0x3f3f3f3f;
            for (x = e; x != s; x = to[fa[x] ^ 1])
                curFlow = min(curFlow, cap[fa[x]]);
            for (x = e; x != s; x = to[fa[x] ^ 1])
                cap[fa[x]] -= curFlow, cap[fa[x] ^ 1] += curFlow;
            flow += curFlow;
            x = s;
        }
        bool needRetreat = true;
        for (int i = cur[x]; needRetreat && ~i; i = next[i])
            if (cap[i] && dis[to[i]] == dis[x] - 1)
                needRetreat = false, cur[x] = i, fa[x = to[i]] = i;
        if (needRetreat)
        {
            int mn = cnt - 1;
            for (int i = head[x]; ~i; i = next[i])
                if (cap[i]) mn = min(mn, dis[to[i]]);
            if (--num[dis[x]] == 0) break;
            num[dis[x] = mn + 1]++;
            cur[x] = head[x];
            if (x != s) x = to[fa[x] ^ 1];
        }
    }
    return flow;
}
int main()
{
    memset(head, -1, sizeof(head));
    int n, m;
    scanf("%d%d", &n, &m);
    int S = 0, T = n * m + 1;
    cnt = T + 1;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
        {
            scanf("%d", &a[i][j]);
            if (a[i][j] == 1)
                addEdge(S, (i - 1) * m + j, inf);
            if (a[i][j] == 2)
                addEdge((i - 1) * m + j, T, inf);
        }
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
        {
            for (int k = 0; k < 4; k++)
            {
                int x = i + dx[k], y = j + dy[k];
                if (x > n || x < 1 || y > m || y < 1)
                    continue;
                if (a[i][j] == 1)
                    if (a[i][j] != a[x][y])
                        addEdge((i - 1) * m + j, (x - 1) * m + y, 1);
                if (a[i][j] == 2)
                    if (a[x][y] == 0)
                        addEdge((x - 1) * m + y, (i - 1) * m + j, 1);
                if (a[i][j] == a[x][y] && a[i][j] == 0)
                    addEdge((i - 1) * m + j, (x - 1) * m + y, 1);
            }
        }
    printf("%d\n", ISAP(S, T));
    return 0;
}
```
