---
template: post_with_isso
title: CODEFORCES ROUND #368 (DIV. 2) A
pageId: codeforces_round_#368_(div._2)_a
---

# CODEFORCES ROUND #368 (DIV. 2) A
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
int main()
{
    int n, m;
    char ch;
    bool flag = false;
    scanf("%d%d", &n, &m);
    for (int i = 0; i < n * m; i++)
    {
        while (!isalpha(ch = getchar()))
            ;
        ch = toupper(ch);
        if (ch == 'C' || ch == 'M' || ch == 'Y') {
            flag = true;
            break;
        }
    }
    printf(flag ? "#Color" : "#Black&White");
    return 0;
}
```
<div id="__comment"></div>
