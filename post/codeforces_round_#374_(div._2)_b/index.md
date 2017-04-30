---
template: post_with_netease
title: CODEFORCES ROUND #374 (DIV. 2) B
pageId: codeforces_round_#374_(div._2)_b
---

# CODEFORCES ROUND #374 (DIV. 2) B

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <iostream>
#include <numeric>
#include <string>
using namespace std;
string tmp;
int lencnt[1000], reallen;
int n, k;
int main()
{
    cin >> n >> k;
    for (int i = 0; i < n; i++)
    {
        cin >> tmp;
        lencnt[tmp.size()]++;
    }
    cin >> tmp;
    reallen = tmp.size();
    int mincnt = accumulate(lencnt, lencnt + reallen, 0) + 1;
    int maxcnt = accumulate(lencnt, lencnt + reallen + 1, 0);
    int mintime, maxtime;
    mintime = maxtime = 0;
    if (mincnt <= k)
        mintime = mincnt;
    else
        mintime = mincnt + ((mincnt - 1) / k) * 5;
    if (maxcnt <= k)
        maxtime = maxcnt;
    else
        maxtime = maxcnt + ((maxcnt - 1) / k) * 5;
    cout << mintime << " " << maxtime;
    return 0;
}

```
<div id="__comment"></div>
