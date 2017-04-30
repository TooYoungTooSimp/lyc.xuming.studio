---
template: post_with_netease
title: CODEFORCES ROUND #374 (DIV. 2) C
pageId: codeforces_round_#374_(div._2)_c
---

# CODEFORCES ROUND #374 (DIV. 2) C

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
const int INF = 0x3f3f3f3f;
const int QSIZE = 2000000;
using namespace std;
typedef struct Edge
{
    int end, len;
    Edge *next;
} * lpEdge;
int F[5001][5001]; ///F[v][j] = min{F[u][j - 1] + t[u][v}
bool B[5001][5001];
int QUEX[2000000];
int QUEY[2000000];
lpEdge V[5001];
lpEdge E[5001];
int n, m, T;
void bfs()
{
    int head, tail;
    head = tail = 0;
    QUEX[tail] = 1;
    QUEY[tail++] = 1;
    B[1][1] = true;
    while (head != tail)
    {
        int i = QUEX[head];
        int j = QUEY[head++];
        B[i][j] = false;
        if (head >= QSIZE)
            head -= QSIZE;
        for (Edge *p = V[i]; p; p = p->next)
        {
            if (F[i][j] + p->len < F[p->end][j + 1])
            {
                F[p->end][j + 1] = F[i][j] + p->len;
                if (!B[p->end][j + 1])
                {
                    B[p->end][j + 1] = true;
                    QUEX[tail] = p->end;
                    QUEY[tail++] = j + 1;
                    if (tail >= QSIZE)
                        tail -= QSIZE;
                }
            }
        }
    }
}
void print(int i, int t, int k)
{
    for (Edge *p = E[i]; p; p = p->next)
    {
        if (t - p->len == F[p->end][k - 1])
        {
            print(p->end, t - p->len, k - 1);
            break;
        }
    }
    printf("%d ", i);
}
int main()
{
    scanf("%d%d%d", &n, &m, &T);
    for (int i = 0, u, v, w; i != m; ++i)
    {
        scanf("%d%d%d", &u, &v, &w);
        Edge *tmp = new Edge();
        tmp->end = v;
        tmp->len = w;
        tmp->next = V[u];
        V[u] = tmp;
        tmp = new Edge();
        tmp->end = u;
        tmp->len = w;
        tmp->next = E[v];
        E[v] = tmp;
    }
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= n; ++j)
            F[i][j] = INF;
    F[1][1] = 0;
    bfs();
    for (int i = n; i >= 2; --i)
        if (F[n][i] <= T)
        {
            printf("%d\n", i);
            print(n, F[n][i], i);
            break;
        }
    return 0;
}

```
