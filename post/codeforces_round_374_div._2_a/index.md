---
template: post_with_netease
title: CODEFORCES ROUND #374 (DIV. 2) A
pageId: codeforces_round_#374_(div._2)_a
---

# CODEFORCES ROUND #374 (DIV. 2) A
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
char str[10000];
int a[10000];
int main()
{
    int n;
    scanf("%d\n", &n);
    scanf("%s", str);
    str[n] = 'W';
    int cnt = 0, ite = 0, bcnt = 0;
    for (int i = 0; i <= n; i++)
    {
        if (str[i] == 'B')
            bcnt++;
        else if (bcnt != 0)
        {
            a[ite++] = bcnt;
            bcnt = 0;
            cnt++;
        }
    }
    printf("%d\n", cnt);
    for (int i = 0; i < cnt; i++)
        printf("%d ", a[i]);
    return 0;
}
```
<div id="__comment"></div>
