---
template: post_with_netease
title: LYDSY 1028
pageId: lydsy_1028
---

# LYDSY 1028
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
inline void readInt(int &x)
{
    int ch = x = 0;
    while (!isdigit(ch = getchar()))
        ;
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
}
int n, m, a[410], b[410], ans[410], sum;
bool check()
{
    for (int i = 1; i <= n; i++)
    {
        for (int j = 1; j <= n; j++) b[j] = a[j];
        int Ans = 0;
        if (b[i] >= 2)
        {
            b[i] -= 2;
            Ans += 2;
            for (int j = 1; j <= n; j++)
            {
                Ans += 3 * (b[j] / 3);
                b[j] %= 3;
                if (b[j] == 0 || b[j + 1] == 0 || b[j + 2] == 0) continue;
                b[j]--, b[j + 1]--, b[j + 2]--;
                j--;
                Ans += 3;
            }
        }
        if (Ans == m * 3 + 2) return true;
    }
    return false;
}
int main()
{
    readInt(n), readInt(m);
    for (int i = 0, x; i <= m * 3; i++)
        readInt(x), a[x]++;
    for (int i = 1; i <= n; i++)
    {
        a[i]++;
        if (check()) ans[sum++] = i;
        a[i]--;
    }
    if (sum == 0)
        puts("NO");
    else
        for (int i = 0; i < sum; i++)
            printf(i != sum - 1 ? "%d " : "%d", ans[i]);
    return 0;
}
```
<div id="__comment"></div>
