---
template: post_with_isso
title: LYDSY 1789
pageId: lydsy_1789
---

# LYDSY 1789
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
inline int min(int a, int b) { return a < b ? a : b; }
int l[3], lcp, ans, sum;
char s[3][60];
int main()
{
    scanf("%d%s%d%s%d%s", &l[0], s[0], &l[1], s[1], &l[2], s[2]);
    ans = sum = l[0] + l[1] + l[2];
    while (lcp < min(l[0], min(l[1], l[2])) && s[0][lcp] == s[1][lcp] && s[1][lcp] == s[2][lcp]) lcp++;
    for (int i = 0; i < 3; i++)
        for (int j = i + 1; j < 3; j++)
        {
            int lcp2 = lcp;
            while (lcp2 < min(l[i], l[j]) && s[i][lcp2] == s[j][lcp2]) lcp2++;
            ans = min(ans, (l[i] - lcp2) + (l[j] - lcp2) + (sum - l[i] - l[j] - lcp) + (lcp2 - lcp));
        }
    printf("%d", ans);
    return 0;
}
```
<div id="__comment"></div>
