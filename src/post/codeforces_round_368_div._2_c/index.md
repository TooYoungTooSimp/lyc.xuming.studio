---
template: post_with_isso
title: CODEFORCES ROUND #368 (DIV. 2) C
pageId: codeforces_round_#368_(div._2)_c
---

# CODEFORCES ROUND #368 (DIV. 2) C
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
int main()
{
    long long n;
    scanf("%I64d", &n);
    n == 1 || n == 2 ? printf("-1") : n & 1 ? printf("%I64d %I64d", (n * n - 1) / 2, (n * n + 1) / 2) : printf("%I64d %I64d", (n / 2) * (n / 2) + 1, (n / 2) * (n / 2) - 1);
    return 0;
}

```
<div id="__comment"></div>
