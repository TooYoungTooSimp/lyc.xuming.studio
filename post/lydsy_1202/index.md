---
template: post_with_disqus
title: LYDSY 1202
pageId: lydsy_1202
---

# LYDSY 1202
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
int fa[105], s[105];
int Find(int x)
{
    if (fa[x] != x)
    {
        int fx = fa[x];
        fa[x] = Find(fa[x]);
        s[x] += s[fx];
    }
    return fa[x];
}
int main()
{
    int T;
    scanf("%d", &T);
    while (T--)
    {
        bool flag = true;
        int n, m;
        scanf("%d%d", &n, &m);
        for (int i = 0; i <= n; i++) fa[i] = i, s[i] = 0;
        for (int i = 0, x, y, z; i < m && flag; i++)
        {
            scanf("%d%d%d", &x, &y, &z);
            x--;
            int fx = Find(x), fy = Find(y);
            if (fx != fy)
            {
                fa[fx] = fy;
                s[fx] = s[y] - s[x] + z;
            }
            else if (s[x] - s[y] != z)
                flag = false;
        }
        puts(flag ? "true" : "false");
    }
    return 0;
}
```
<div id="__comment"></div>
