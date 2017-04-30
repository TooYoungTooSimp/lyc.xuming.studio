---
template: post_with_netease
title: CODEFORCES ROUND #366 (DIV. 2) C
pageId: codeforces_round_#366_(div._2)_c
---

# CODEFORCES ROUND #366 (DIV. 2) C

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <queue>
using namespace std;
int n, q, op, x, unread;
int rem[300001], msg[300001], pre, msgi;
queue<int> app[300001];
bool vis[300001];
int main()
{
    scanf("%d%d", &n, &q);
    for (int i = 1; i <= q; i++)
    {
        scanf("%d%d", &op, &x);
        if (op == 1)
        {
            unread++;
            rem[x]++;
            msgi++;
            msg[msgi] = x;
            app[x].push(msgi);
        }
        else if (op == 2)
        {
            unread -= rem[x];
            rem[x] = 0;
            while (!app[x].empty())
            {
                vis[app[x].front()] = true;
                app[x].pop();
            }
        }
        else if (op == 3)
        {
            if (x > pre)
            {
                for (int j = pre + 1; j <= x; j++)
                    if (vis[j])
                        continue;
                    else
                    {
                        unread--;
                        rem[msg[j]]--;
                        app[msg[j]].pop();
                    }
                pre = x;
            }
        }
        printf("%d\n", unread);
    }
    return 0;
}
```
