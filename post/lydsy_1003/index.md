---
template: post_with_netease
title: LYDSY 1003
pageId: lydsy_1003
---

# LYDSY 1003

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
inline int min(int a, int b) { return a < b ? a : b; }
int next[410], to[410], len[410], G[21], e_idx;
int que[100001], head, tail;
bool inque[21], isbad[21], cant[21][101];
int cost[110][110], f[101];
inline void addEdge(int f, int t, int l)
{
    e_idx++;
    to[e_idx] = t;
    len[e_idx] = l;
    next[e_idx] = G[f];
    G[f] = e_idx;
}
void spfa(int s)
{
    memset(inque, 0, sizeof(inque));
    memset(f, 0x3f, sizeof(f));
    head = tail = 0;
    f[s] = 0;
    que[tail++] = s;
    inque[s] = true;
    while (head < tail)
    {
        int x = que[head++];
        inque[x] = false;
        for (int i = G[x]; i; i = next[i])
            if (!isbad[to[i]])
                if (f[to[i]] > f[x] + len[i])
                {
                    f[to[i]] = f[x] + len[i];
                    if (!inque[to[i]]) inque[que[tail++] = to[i]] = true;
                }
    }
}
int main()
{
    int n, m, k, e, d;
    scanf("%d%d%d%d", &n, &m, &k, &e);
    for (int i = 0, x, y, z; i < e; i++)
    {
        scanf("%d%d%d", &x, &y, &z);
        addEdge(x, y, z);
        addEdge(y, x, z);
    }
    scanf("%d", &d);
    for (int i = 0, x, y, z; i < d; i++)
    {
        scanf("%d%d%d", &x, &y, &z);
        for (int j = y; j <= z; j++)
            cant[x][j] = true;
    }
    for (int i = 1; i <= n; i++)
        for (int j = i; j <= n; j++)
        {
            memset(isbad, 0, sizeof(isbad));
            for (int x = 2; x < m; x++)
                for (int y = i; y <= j; y++)
                    if (cant[x][y])
                    {
                        isbad[x] = true;
                        break;
                    }
            spfa(1);
            cost[i][j] = f[m] * (f[m] > 0x3f3f3f3f >> 1 ? 1 : j - i + 1);
        }
    memset(f, 0x3f, sizeof(f));
    f[0] = 0;
    for (int i = 1; i <= n; i++)
        for (int j = 0; j < i; j++)
            f[i] = min(f[i], f[j] + cost[j + 1][i] + k);
    printf("%d", f[n] - k);
    return 0;
}
```
<div id="__comment"></div>
