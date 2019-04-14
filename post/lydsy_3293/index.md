---
template: post_with_isso
title: LYDSY 3293
pageId: lydsy_3293
---

# LYDSY 3293
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
#include <cstring>
#include <numeric>
typedef long long int64;
template <typename T>
inline void readInt(T &x)
{
    int ch = x = 0;
    while (!isdigit(ch = getchar()))
        ;
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
}
int64 *A, *C;
int main()
{
    int n;
    readInt(n);
    A = new int64[n + 10];
    C = new int64[n + 10];
    memset(A, 0, sizeof(int64) * (n + 10));
    memset(C, 0, sizeof(int64) * (n + 10));
    for (int i = 0; i < n; i++) readInt(A[i]);
    int64 tmp = std::accumulate(A, A + n, 0ll) / n;
    for (int i = 1; i < n; i++)
        C[i] = C[i - 1] + tmp - A[i];
    std::nth_element(C, C + (n >> 1), C + n);
    tmp = 0;
    for (int i = 0; i < n; i++)
        tmp += std::abs(C[i] - C[n >> 1]);
    printf("%lld", tmp);
    return 0;
}
```
<div id="__comment"></div>
