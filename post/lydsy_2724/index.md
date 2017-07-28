---
template: post_with_isso
title: LYDSY 2724
pageId: lydsy_2724
---

# LYDSY 2724
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <algorithm>
#include <cctype>
#include <cmath>
#include <cstdio>
#include <cstring>
inline void read(int &x)
{
    int ch = x = 0;
    while (!isdigit(ch)) ch = getchar();
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
}
const int B = 205, N = B * B, inf = 0x3f3f3f3f;
int n, q, S, bcnt, a[N], b[N], cnt[N][B], f[B][B], cnt2[N], vis[N];
bool isR[N];
int main()
{
    memset(vis, -1, sizeof(vis));
    read(n), read(q), S = (int)sqrt(n);
    for (int i = 0; i < n; i++) read(a[i]);
    memcpy(b, a, n << 2);
    std::sort(b, b + n);
    int m = int(std::unique(b, b + n) - b);
    for (int i = 0; i < n; i++) a[i] = int(std::lower_bound(b, b + m, a[i]) - b);
    for (int i = 0, bidx = 0; i < n; i++, bidx++)
    {
        if (bidx == S) bidx = 0, bcnt++, isR[i - 1] = true;
        cnt[a[i]][bcnt]++;
    }
    isR[n - 1] = true;
    bcnt = n / S + (n % S > 0);
    for (int i = 0; i < n; i++)
        for (int j = 1; j < bcnt; j++)
            cnt[i][j] += cnt[i][j - 1];
    for (int i = 0; i < bcnt; i++)
    {
        memset(cnt2, 0, sizeof(cnt2));
        for (int j = i * S, tans = 0; j < n; j++)
        {
            cnt2[a[j]]++;
            if (cnt2[a[j]] > cnt2[tans] || (cnt2[a[j]] == cnt2[tans] && a[j] < tans)) tans = a[j];
            if (isR[j]) f[i][j / S] = tans;
        }
    }
    int ans = 0, l, r;
    while (q--)
    {
        read(l), read(r);
        l = (l + ans - 1) % n, r = (r + ans - 1) % n;
        if (l > r) std::swap(l, r);
        if (r - l < S * 2)
        {
            int tans = N - 1, tcnt = -1;
            for (int i = l; i <= r; i++)
            {
                if (vis[a[i]] != q) vis[a[i]] = q, cnt2[a[i]] = 0;
                cnt2[a[i]]++;
                if (cnt2[a[i]] > tcnt || (cnt2[a[i]] == tcnt && a[i] < tans))
                    tcnt = cnt2[tans = a[i]];
            }
            printf("%d\n", ans = b[tans]);
        }
        else
        {
            int bl = l / S, br = r / S;
            int bll = bl * S, brr = (br + 1) * S - 1;
            if (brr >= n) brr = n - 1;
            if (l > bll) bll = (++bl) * S;
            if (r < brr) brr = (--br + 1) * S - 1;
            int curAns = f[bl][br];
            int curAnsCnt = cnt[curAns][br];
            if (bl > 0) curAnsCnt -= cnt[curAns][bl - 1];
            for (int i = l; i < bll; i++)
            {
                if (vis[a[i]] != q)
                {
                    vis[a[i]] = q, cnt2[a[i]] = cnt[a[i]][br];
                    if (bl > 0) cnt2[a[i]] -= cnt[a[i]][bl - 1];
                }
                cnt2[a[i]]++;
                if (cnt2[a[i]] > curAnsCnt || (cnt2[a[i]] == curAnsCnt && a[i] < curAns))
                    curAnsCnt = cnt2[curAns = a[i]];
            }
            for (int i = r; i > brr; i--)
            {
                if (vis[a[i]] != q)
                {
                    vis[a[i]] = q, cnt2[a[i]] = cnt[a[i]][br];
                    if (bl > 0) cnt2[a[i]] -= cnt[a[i]][bl - 1];
                }
                cnt2[a[i]]++;
                if (cnt2[a[i]] > curAnsCnt || (cnt2[a[i]] == curAnsCnt && a[i] < curAns))
                    curAnsCnt = cnt2[curAns = a[i]];
            }
            printf("%d\n", ans = b[curAns]);
        }
    }
    return 0;
}
```
<div id="__comment"></div>
