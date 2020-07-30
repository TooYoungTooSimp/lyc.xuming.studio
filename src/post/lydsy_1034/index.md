---
template: post_with_isso
title: LYDSY 1034
pageId: lydsy_1034
---

# LYDSY 1034
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <algorithm>
#include <cctype>
#include <cstdio>
using namespace std;
inline void readInt(int &x)
{
    int ch = x = 0;
    while (!isdigit(ch = getchar()))
        ;
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
}
int n, zj[100001], jr[100001];
int calc(int *A, int *B)
{
    int ret = 0;
    int la = 0, lb = 0, ra = n - 1, rb = n - 1;
    while (la <= ra)
        if (A[ra] < B[lb])
            break;
        else if (A[la] > B[lb])
            la++, lb++, ret += 2;
        else if (A[ra] > B[rb])
            ra--, rb--, ret += 2;
        else if (A[la++] == B[rb--])
            ret++;
    return ret;
}
int main()
{
    readInt(n);
    for (int i = 0; i < n; i++) readInt(zj[i]);
    for (int i = 0; i < n; i++) readInt(jr[i]);
    sort(zj, zj + n);
    sort(jr, jr + n);
    printf("%d %d", calc(zj, jr), (n << 1) - calc(jr, zj));
    return 0;
}
```
<div id="__comment"></div>
