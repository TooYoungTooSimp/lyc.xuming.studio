---
template: post_with_netease
title: LYDSY 1001
pageId: lydsy_1001
---

# LYDSY 1001

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
#include <queue>
int pathlen[3000001];
bool inque[3000001];
typedef struct Edge
{
    int to, len;
    Edge *next;
    Edge(int t, int l, Edge *n) : to(t), len(l), next(n) {}
} * lpEdge;
lpEdge G[3000001];
#define addEdge(x, y, z) G[x] = new Edge(y, z, G[x])
#define addEdge2(x, y, z) addEdge(x, y, z), addEdge(y, x, z)
void spfa(int s)
{
    std::queue<int> Q;
    memset(pathlen, 0x3f, sizeof(pathlen));
    memset(inque, 0, sizeof(inque));
    inque[s] = true;
    pathlen[s] = 0;
    Q.push(s);
    while (!Q.empty())
    {
        int x = Q.front();
        Q.pop();
        inque[x] = false;
        for (lpEdge cur = G[x]; cur; cur = cur->next)
            if (pathlen[cur->to] > pathlen[x] + cur->len)
            {
                pathlen[cur->to] = pathlen[x] + cur->len;
                if (!inque[cur->to]) inque[cur->to] = true, Q.push(cur->to);
            }
    }
}
int main()
{
    int n, m;
    scanf("%d%d", &n, &m);
    if (n == 1 || m == 1)
        if (n == 1 && m == 1)
            putchar(0);
        else
        {
            int ans = 0x3f3f3f3f;
            for (int i = n > m ? n : m, x; i; i--)
            {
                scanf("%d", &x);
                if (x < ans) ans = x;
            }
            printf("%d", ans);
        }
    else
    {
        int target = (n - 1) * (m - 1) * 2 + 1, x;
        for (int i = 1; i < m; i++)
        {
            scanf("%d", &x);
            addEdge2(2 * i, target, x);
        }
        for (int i = 1; i < n - 1; i++)
            for (int j = 1; j < m; j++)
            {
                scanf("%d", &x);
                addEdge2((i - 1) * ((m - 1) << 1) + j * 2 - 1,
                         i * ((m - 1) << 1) + j * 2, x);
            }
        for (int i = 1; i < m; i++)
        {
            scanf("%d", &x);
            addEdge2(0, (n - 2) * ((m - 1) << 1) + i * 2 - 1, x);
        }
        for (int i = 1; i < n; i++)
        {
            scanf("%d", &x);
            addEdge2(0, (i - 1) * ((m - 1) << 1) + 1, x);
            for (int j = 1; j < m - 1; j++)
            {
                scanf("%d", &x);
                addEdge2((i - 1) * ((m - 1) << 1) + j * 2,
                         (i - 1) * ((m - 1) << 1) + j * 2 + 1, x);
            }
            scanf("%d", &x);
            addEdge2(target, i * ((m - 1) << 1), x);
        }
        for (int i = 1; i < n; i++)
            for (int j = 1; j < m; j++)
            {
                scanf("%d", &x);
                addEdge2((i - 1) * ((m - 1) << 1) + (j - 1) * 2 + 1,
                         (i - 1) * ((m - 1) << 1) + (j - 1) * 2 + 2, x);
            }
        spfa(0);
        printf("%d", pathlen[target]);
    }
    return 0;
}
```
