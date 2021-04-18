---
template: post_with_isso
title: 2019杭电多校第二场
pageId: contests_hdu_190724
---

# 2019杭电多校第二场

lj充分发挥了他的乱搞/阅读样例能力，做出了许多不可做题。
## [HDU 6600 Just Skip The Problem](http://acm.hdu.edu.cn/showproblem.php?pid=6600)

计算$n!\bmod{10^6+3}$。
$$
n!\bmod{10^6+3}=
\begin{cases}
\prod\limits_{i=1}^n i \bmod{10^6+3} & \text{ if } n < 10^6+3 \\ 
0 & \text{ else }
\end{cases}
$$

```cpp
#include <cstdio>
using namespace std;
const long long mod = 1e6 + 3;
int main()
{
    for (long long n; ~scanf("%lld", &n);)
        if (n >= mod)
            puts("0");
        else
        {
            long long ans = 1;
            for (int i = 1; i <= n; i++)
                ans = ans * i % mod;
            printf("%lld\n", ans);
        }
    return 0;
}
```



## [HDU 6592 Beauty Of Unimodal Sequence](http://acm.hdu.edu.cn/showproblem.php?pid=6592)

首先对序列正着跑一边LIS，再反着跑一遍，分别记录下标（ppo-positive，opo-over：P）顺便给po初始化一下

task1  字典序最小下标序列--开始找峰，字典序最小，所以一旦找到，就用这个。接着开始从峰向前找尽量靠前的同LIS下标的数。前面查完了再查后面，后面的部分就是只要符合条件就拿，这样下标最小。stack和v倒腾一下输出就完事了。

task 2 字典序最大下标序列--开始找峰，找到尽量靠后的那个峰，顺手重新初始化po。往前找，找到就拿，这样下标最大。往后找，（一个迷之懒得用reverse的红小豆就用v模拟了一个stack）进行和task1里的前半部分类似的操作。输出完事。

```cpp
#include<iostream>
#include<cstdio>
#include<algorithm>
#include<cmath>
#include<cstring>
#include<stack>
using namespace std;
typedef long long LL;
int n;
int num[300005], ppo[300005], opo[300005], v[300005], d[300005], po[300005];
stack<int>sa;

int main()
{
    while (~scanf("%d", &n)) {

        memset(d, 0x3f, sizeof d);
        d[0] = 0;
        for (int i = 1; i <= n; i++) {
            scanf("%d", &num[i]);
            ppo[i] = lower_bound(d + 1, d + 1 + n, num[i]) - d;
            d[ppo[i]] = num[i];
            po[i] = 0x3f3f3f3f;
        }
        memset(d, 0x3f, sizeof d);
        d[0] = 0;
        for (int i = n; i >= 1; i--) {
            opo[i] = lower_bound(d + 1, d + 1 + n, num[i]) - d;
            d[opo[i]] = num[i];
        }


        int co = 0;
        int now = 1, m = ppo[1] + opo[1];
        for (int i = 2; i <= n; i++)
            if (ppo[i] + opo[i] > m) { now = i; m = opo[i] + ppo[i]; }
        po[ppo[now]] = num[now];
        for (int i = now - 1; i >= 1; i--) {
            if (po[ppo[i] + 1] <= num[i]) continue;
            while (!sa.empty() && ppo[i] >= ppo[sa.top()])po[ppo[sa.top()]] = 0x3f3f3f3f, sa.pop();
            sa.push(i);
            po[ppo[i]] = num[i];
        }
        while (!sa.empty()) v[co++] = sa.top(), sa.pop();
        v[co++] = now;
        for (int i = now + 1; i <= n; i++)
            if (opo[i] == opo[v[co - 1]] - 1 && num[i] < num[v[co - 1]])v[co++] = i;
        for (int i = 0; i < co; i++)printf("%d%c", v[i], " \n"[i == co - 1]);


        co = 0;
        now = 1; m = ppo[1] + opo[1]; po[1] = 0x3f3f3f3f;
        for (int i = 2; i <= n; i++) {
            if (ppo[i] + opo[i] >= m) { now = i; m = opo[i] + ppo[i]; }
            po[i] = 0x3f3f3f3f;
        }
        sa.push(now);
        for (int i = now - 1; i >= 1; i--)
            if (ppo[i] == ppo[sa.top()] - 1 && num[i] < num[sa.top()])sa.push(i);
        while (!sa.empty())v[co++] = sa.top(), sa.pop();
        po[opo[now]] = num[now];
        for (int i = now + 1; i <= n; i++) {
            if (num[i] >= po[opo[i] + 1]) continue;
            while (co && opo[i] >= opo[v[co - 1]])po[opo[v[co - 1]]] = 0x3f3f3f3f, co--;
            v[co++] = i;
            po[opo[i]] = num[i];
        }
        for (int i = 0; i < co; i++)printf("%d%c", v[i], " \n"[i == co - 1]);
    }

    return 0;
}

```





## 6599 I Love Palindrome String

今天，你学回文树了吗？

学习大佬马拉车加回文树的思路，红小豆在很久之后摸了两天摸出来了

结果后来几场没出字符串了）

```cpp
#include<iostream>
#include<cstdio>
#include<algorithm>
#include<cmath>
#include<cstring>
using namespace std;
typedef long long LL;

const int MAXN = 300005;
const int N = 26;
int ans[MAXN], rlen[MAXN * 2];
char a[MAXN];
char  str[MAXN * 2];
int R[MAXN*2];

struct Palindromic_Tree {
    int next[MAXN][N], fail[MAXN], cnt[MAXN], len[MAXN], S[MAXN], n, p, last;
    int l[MAXN], r[MAXN];

    inline int newnode(int l) {
        for (register int i = 0; i < N; ++i) next[p][i] = 0;
        cnt[p] = 0;
        len[p] = l;
        return p++;
    }

    void init() {
        p = 0;
        newnode(0);
        newnode(-1);
        last = 0;
        n = 0;
        S[n] = -1;
        fail[0] = 1;
    }

    inline int get_fail(int x) {
        while (S[n - len[x] - 1] != S[n]) x = fail[x];
        return x;
    }

    inline void add(int c) {
        c -= 'a';
        S[++n] = c;
        int cur = get_fail(last);

        if (!next[cur][c]) {
            int now = newnode(len[cur] + 2);
            fail[now] = next[get_fail(fail[cur])][c];
            next[cur][c] = now;
            l[now] = n - len[cur] - 1;
            r[now] = n;

        }
        last = next[cur][c];
        cnt[last] ++;
    }

    void count() {
        for (register int i = p - 1; i >= 0; --i) cnt[fail[i]] += cnt[i];
    }

    void map()
    {
        count();
        for (int i = 2; i < p; i++) {

            int ml = l[i] << 1, mmid = (l[i] + r[i]) >> 1 << 1; 
            int mid = (ml + mmid) >> 1;
            if (mid - rlen[mid] + 1 <= ml)ans[len[i]] += cnt[i];
        }
    }

}pt;


void ma(int m)
{
    memset(R, 0, sizeof(R));
    int n = 0;
    str[n++] = '!';
    str[n++] = '#';
    for (int i = 1; i <= m; i++)
        str[n++] = a[i], str[n++] = '#';
    str[n++] = '#';
    str[n++] = '?';
    int p = 0, mx = 0, ans = 0;
    for (int i = 1; i < n; i++)
    {
        R[i] = mx > i ? min(R[2 * p - i], mx - i) : 1;
        while (str[i + R[i]] == str[i - R[i]]) R[i]++;
        if (R[i] + i > mx)
            mx = i + R[p = i];
        rlen[i] = R[i] - 1;
    }
}


int main()
{

    while (~scanf("%s", a + 1)) {
        pt.init();
        int l = strlen(a + 1);
        for (int i = 1; i <= l; i++)pt.add(a[i]), ans[i] = 0;
        ma(l);
        pt.map();
        for (int i = 1; i <= l; i++)printf("%d%c", ans[i], " \n"[i == l]);

    }

    return 0;
}

```











<hr />
> <span id='poem'></span>

<div id="__comment"></div>
<script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
