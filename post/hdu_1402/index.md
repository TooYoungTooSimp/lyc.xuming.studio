---
template: post_with_isso
title: HDU 1402
pageId: hdu_1402
---

# HDU 1402
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cmath>
#include <cstdio>
#include <cstring>
const int N = 500005;
const double pi = acos(-1);
struct complex
{
    double r, i;
} a[N], b[N];
inline complex operator+(const complex &x, const complex &y)
{
    return { x.r + y.r, x.i + y.i };
}
inline complex operator-(const complex &x, const complex &y)
{
    return { x.r - y.r, x.i - y.i };
}
inline complex operator*(const complex &x, const complex &y)
{
    return { x.r * y.r - x.i * y.i, x.r * y.i + x.i * y.r };
}
char s1[N], s2[N];
int ans[N];
void Rader(complex *F, int len)
{
    complex t;
    int j = len >> 1;
    for (int i = 1; i < len - 1; i++)
    {
        if (i < j)
            t = F[i], F[i] = F[j], F[j] = t;
        int k = len >> 1;
        while (j >= k)
            j -= k, k >>= 1;
        if (j < k)
            j += k;
    }
}
void fft(complex *F, int len, int flag)
{
    Rader(F, len);
    for (int h = 2; h <= len; h <<= 1)
    {
        const complex wn = { cos(-flag * 2 * pi / h), sin(-flag * 2 * pi / h) };
        for (int j = 0; j < len; j += h)
        {
            complex w = { 1, 0 };
            int m = h >> 1;
            for (int k = j; k < j + m; k++, w = w * wn)
            {
                complex u = F[k], t = w * F[k + m];
                F[k] = u + t, F[k + m] = u - t;
            }
        }
    }
}
int main()
{
    while (~scanf("%s%s", s1, s2))
    {
        int len1, len2, len;
        memset(a, 0, sizeof(a));
        memset(b, 0, sizeof(b));
        memset(ans, 0, sizeof(ans));
        len1 = (int)strlen(s1) << 1, len2 = (int)strlen(s2) << 1;
        for (len = 1; len < len1 || len < len2;)
            len <<= 1;
        len1 >>= 1, len2 >>= 1;
        for (int i = 0; i < len1; i++)
            a[i].r = s1[len1 - 1 - i] - '0';
        for (int i = 0; i < len2; i++)
            b[i].r = s2[len2 - 1 - i] - '0';
        fft(a, len, 1);
        fft(b, len, 1);
        for (int i = 0; i < len; i++)
            a[i] = a[i] * b[i];
        fft(a, len, -1);
        for (int i = 0; i < len; i++)
            ans[i] = int(a[i].r / len + 0.5);
        for (int i = 0; i < len; i++)
            ans[i + 1] += ans[i] / 10, ans[i] %= 10;
        int high = 0;
        for (int i = len - 1; high == 0 && i >= 0; i--)
            if (ans[i])
                high = i;
        for (int i = high; i >= 0; i--)
            putchar(ans[i] + '0');
        putchar('\n');
    }
    return 0;
}
```
<div id="__comment"></div>
