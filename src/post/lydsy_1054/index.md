---
template: post_with_isso
title: LYDSY 1054
pageId: lydsy_1054
---

# LYDSY 1054
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
int s, t, que[1 << 16 | 1], vis[1 << 16 | 1], head, tail;
int a[4][4];
const int dx[] = {1, 0, -1, 0};
const int dy[] = {0, -1, 0, 1};
inline void unzip(int x)
{
    for (int i = 3; i >= 0; i--)
        for (int j = 3; j >= 0; j--)
            a[i][j] = x & 1, x >>= 1;
}
inline int zip()
{
    int ret = 0;
    for (int i = 0; i < 4; i++)
        for (int j = 0; j < 4; j++)
            ret = (ret << 1) | a[i][j];
    return ret;
}
int main()
{
    for (int i = 0, ch; i < 16; i++)
    {
        while (!isdigit(ch = getchar()))
            ;
        s = (s << 1) | (ch == '1');
    }
    for (int i = 0, ch; i < 16; i++)
    {
        while (!isdigit(ch = getchar()))
            ;
        t = (t << 1) | (ch == '1');
    }
    que[tail++] = s;
    for (int x, tmp; head ^ tail; head++)
    {
        x = que[head];
        if (x == t) break;
        unzip(x);
        for (int i = 0; i < 4; i++)
            for (int j = 0; j < 4; j++)
                if (a[i][j])
                    for (int d = 0; d < 4; d++)
                    {
                        i += dx[d], j += dy[d];
                        if (i >= 0 && i <= 3 && j >= 0 && j <= 3 && a[i][j] == 0)
                        {
                            a[i - dx[d]][j - dy[d]] = 0, a[i][j] = 1;
                            tmp = zip();
                            if (!vis[tmp]) vis[que[tail++] = tmp] = vis[x] + 1;
                            a[i - dx[d]][j - dy[d]] = 1, a[i][j] = 0;
                        }
                        i -= dx[d], j -= dy[d];
                    }
    }
    printf("%d", vis[t]);
    return 0;
}
```
<div id="__comment"></div>
