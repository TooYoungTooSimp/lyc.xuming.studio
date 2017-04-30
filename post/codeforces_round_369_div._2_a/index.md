---
template: post_with_netease
title: CODEFORCES ROUND #369 (DIV. 2) A
pageId: codeforces_round_#369_(div._2)_a
---

# CODEFORCES ROUND #369 (DIV. 2) A
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
char seat[1001][6];
int main()
{
    int n;
    bool flag = false;
    scanf("%d", &n);
    for (int i = 0; i < n; i++)
        scanf("%s", &seat[i]);
    for (int i = 0; i < n; i++)
        if (seat[i][0] == 'O' && seat[i][1] == 'O')
        {
            seat[i][0] = seat[i][1] = '+';
            flag = true;
            break;
        }
        else if (seat[i][3] == 'O' && seat[i][4] == 'O')
        {
            seat[i][3] = seat[i][4] = '+';
            flag = true;
            break;
        }
    if (flag)
    {
        printf("YES\n");
        for (int i = 0; i < n; i++)
            printf("%s\n", seat[i]);
    }
    else
        printf("NO");
    return 0;
}
```
<div id="__comment"></div>
