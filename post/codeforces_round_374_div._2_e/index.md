---
template: post_with_disqus
title: CODEFORCES ROUND #374 (DIV. 2) E
pageId: codeforces_round_#374_(div._2)_e
---

# CODEFORCES ROUND #374 (DIV. 2) E
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
int l, n, p, t;
int seg[100010][2];
inline int max(int a, int b) { return a > b ? a : b; }
int getPos(int x)
{
    int l = 0, r = n, m;
    while (l < r)
    {
        m = (l + r) >> 1;
        if (x >= seg[m][0] && x <= seg[m][1])
            break;
        else if (x < seg[m][0])
            r = m;
        else
            l = m + 1;
    }
    return m;
}
int main()
{
    memset(seg, 0x3f3f3f3f, sizeof(seg));
    scanf("%d%d%d%d", &l, &n, &p, &t);
    for (int i = 0; i < n; i++)
        scanf("%d%d", &seg[i][0], &seg[i][1]);
    int cnt = 0, curcnt = 0;
    int posx = max(0, seg[0][0]), posid = getPos(0);
    while (posx <= l)
    {
        curcnt = (seg[posid][1] - posx) / p;
        cnt += curcnt;
        if (curcnt)
        {
            posx = posx + curcnt * p + t;
            posx = max(posx, seg[posid = getPos(posx)][0]);
        }
        else
            posx = seg[++posid][0];
    }
    printf("%d", cnt);
    return 0;
}

```
<div id="__comment"></div>
