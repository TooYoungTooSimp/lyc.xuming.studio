---
template: post_with_disqus
title: LYDSY 2257
pageId: lydsy_2257
---

# LYDSY 2257
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <iostream>
#include <map>
using namespace std;
map<int, int> M;
int main()
{
    int n, k;
    cin >> n >> k;
    for (int i = 0, j, x; i < n; i++)
    {
        cin >> x;
        for (j = 1; j * j < x; j++)
            if (x % j == 0) M[j]++, M[x / j]++;
        if (j * j == x) M[j]++;
    }
    for (map<int, int>::reverse_iterator rite = M.rbegin(); rite != M.rend(); rite++)
        if (rite->second >= k)
        {
            cout << rite->first;
            break;
        }
    return 0;
}

```
<div id="__comment"></div>
