---
template: post_with_netease
title: LYDSY 1002
pageId: lydsy_1002
---

# LYDSY 1002
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
#include <cstdlib>
#include <cstring>
int f[101][101];
const int L = 1 << 8;
char buffer[L], *S, *T;
#define bufferInit()                                   \
    ;                                                  \
    {                                                  \
        T = (S = buffer) + fread(buffer, 1, L, stdin); \
        while (!isdigit(*T)) T--;                      \
        T++;                                           \
    }
#define getint() (S != T ? strtol(S, &S, 10) : -1)
void optimize(int *a)
{
    for (int i = 0; i < 100; i++)
    {
        while (a[i] < 0) a[i] += 10, a[i + 1]--;
        a[i + 1] += a[i] / 10;
        a[i] %= 10;
    }
}
void add(int *a, int b)
{
    a[0] += b;
}
void mul(int *a, int b)
{
    for (int i = 0; i < 100; i++)
        a[i] *= b;
}
void sub(int *a, int *b)
{
    for (int i = 0; i < 100; i++)
        a[i] -= b[i];
}
int main()
{
    bufferInit();
    f[1][0] = 1;
    f[2][0] = 5;
    int n = getint();
    for (int i = 3; i <= n; i++)
    {
        memmove(f[i], f[i - 1], sizeof(int) * 101);
        mul(f[i], 3);
        sub(f[i], f[i - 2]);
        add(f[i], 2);
        optimize(f[i]);
    }
    int *ans = f[n];
    optimize(ans);
    int i = 100;
    for (; ans[i] == 0 && i >= 0; i--)
        ;
    for (; i >= 0; i--) putchar(ans[i] + '0');
    return 0;
}

```
<div id="__comment"></div>
