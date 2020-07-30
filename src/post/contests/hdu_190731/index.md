---
template: post_with_isso
title: 2019杭电多校第四场
pageId: contests_hdu_190731
---

# 2019杭电多校第四场

朝鲜场的多校，大概就是朝鲜人出英文题给中国人做的样子。

## [HDU 6614 AND Minimum Spanning Tree](http://acm.hdu.edu.cn/showproblem.php?pid=6614)

纸上推了推感觉是个水题，写完也感觉很对，可是交上去就wa了（这种事情已经习惯了

不久后红小豆发现输出的答案不是字典序最小的，很有道理，改了一下还是wa。

不久之后红小豆再次发现输出的答案仍然不是字典序最小的，改了一下于是ac了。

（红小豆真是棒到不行的调试器

```cpp
#define _CRT_SECURE_NO_WARNINGS
#define _SILENCE_CXX17_C_HEADER_DEPRECATION_WARNING
#include <bits/stdc++.h>
using namespace std;
#define CRP(t, x) const t &x
#define OPL(t, x) bool operator<(CRP(t, x)) const
#define FIL(x, v) memset(x, v, sizeof(x))
#define CLR(x) FIL(x, 0)
#define NE1(x) FIL(x, -1)
#define INF(x) FIL(x, 0x3f)
typedef long long ll, i64;
const int N = 2e5 + 50;
int a[N];
inline ll Log2(ll x)
{
    int r = 0;
    while ((1ll << r) <= x) r++;
    return r;
}
ll Mask(ll x) { return (1ll << Log2(x)) - 1; }
int main()
{
    //for (int i = 0; i < 100; i++) printf("%d:%d\n", i, Log2(i));
    int T, n;
    scanf("%d", &T);
    while (T--)
    {
        scanf("%d", &n);
        printf("%d\n", n == Mask(n));
        for (int i = 2; i <= n; i++)
        {
            int r = i ^ ((1 << Log2(i)) - 1);
            r = r & -r;
            if (r == 0) r = i == n ? 1 : i + 1;
            a[i] = r;
        }
        for (int i = 2; i <= n; i++) printf("%d%c", a[i], " \n"[i == n]);
    }
    return 0;
}
```

## [HDU 6620 Just an Old Puzzle](http://acm.hdu.edu.cn/showproblem.php?pid=6620)

看起来像一个经典的BFS问题的数据加强版。lj写了一发然后T了。

去网上找到了一个跟逆序对数有关的结论，好像加上去就过了的样子。

```cpp
#include<iostream>
using namespace std;
int mp[8][8];
int f[20];
int tx(){
    int res=0;
    for(int i=1;i<=16;i++)
        for(int j=i;j<=16;j++){
            if(f[j]<f[i])res++;
        }
    return res;
}

int main()
{
    int T;
    scanf("%d",&T);
    while(T--){
        int posx,posy;
        for(int i=1;i<=4;i++){
            for(int j=1;j<=4;j++){
                scanf("%d",&mp[i][j]);
                if(mp[i][j]==0){mp[i][j]=16;posx=i,posy=j;}
            }
        }
        
        while(posx!=4){
            swap(mp[posx][posy],mp[posx+1][posy]);
            posx=posx+1;
        }
        while(posy!=4){
            swap(mp[posx][posy],mp[posx][posy+1]);
            posy=posy+1;
        }
        
        
        int cnt=0;
        for(int i=1;i<=4;i++){
            for(int j=1;j<=4;j++){
                f[++cnt]=mp[i][j];
            }
        }
        
        bool ok=1;
        if((tx()&1))ok=0;
        
        if(ok)printf("Yes\n");
        else printf("No\n");
    }
    return 0;
}
```

大概是个只要输出Yes和No的结论题。

## [HDU 6623 Minimal Power of Prime](http://acm.hdu.edu.cn/showproblem.php?pid=6623)

初看起来是最简单的一个题，直接上pollard\_rho，结果T了，怎么优化都没有办法。

最后题解写着暴力判断$\sqrt[4]{n}$以下的质因子然后分类讨论大的情况就可以了。

```cpp
#define _CRT_SECURE_NO_WARNINGS
#define _SILENCE_CXX17_C_HEADER_DEPRECATION_WARNING
#include <bits/stdc++.h>
using namespace std;
#define CRP(t, x) const t &x
#define OPL(t, x) bool operator<(CRP(t, x)) const
#define FIL(x, v) memset(x, v, sizeof(x))
#define CLR(x) FIL(x, 0)
#define NE1(x) FIL(x, -1)
#define INF(x) FIL(x, 0x3f)
typedef long long ll, i64;
const int N = 4e3;
bool notPrime[N];
int primes[N], pcnt;
int main()
{
    for (ll i = 2; i < N; i++)
        if (!notPrime[i])
            for (ll j = (primes[pcnt++] = i) * i; j < N; j += i)
                notPrime[j] = true;
    int T;
    long long n;
    scanf("%d", &T);
    while (T--)
    {
        scanf("%lld", &n);
        int ans = 63;
        for (int i = 0; i < pcnt; i++)
            if (n % primes[i] == 0)
            {
                int tmp = 0;
                for (; n % primes[i] == 0; n /= primes[i]) tmp++;
                ans = min(ans, tmp);
            }
        while (n > 1 && ans > 1)
        {
            bool flag = false;
            ll c = pow(n, 1.0 / 4);
            if (c * c * c * c == n) ans = min(ans, 4), flag = true;
            c++;
            if (c * c * c * c == n) ans = min(ans, 4), flag = true;
            if (flag) break;
            c = pow(n, 1.0 / 3);
            if (c * c * c == n) ans = min(ans, 3), flag = true;
            c++;
            if (c * c * c == n) ans = min(ans, 3), flag = true;
            if (flag) break;
            c = pow(n, 1.0 / 2);
            if (c * c == n) ans = min(ans, 2), flag = true;
            c++;
            if (c * c == n) ans = min(ans, 2), flag = true;
            if (flag) break;
            ans = 1;
            break;
        }
        printf("%d\n", ans);
    }
    return 0;
}
```




<hr />
> <span id='poem'></span>

<div id="__comment"></div>
<script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
