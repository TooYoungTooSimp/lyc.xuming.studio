---
template: post_with_disqus
title: CODEFORCES ROUND #364 (DIV. 2) C
pageId: codeforces_round_#364_(div._2)_c
---

# CODEFORCES ROUND #364 (DIV. 2) C
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
int n, types, l, r, tmp, ans;
char str[100000];
int cnt[56];
bool has[56];
inline int min(int aa, int bb) { return (aa < bb ? aa : bb); }
inline int ch2int(char ch)
{
    if (ch >= 'a')
        return ch - 'a' + 26;
    else
        return ch - 'A';
}
int main()
{
    ans = 1 << 30;
    scanf("%d%s", &n, str);
    for (int i = 0; i < n; i++)
    {
        tmp = ch2int(str[i]);
        if (!has[tmp])
            types++, has[tmp] = true;
    }
    memset(has, 0, sizeof(has));
    while (types)
    {
        tmp = ch2int(str[r]);
        if (!has[tmp])
            types--, has[tmp] = true;
        cnt[tmp]++;
        r++;
    }
    for (; l < r; l++)
        if (--cnt[ch2int(str[l])] == 0) break;
    cnt[ch2int(str[l])]++;
    ans = min(ans, r - l);
    while (r < n)
    {
        cnt[ch2int(str[r])]++;
        if (str[l] == str[r])
        {
            for (; l < r; l++)
                if (--cnt[ch2int(str[l])] == 0) break;
            cnt[ch2int(str[l])]++;
            ans = min(ans, r - l + 1);
        }
        r++;
    }
    printf("%d", ans);
    return 0;
}
```
<div id="__comment"></div>
