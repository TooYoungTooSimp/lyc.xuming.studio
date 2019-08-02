---
template: post_with_isso
title: 2019牛客多校第三场
pageId: contests_nowcoder_190725
---

# 2019牛客多校第三场

这一场我是在火车上打的。

比赛刚开始就进了山区，只能与机房的同志们每隔十分钟联系一次，剩下的时间都在隧道里写大模拟。



## [B Crazy Binary String](https://ac.nowcoder.com/acm/contest/883/B)

首先是签到题，求最长的01数量相同的子串和子序列的长度。


```cpp
#define _CRT_SECURE_NO_WARNINGS
#define _SILENCE_CXX17_C_HEADER_DEPRECATION_WARNING
#include <bits/stdc++.h>
using namespace std;
const int N = 100050;
char s[N];
map<int, int> M;
int main()
{
    int n;
    scanf("%d%s", &n, s);
    int ans1 = 0, ans2 = 0;
    M[0] = -1;
    int cnt = 0;
    for (int i = 0; i < n; i++)
    {
        if (s[i] == '1')
            cnt++;
        else
            cnt--;
        auto ite = M.find(cnt);
        if (ite != M.end())
            ans1 = max(ans1, i - ite->second);
        if (!M.count(cnt)) M[cnt] = i;
    }
    ans2 = min(count(s, s + n, '0'), count(s, s + n, '1')) << 1;
    printf("%d %d", ans1, (ans2 | 1) - 1);
    return 0;
}
```



## [F Planting Trees](https://ac.nowcoder.com/acm/contest/883/F)

再说一次cin不仅慢还螺旋无敌飞天香蕉船慢！！！

快读是真地快

悬线法开三个数组都会互相干扰，反正就是不行

单调队列，请

```cpp
#include<iostream>
#include<cstdio>
#include<algorithm>
#include<cmath>
#include<cstring>
using namespace std;
typedef long long LL;
int m, n, t;
int qi[505], qa[505];
int mp[505][505], mi[507], ma[507];
 
inline int rd()
{
    int s = 0, w = 1; char ch = getchar();
    while (ch < '0' || ch > '9') { if (ch == '-') w = -1; ch = getchar(); }
    while (ch >= '0' && ch <= '9') s = s * 10 + ch - '0', ch = getchar();
    return s * w;
}
 
int main()
{
    scanf("%d",&t);
    while (t--) {
        scanf("%d%d", &n, &m);
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                scanf("%d", &mp[i][j]);
        int ans = 0;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) { mi[j] = 0x3f3f3f3f; ma[j] = -0x3f3f3f3f; }
            for (int j = i; j <= n; j++) {
                for (int k = 1; k <= n; k++) { mi[k] = min(mi[k], mp[k][j]);ma[k] = max(ma[k], mp[k][j]); }
                int f1 = 0, f2 = 0, b1 = 0, b2 = 0;
                int now = 0;
                for (int k = 1; k <= n; k++) {
                    while (f1 != b1 && mi[k] <= mi[qi[f1]])f1--;
                    while (f2 != b2 && ma[k] >= ma[qa[f2]])f2--;
                    qi[++f1] = k;
                    qa[++f2] = k;
                    while(f1!=b1&&f2!=b2&&ma[qa[b2+1]]-mi[qi[b1+1]]>m)
                        if (qa[b2+1] > qi[b1+1]) {now = qi[b1 + 1];  b1++;}
                        else {now = qa[b2 + 1]; b2++;}
                    ans = max(ans, (j - i + 1) * (k - now));
                }
            }
        }
        cout << ans << endl;
    }

    return 0;
}

```



## [J LRU management](https://ac.nowcoder.com/acm/contest/883/J)

走之前和小C在机房谈论面试，小C说考到了LRU的原理什么的，结果今天就变成题了。

简单调试了一下过了样例，然后就WA了，老蒋改了一下hash，A了。。。。。

我自己也试了一下，把我的hash里面初始值从0改成1，然后也A了。。。。

```cpp
#define _SILENCE_CXX17_C_HEADER_DEPRECATION_WARNING
#include <bits/stdc++.h>
using namespace std;
typedef pair<long long, long long> p_t;
typedef list<p_t> lst_t;
typedef map<long long, lst_t::iterator> mp_t;
long long hs(char *s)
{
    long long r = 1;
    for (char *p = s; *p; p++)
        r = r * 10 + *p - '0';
    return r;
}
int main()
{
    char s[20];
    lst_t LRU;
    mp_t mp;
    long long T, Q, M, op, v, blkid;
    scanf("%lld", &T);
    while (T--)
    {
        LRU.clear(), mp.clear();
        scanf("%lld%lld", &Q, &M);
        while (Q--)
        {
            scanf("%lld%s%lld", &op, s, &v), blkid = hs(s);
            if (op == 0)
            {
                auto ite = mp.find(blkid);
                if (ite == mp.end())
                    mp[blkid] = LRU.insert(LRU.end(), {blkid, v});
                else
                {
                    p_t p = {blkid, ite->second->second};
                    LRU.erase(ite->second);
                    mp[blkid] = LRU.insert(LRU.end(), p);
                }
                printf("%lld\n", mp[blkid]->second);
            }
            if (op == 1)
            {
                auto ite = mp.find(blkid);
                if (ite == mp.end())
                    puts("Invalid");
                else
                {
                    auto ite2 = ite->second;
                    if (v == -1)
                        if (ite2 != LRU.begin())
                            printf("%lld\n", (--ite2)->second);
                        else
                            puts("Invalid");
                    if (v == 0)
                        if (ite2 != LRU.end())
                            printf("%lld\n", ite2->second);
                        else
                            puts("Invalid");
                    if (v == 1)
                        if (ite2 != LRU.end() && ++ite2 != LRU.end())
                            printf("%lld\n", ite2->second);
                        else
                            puts("Invalid");
                }
            }
            while (LRU.size() > M)
            {
                mp.erase(LRU.begin()->first);
                LRU.pop_front();
            }
        }
    }
    return 0;
}
```



<hr />
> <span id='poem'></span>

<div id="__comment"></div>
<script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
