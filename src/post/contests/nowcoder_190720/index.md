---
template: post_with_isso
title: 2019牛客多校第二场
pageId: contests_nowcoder_190720
---

# 2019牛客多校第二场

早上六点不到醒了，睡眠确乎是日益不规律而缩短了。

这场比赛打得非常菜，甚至连到都没签上。

所以决定补一下两个签到题（虽然做了大于两题的只有30个队）。

## [H Second Large Rectangle](https://ac.nowcoder.com/acm/contest/882/H)

参考于某大佬博客

只会$O(n^4)$的红小豆学习了悬线法$O(n^2)$之后用朴素的悬线法dp了一下，结果只过了百分之六十的数据

于是换成了题解的悬线处理形式，改着改着发现其实是dp里面判断是否为同一个矩形判错了，悬线法怎么写都好啦`_(:з」∠)_`

原题解的更新条件部分的花括号使红小豆迷惑，于是红小豆就改了改条件判定，看起来也许好理解一点

```cpp
#include<iostream>
#include<cstdio>
#include<algorithm>
#include<cmath>
#include<cstring>
using namespace std;
const int maxn = 1000 + 5;
int l[maxn][maxn], r[maxn][maxn], h[maxn][maxn];
bool mp[maxn][maxn];
int n, m, ml, mr;
int ma, sma, mlx, mly,mrx,mry, slx, sly,srx,sry, curm,curs, curx, cury;

int main()
{
    cin >> n>>m;
    char a;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++) {
            cin >> a;
            mp[i][j]=a-'0';
            if (mp[i][j]) {
                l[i][j] = r[i][j] = j;
                h[i][j] = 1;//悬线法初始化处理
            }
        }

    for (int i = 1; i <= n; i++) {
        for (int j = 2; j <= m; j++)
            if (mp[i][j] && mp[i][j - 1])l[i][j] = l[i][j - 1];//左推
        for (int j = m - 1; j >= 1; j--)
            if (mp[i][j] && mp[i][j + 1])r[i][j] = r[i][j + 1];//右推
        for (int j = 1; j <= m; j++) {
            if (i != 1 && mp[i][j] && mp[i - 1][j]) {
                h[i][j] = h[i - 1][j] + 1;
                l[i][j] = max(l[i][j], l[i - 1][j]);
                r[i][j] = min(r[i][j], r[i - 1][j]);//画框框
            }
            int cur = (r[i][j] - l[i][j] + 1) * h[i][j];//当前面积
            int lx, ly, rx, ry;
            lx = i - h[i][j] + 1; rx = i;
            ly = l[i][j]; ry = r[i][j];//左上角与右下角坐标
　　·　　　　　　　　　　　　　　　　//↓判断是否是同一个矩形！
            if (cur >= curm && (lx != mlx || ly != mly || rx != mrx || ry != mry)) {
                    curs = curm, curm = cur; 
                    slx = mlx, mlx = lx;
                    sly = mly, mly = ly;
                    srx = mrx, mrx = rx;
                    sry = mry, mry = ry;
                }//更新最大面积与次大面积
            if(cur>curs&&cur<curm){
                    slx = lx, sly = ly;
                    srx = rx, sry = ry;
                    curs = cur;
                }//更新次大面积
            curx = (rx - lx) * (ry - ly + 1), cury = (ry - ly) * (rx - lx + 1);
            if (curx > curs)  curs = curx, slx = lx + 1, sly = ly, srx = rx, sry = ry;
            if (cury > curs)  curs = cury, slx = lx, sly = ly + 1, srx = rx, sry = ry;
　　　　　　　　//宽和长分别减一行看看是不是次大
        }
    }
    cout << curs << endl;

    return 0;
}
```



## [F Partition problem](https://ac.nowcoder.com/acm/contest/882/F)

给定$2n$阶对称矩阵$M$且保证$M\_{ii}=0$，求两个大小相同的集合$A,B$，满足$A\cup B=\lbrace 1\ldots2n\rbrace,A\cap B=\emptyset$，使得$\sum\limits\_{i\in A}\sum\limits\_{j\in B}M_{i,j}$最大。

$\binom{2n}{n},n\leq14$好像也不是那么大的样子，所以我试了试暴搜，然后果不其然TLE了。

题解上说把最后的$n^2$计算分摊到每一步就从$\binom{2n}{n}n^2$变成$\binom{2n}{n}n$了，我持怀疑态度，虽然初看起来的确如此，但是实际上，那个$n$并没有被消除，而是分摊到dfs的深度那里了，深度是$O(n)$，每层计算$O(n)$，实际上还是$\binom{2n}{n}n^2$的，而且这个题卡常数，同样一份代码昨天晚上交AC今天下午交就TLE，所以这里就不放代码了。

## [A Eddy Walker](https://ac.nowcoder.com/acm/contest/882/A)

[知乎：从0点出发，每次随机走1~k步，求经过点x的概率。请问为什么x趋于无穷大时，概率为2/(k+1)?](https://www.zhihu.com/question/336062847)

记着加“前缀和”一类的东西。

```cpp
#define _CRT_SECURE_NO_WARNINGS
#define _SILENCE_CXX17_C_HEADER_DEPRECATION_WARNING
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int mod = 1e9 + 7;
ll fpow(ll a, ll b)
{
    ll r = 1;
    for (; b; b >>= 1, a = a * a % mod)
        if (b & 1)
            r = r * a % mod;
    return r;
}
int main()
{
    ll T, n, m, ans = 1;
    scanf("%lld", &T);
    while (T--)
    {
        scanf("%lld%lld", &n, &m);
        printf("%lld\n", n == 1 ? ans : (ans = m == 0 ? 0 : ans * fpow(n - 1, mod - 2) % mod));
    }
    return 0;
}
```



## [E MAZE](https://ac.nowcoder.com/acm/contest/882/E)

Another day's upd...

快乐的线段树+快乐的转移矩阵+快乐的输入

对于每行都可以构造一个像是邻接矩阵一样的转移矩阵表示同行的点互相到达与否，从(1,a)到(n,b)的方案数就是第一行的矩阵乘到第n行得到的结果矩阵的(a,b)项。

输入就就就看代码吧，getchar的输入比注释里要慢200ms（错误示范）

```cpp
#include<iostream>
#include<cstdio>
#include<algorithm>
#include<cmath>
#include<cstring>
using namespace std;
typedef long long LL;
int n, m, q;
bool mp[50005][15];
char s[50005];
const LL mod = 1e9 + 7;

struct mx {
    LL tn[15][15];

    void init()
    {
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= m; j++)
                tn[i][j] = 0;
    }

    mx operator* (const mx& t)const {
        mx res;
        res.init();

        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= m; j++)
                for (int k = 1; k <= m; k++)
                    res.tn[i][j] = (res.tn[i][j] + tn[i][k] * t.tn[k][j] % mod) % mod;

        return res;
    }

    void e()
    {
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= m; j++)
                tn[i][j] = (i == j);                
    }

    void get(int i)
    {
        init();
        int l = 1, r = 1;
        for (int j = 1; j <= m; j++) {
            if (mp[i][j]) { l = r = j + 1; continue; }
            while (r <= m && mp[i][l] == mp[i][r])r++;
            r--;
            for (int k = l; k <= r; k++)tn[k][j]++;
        }
    }
};

struct st
{
#define ls i<<1
#define rs i<<1|1

    struct node {
        mx v;
        int l, r;
    }po[50005 << 2];

    void puu(int i) { po[i].v = po[ls].v * po[rs].v; }

    void build(int l, int r, int i)
    {
        po[i].l = l, po[i].r = r;
        if (l == r) {
            po[i].v.get(l);
            return;
        }
        int mid = (l + r) >> 1;
        build(l, mid, ls);
        build(mid + 1, r, rs);
        puu(i);
    }

    void cha(int i, int c)
    {
        int  l = po[i].l, r = po[i].r;
        if (l == c && r == c) { po[i].v.get(c); return; }
        int mid = (l + r) >> 1;
        if (mid >= c)cha(ls, c);
        else cha(rs, c);
        puu(i);
    }

    mx qy(int l, int r, int i)
    {
        if (po[i].l >= l && r >= po[i].r)return po[i].v;
        mx res; res.e();
        int mid = (po[i].l + po[i].r) >> 1;
        if (mid >= l)res = res * qy(l, r, ls);
        if (mid < r)res = res * qy(l, r, rs);
        return res;
    }

}seg;

int main()
{
    scanf("%d%d%d", &n, &m, &q);
    /*for (int i = 1; i <= n; i++){
        scanf("%s", s+1);
        for (int j = 1; j <= m; j++)
            mp[i][j] = s[j] - '0';
    }*/

    getchar();//吞回车
    for (int i = 1; i <= n; i++, getchar())//吞回车+1
        for (int j = 1; j <= m; j++)
            mp[i][j] = getchar() - '0';

    seg.build(1, n, 1);
    for (int i = 0; i < q; i++) {
        int p, a, b;
        scanf("%d%d%d", &p, &a, &b);
        if (p == 1) { mp[a][b] ^= 1; seg.cha(1, a); }
        else { mx t = seg.qy(1, n, 1); printf("%lld\n", t.tn[a][b]); }
    }

    return 0;
}

```



<hr />
> <span id='poem'></span>

<div id="__comment"></div>
<script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
