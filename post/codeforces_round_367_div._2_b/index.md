---
template: post_with_disqus
title: CODEFORCES ROUND #367 (DIV. 2) B
pageId: codeforces_round_#367_(div._2)_b
---

# CODEFORCES ROUND #367 (DIV. 2) B
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <algorithm>
#include <cstdio>
using namespace std;
int main()
{
    int n, m;
    scanf("%d", &n);
    int *arr = new int[n];
    for (int i = 0; i < n; i++)
        scanf("%d", &arr[i]);
    sort(arr, arr + n);
    scanf("%d", &m);
    for (int i = 0, tmp; i < m; i++)
    {
        scanf("%d", &tmp);
        printf("%d\n", upper_bound(arr, arr + n, tmp) - arr);
    }
    return 0;
}
```
<div id="__comment"></div>
