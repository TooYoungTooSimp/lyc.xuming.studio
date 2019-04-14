---
template: post_with_isso
title: CCPC湖北省赛游记
pageId: 20190414
---

# CCPC湖北省赛游记

在学长说这是CCPC湖北省赛之前，我一直以为这是武大校赛。。。。。所以我全场实际上是在一直划水的。。。。。结果看起来也并没有达到预期的希望。不过就是那种得不到的东西，才能称之为希望吧。

开场不知所措，三人胡乱看题，几分钟后有人交了D，我一看，水题啊，想到犹豫就会败北，果断胡写一发，然后就白给了发WA，再看了一下，发现个sb错误，顺手改掉后AC。

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N=2e5+50;
int a[N];
int main()
{
    int T,n,k;
    scanf("%d",&T);
    while(T--){
        scanf("%d%d",&n,&k);
        for(int i=0;i<n;i++)
            scanf("%d",a+i);
        map<int,int> mp;
        for(int i=0;i<n;i++)
            mp[a[i]]++;
        long long ans=0;
        for(auto ite=mp.begin();ite!=mp.end();++ite)
            ans+=1ll*( ite->second)*mp[ite->first-k];
        printf("%lld\n",ans);
    }
    return 0;
}
```

之后去做F，发现没有数据范围，问了一波出题人，然后全场被提示F题暂时不可做，于是愉快的换题，看到队友们在看G，抢过来一看，发现显然做过（很类似的），（在队友们的懵逼中）随手拍了个Python就1A了。

```python
mp={}
mp['1']=2
mp['2']=5
mp['3']=5
mp['4']=4
mp['5']=5
mp['6']=6
mp['7']=3
mp['8']=7
mp['9']=6
mp['0']=6
mp['+']=2
mp['-']=1


T=int(input())
while T:
    T-=1
    n=int(input())
    e=input()
    cnt=0
    symcnt=0
    for ch in e:
        cnt+=mp[ch]
        if ch in ['+','-']:
            symcnt+=1
    #print(cnt,symcnt)
    cnt-=symcnt*3
    ans=0
    if cnt %2 ==1:
        ans=7
        cnt-=3
    else:
        ans=1
        cnt-=2
    while cnt:
        ans=ans*10+1
        cnt-=2
    ans-=symcnt
    print(ans)
```

接着是H题，简短的了解了题意后（同样是在队友的懵逼之中）快速口胡了一个算法，瞎jb写了一发，然后wa了，又是个sb错误，感谢题目提示，一个数虽然最大能到$2^{31}-1$，但是都是由两个$[0,32768)$的数乘起来得到的，所以质因子不会大于32768，于是迅速打表（还写了个树状数组，最后发现直接前缀和就好了），验了几组数据没毛病，一交，MLE了。。。。sizeof一下发现用了1300+MB内存，只好想办法改进，不知为何我突然想到了奇怪的做法，我把计算改成离线的，每次处理一个质因子，这样就将内存用量降到了原来的$\frac{1}{3000}$，这次终于AC了。

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int N=1e5+50;
int a[N];
ll ps[N],pcnt;
bool notPrime[1<<15];
const ll mod=35808247 ;
int C[N];
struct query{
    int l,r;
    ll ans;
}Q[N];
int main()
{
    for(ll i=2; i<(1<<15); i++)
        if(!notPrime[i])
        {
            ps[pcnt++]=i;
            for(ll j=i*i; j<(1<<15); j+=i)
                notPrime[j]=true;
        }
    int n,m;
    scanf("%d%d",&n,&m);
    for(int i=1; i<=n; i++)
        scanf("%lld",a+i);
    for(int i=0;i<m;i++)
    {
        scanf("%d%d",&Q[i].l,&Q[i].r);
        Q[i].ans=1;
    }
    for(int i=0;i<pcnt;i++)
    {
        memset(C,0,sizeof(C));
        for(int j=1;j<=n;j++)
        {
            int cnt=0;
            for(ll x=a[j];x%ps[i]==0;x/=ps[i])
                cnt++;
            C[j]=cnt+C[j-1];
        }
        for(int j=0;j<m;j++)
        {
            query&q=Q[j];
            q.ans=q.ans*(C[q.r]-C[q.l-1]+1)%mod;
        }
    }
    for(int j=0;j<m;j++)
        printf("%lld\n",Q[j].ans);
    return 0;
}
```

之后感觉J题可做的样子，但是显然我不会后缀数组来求本质不同的子串数量，于是当然要用字符串哈希大法啊！然后就WA了！这时佬蒋出了一组数据把我卡住了，非常好，然后愉快的改了一发再交，TLE了。。。。。又改了一发还是TLE，只是从test11变成了test21，想想这不行啊，时间复杂度应该够了，只是常数上的问题。情急之下，想到了昨天研究的pb\_ds，但是！我刚写完heap的部分，还没写hash\_table的部分，只好凭着记忆写了一堆，竟然编译通过了，先是试着用`cc_hash_table`，用cf的自测发现1300+ms，改成`gp_hash_table`就竟然只用560+ms了！果断交了一发，结果AC了，可以说是非常玄学了。

```cpp
#include <bits/stdc++.h>
#include <ext/pb_ds/hash_policy.hpp>
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
ll calc(char *s,ll len)
{
    __gnu_pbds::gp_hash_table<ull,__gnu_pbds::null_type> S;
    for(ll i=0; i<len; i++)
        for(ll j=i,h=1; j<len; j++)
            h=h*131+s[j],S.insert(h);
    return S.size();
}
char str[2050];
int main()
{
    ll k;
    while(~scanf("%s%lld",str,&k))
    {
        ll len=strlen(str);
        memcpy(str+len,str,len);
        memcpy(str+len+len,str,len);
        ll a2=calc(str,len*2);
        ll a3=calc(str,len*3);
        ll ans=0;
        if(k==0) ans=0;
        else if(k==1) ans=calc(str,len);
        else if(k==2) ans=a2;
        else ans=a2+(a3-a2)*(k-2);
        printf("%lld\n",ans);
    }
    return 0;
}
```

最后是AB题，没有什么思路，A是怎么都过不了样例，B是佬蒋写了个搜索一直WA。最后听着华科一个队连连过题的欢呼，超级不爽，md为什么人家队就有妹子，还是能做题的妹子，还能一直过题，我们却什么都做不出来。

最后靠着不太高的罚时获得了金牌三等奖，只能算差强人意吧。

<hr />
> <span id='poem'></span>

<div id="__comment"></div>
<script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
