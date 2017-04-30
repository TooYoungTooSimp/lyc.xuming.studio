---
template: post_with_netease
title: CODEFORCES ROUND #367 (DIV. 2) B
pageId: codeforces_round_#367_(div._2)_b
---

# CODEFORCES ROUND #367 (DIV. 2) B

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
