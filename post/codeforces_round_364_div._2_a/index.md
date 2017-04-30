---
template: post_with_netease
title: CODEFORCES ROUND #364 (DIV. 2) A
pageId: codeforces_round_#364_(div._2)_a
---

# CODEFORCES ROUND #364 (DIV. 2) A
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
int n, sum, tmp;
multimap<int, int> M;
int main()
{
    cin >> n;
    for (int i = 0; i < n; i++)
    {
        cin >> tmp;
        sum += tmp;
        M.insert(make_pair(tmp, i + 1));
    }
    n >>= 1;
    sum /= n;
    multimap<int, int>::iterator ite;
    for (int i = 0; i < n; i++)
    {
        ite = M.begin();
        tmp = sum - ite->first;
        cout << ite->second << " ";
        M.erase(ite);
        ite = M.find(tmp);
        cout << ite->second << endl;
        M.erase(ite);
    }
    return 0;
}
```
<div id="__comment"></div>
