---
template: post_with_netease
title: LYDSY 1047
pageId: lydsy_1047
---

# LYDSY 1047
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
#include <cstring>
inline int min(int a, int b) { return a < b ? a : b; }
inline void readInt(int &x)
{
    int ch = x = 0;
    while (!isdigit(ch = getchar()))
        ;
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
}
int mat[1001][1001], maxn[1001][1001], minn[1001][1001], a, b, n;
struct MQueue
{
    int head, tail, que[1001][2];
    MQueue() : head(0), tail(0) {}
    void insert(int x, int pos)
    {
        while (head < tail && que[tail - 1][0] < x) tail--;
        que[tail][0] = x, que[tail][1] = pos;
        tail++;
        while (head < tail && pos - que[head][1] >= n) head++;
    }
    int top() const { return que[head][0]; }
} MQ[1001];
void gen(int f[1001][1001])
{
    memset(MQ, 0, sizeof(MQ));
    for (int i = 0; i < a; i++)
        for (int j = 0; j < n - 1; j++)
            MQ[i].insert(mat[i][j], j);
    ;
    for (int j = n - 1; j < b; j++)
    {
        for (int i = 0; i < a; i++)
            MQ[i].insert(mat[i][j], j);
        MQueue q;
        for (int i = 0; i < n - 1; i++)
            q.insert(MQ[i].top(), i);
        for (int i = n - 1; i < a; i++)
            q.insert(MQ[i].top(), i),
                f[i][j] = q.top();
    }
}
int main()
{
    readInt(a), readInt(b), readInt(n);
    for (int i = 0; i < a; i++)
        for (int j = 0; j < b; j++)
            readInt(mat[i][j]);
    gen(maxn);
    for (int i = 0; i < a; i++)
        for (int j = 0; j < b; j++)
            mat[i][j] = -mat[i][j];
    gen(minn);
    int ans = 0x3f3f3f3f;
    for (int i = n - 1; i < a; i++)
        for (int j = n - 1; j < b; j++)
            ans = min(ans, maxn[i][j] - -minn[i][j]);
    printf("%d", ans);
    return 0;
}
```
<div id="__comment"></div>
