---
template: post_with_disqus
title: CODEFORCES ROUND #365 (DIV. 2) B
pageId: codeforces_round_#365_(div._2)_b
---

# CODEFORCES ROUND #365 (DIV. 2) B
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
int c[100000];
bool iscap[100000];
int n, k, sum;
long long ans;
int main()
{
    scanf("%d%d", &n, &k);
    for (int i = 0; i < n; i++)
        scanf("%d", c + i), sum += c[i];
    return 0;
}
```
<div id="__comment"></div>
