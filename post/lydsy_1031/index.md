---
template: post_with_disqus
title: LYDSY 1031
pageId: lydsy_1031
---

# LYDSY 1031
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
const int N = int(2e5 + 3);
char str[N];
int sa[N], rank[N], height[N], c[N];
template <typename T>
inline void swap(T &x, T &y)
{
    T t = x;
    x = y;
    y = t;
}
inline bool In_equal(const int *x, const int i, const int j, const int k, const int n)
{
    int ti = i + k < n ? x[i + k] : -1, tj = j + k < n ? x[j + k] : -1;
    return x[i] == x[j] && ti == tj;
}
int main()
{
    scanf("%s", str);
    int len = int(strlen(str));
    memcpy(str + len, str, len);
    len <<= 1;
    int *x = rank, *y = height, r = 256, yn;
    for (int i = 0; i < r; ++i) c[i] = 0;
    for (int i = 0; i < len; ++i) ++c[str[i]];
    for (int i = 1; i < r; ++i) c[i] += c[i - 1];
    for (int i = len - 1; i >= 0; --i) sa[--c[str[i]]] = i;
    r = 1;
    x[sa[0]] = 0;
    for (int i = 1; i < len; ++i)
        x[sa[i]] = str[sa[i]] == str[sa[i - 1]] ? r - 1 : r++;
    for (int k = 1; r < len; k <<= 1)
    {
        yn = 0;
        for (int i = len - k; i < len; ++i) y[yn++] = i;
        for (int i = 0; i < len; ++i)
            if (sa[i] >= k) y[yn++] = sa[i] - k;
        for (int i = 0; i < r; ++i) c[i] = 0;
        for (int i = 0; i < len; ++i) ++c[x[y[i]]];
        for (int i = 1; i < r; ++i) c[i] += c[i - 1];
        for (int i = len - 1; i >= 0; --i) sa[--c[x[y[i]]]] = y[i];
        swap(x, y);
        r = 1;
        x[sa[0]] = 0;
        for (int i = 1; i < len; ++i)
            x[sa[i]] = In_equal(y, sa[i], sa[i - 1], k, len) ? r - 1 : r++;
    }
    for (int i = 0; i < len; ++i) rank[i] = x[i];
    for (int i = 0; i < len; i++)
        if (sa[i] < len >> 1)
            putchar(str[sa[i] + (len >> 1) - 1]);
    return 0;
}
```
<div id="__comment"></div>
