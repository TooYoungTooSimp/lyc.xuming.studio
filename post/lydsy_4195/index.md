---
template: post_with_netease
title: LYDSY 4195
pageId: lydsy_4195
---

# LYDSY 4195
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
#include <map>
inline void readInt(int &x)
{
    int ch = x = 0;
    while (!isdigit(ch = getchar()))
        ;
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
}
int fa[2000010], I[1000010], J[1000010], E[1000010];
int Find(int x) { return fa[x] == x ? x : fa[x] = Find(fa[x]); }
int main()
{
    int t, n;
    readInt(t);
    while (t--)
    {
        readInt(n);
        for (int i = 0; i < 200005; i++) fa[i] = i;
        std::map<int, int> H;
        for (int i = 0; i < n; i++)
        {
            readInt(I[i]), readInt(J[i]), readInt(E[i]);
            if (H.find(I[i]) == H.end()) H[I[i]] = H.size() + 1;
            if (H.find(J[i]) == H.end()) H[J[i]] = H.size() + 1;
            if (H.find(E[i]) == H.end()) H[E[i]] = H.size() + 1;
        }
        for (int i = 0, x, y; i < n; i++)
            if (E[i])
                if ((x = Find(H[I[i]])) != (y = Find(H[J[i]]))) fa[x] = y;
        bool flag = true;
        for (int i = 0, x, y; i < n && flag; i++)
            if (E[i] ^ 1)
                if ((x = Find(H[I[i]])) == (y = Find(H[J[i]]))) flag = false;
        puts(flag ? "YES" : "NO");
    }
    return 0;
}
```
<div id="__comment"></div>
