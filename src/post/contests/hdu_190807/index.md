---
template: post_with_isso
title: 2019杭电多校第六场
pageId: contests_hdu_190807
---

# 2019杭电多校第六场

## [HDU 6645 Stay Real](http://acm.hdu.edu.cn/showproblem.php?pid=6645)

水题，按题意排序模拟即可。

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
const int N = 1e5 + 50;
int a[N];
int main()
{
    int T, n;
    scanf("%d", &T);
    while (T--)
    {
        scanf("%d", &n);
        for (int i = 0; i < n; i++) scanf("%d", a + i);
        sort(a, a + n, greater<int>());
        ll cnt[] = {0, 0};
        for (int i = 0; i < n; i++) cnt[i & 1] += a[i];
        printf("%lld %lld\n", cnt[0], cnt[1]);
    }
    return 0;
}
```

## [HDU 6641 TDL](http://acm.hdu.edu.cn/showproblem.php?pid=6641)

枚举，暴力，大概

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
ll gcd(ll a, ll b) { return b == 0 ? a : gcd(b, a % b); }
ll f(ll n, ll m)
{
    ll x = n;
    do
        if (gcd(++x, n) == 1) m--;
    while (m);
    return x;
}
int main()
{
    ll T, k, m;
    scanf("%lld", &T);
    while (T--)
    {
        scanf("%lld%lld", &k, &m);
        bool flag = true;
        if(k-420<=420)
            for (ll i = 1; i <= 420; i++)
                if (((f(i, m) - i) ^ i) == k)
                {
                    printf("%lld\n", i);
                    flag = false;
                    break;
                }
        
        if(flag){
            for(ll i=max(k-420+1,421ll);i<=k+420;i++){
                ll mm=m,j=0;
                bool wro=0;
                do{
                    if (gcd(++j, i) == 1) mm--;
                    if(j>=i){wro=1;break;}
                }while(mm);
                if(wro)continue;
                if(j==(i^k)){
                    printf("%lld\n", i);
                    flag = false;
                    break;
                }
            }    
        }    
        if (flag) puts("-1");
    }
    return 0;
}
```

## [HDU 6638 Snowy Smile](http://acm.hdu.edu.cn/showproblem.php?pid=6638)

（红小豆时间

<hr />
> <span id='poem'></span>

<div id="__comment"></div>
<script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
