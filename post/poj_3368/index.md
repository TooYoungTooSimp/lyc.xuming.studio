---
template: post_with_disqus
title: POJ 3368
pageId: poj_3368
---

# POJ 3368
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
#include <cstring>
inline void read(int &x)
{
    int ch = x = 0, flag = 1;
    while (!isdigit(ch = getchar()))
        if (ch == '-') flag = -1;
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
    x *= flag;
}
inline int max(int x, int y) { return x > y ? x : y; }
int L[100010], R[100010], C[100010], P[100010], F[100010][18], Log[100010];
int main()
{
    Log[0] = -1;
    for (int i = 1; i < 100010; i++) Log[i] = Log[i >> 1] + 1;
    int n, q;
    while (read(n), n)
    {
        memset(C, 0, sizeof(C));
        read(q);
        int bcnt = 0;
        for (int i = 1, prev = -0x3f3f3f3f, now; i <= n; i++)
        {
            read(now);
            if (now != prev)
                bcnt++, L[bcnt] = i, R[bcnt - 1] = i - 1;
            C[bcnt]++;
            P[i] = bcnt;
            prev = now;
        }
        R[bcnt] = n;
        for (int i = 1; i <= bcnt; i++) F[i][0] = C[i];
        for (int j = 1; (1 << j) <= bcnt; j++)
            for (int i = 1; i <= bcnt; i++)
                F[i][j] = max(F[i][j - 1], F[i + (1 << (j - 1))][j - 1]);
        while (q--)
        {
            int x, y;
            read(x), read(y);
            if (P[y] > P[x])
            {
                int ans = max(R[P[x]] - x + 1, y - L[P[y]] + 1);
                int bx = P[x] + 1, by = P[y] - 1;
                if (by >= bx)
                {
                    int k = Log[by - bx + 1];
                    ans = max(ans, max(F[bx][k], F[by - (1 << k) + 1][k]));
                }
                printf("%d\n", ans);
            }
            else
                printf("%d\n", y - x + 1);
        }
    }
    return 0;
}
```
<div id="__comment"></div>
