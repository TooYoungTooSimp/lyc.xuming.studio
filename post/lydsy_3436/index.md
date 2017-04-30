---
template: post_with_netease
title: LYDSY 3436
pageId: lydsy_3436
---

# LYDSY 3436

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
int head[10010], next[10010], to[10010], len[10010], ecnt, n, m, dis[10010];
bool flag, inq[10010];
inline void addEdge(int f, int t, int l)
{
    ecnt++;
    next[ecnt] = head[f];
    head[f] = ecnt;
    to[ecnt] = t;
    len[ecnt] = l;
}
void dfs(int x)
{
    if (flag) return;
    inq[x] = true;
    for (int cur = head[x]; cur; cur = next[cur])
        if (dis[to[cur]] > dis[x] + len[cur])
        {
            dis[to[cur]] = dis[x] + len[cur];
            if (!inq[to[cur]])
                dfs(to[cur]);
            else
            {
                flag = true;
                return;
            }
        }
    inq[x] = false;
}
int main()
{
    memset(dis, 0x3f3f3f3f, sizeof(dis));
    scanf("%d%d", &n, &m);
    for (int i = 0, op, x, y, z; i < m; i++)
    {
        scanf("%d%d%d", &op, &x, &y);
        if (op == 1) scanf("%d", &z), addEdge(x, y, -z);
        if (op == 2) scanf("%d", &z), addEdge(y, x, z);
        if (op == 3) addEdge(x, y, 0);
    }
    for (int i = 1; i <= n; i++)
        dis[i] = 0, dfs(i);
    puts(flag ? "No" : "Yes");
    return 0;
}
```
