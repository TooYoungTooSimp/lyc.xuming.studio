---
template: post_with_isso
title: 2019杭电多校第一场
pageId: contests_hdu_190722
---

# 2019杭电多校第一场

开考前三分钟发现不知道账号是什么，翻和教练的聊天记录发现图裂了。。。。。

于是找教练又要了一次。

开始后随机开题，都点到了巨难无比的题，大概是能力转移一般的样子。

下次一定要让红小豆看看她喜欢哪几个题的名字（x

总之过了一会榜也正常了，去做1005，感觉有思路但是会T，写了一发然后RE了。

调试后终于出现了想要的TLE。

接着上厕所在厕所里获得了灵感回来一写发现非常的正确，不过交上去还是WA了。

实际上在接下来的出数据环节我的代码比我们手算的还要正确。

于是一直到结束都没有过题。

接下来小C传授面试经验并带我们去东区吃饭，回来的路上被雨淋湿。

到寝室看到教练发了dls讲题的直播，打开一听发现我的1005思路完全正确，令人费解。

没过多久dls电脑没电然后咕了，于是我去洗澡，翻遍寝室找到四张没钱的洗澡卡，凑合着随便冲了一下自己。

接下来是正经的补题环节：

## 1005 Path

### Problem Description

Years later, Jerry fell in love with a girl, and he often walks for a long time to pay visits to her. But, because he spends too much time with his girlfriend, Tom feels neglected and wants to prevent him from visiting her.
After doing some research on the neighbourhood, Tom found that the neighbourhood consists of exactly n houses, and some of them are connected with directed road. To visit his girlfriend, Jerry needs to start from his house indexed 1 and go along the shortest path to hers, indexed n.
Now Tom wants to block some of the roads so that Jerry has to walk longer to reach his girl's home, and he found that the cost of blocking a road equals to its length. Now he wants to know the minimum total cost to make Jerry walk longer.
Note, if Jerry can't reach his girl's house in the very beginning, the answer is obviously zero. And you don't need to guarantee that there still exists a way from Jerry's house to his girl's after blocking some edges.

### Input

The input begins with a line containing one integer $T (1≤T≤10)$, the number of test cases.
Each test case starts with a line containing two numbers $n,m (1≤n,m≤10000)$, the number of houses and the number of one-way roads in the neighbourhood.
m lines follow, each of which consists of three integers $x,y,c(1≤x,y≤n,1≤c≤10^9)$, denoting that there exists a one-way road from the house indexed $x$ to $y$ of length $c$.

### Output

Print $T$ lines, each line containing a integer, the answer.

### Solution

题意就是给一个有向图，然后删掉一些边，使第一个点到最后一个点的最短距离变长，要求删掉的边的总长度尽量短。

做法是先跑一遍单源最短路，然后把在各条最短路上的边拿出来单独建一个图在上面跑最小割（也就是最大流）。

我上完厕所想到的就是这个。

晚上对着数据进行调试后，发现dijkstra的堆节点里的dis没有开`long long`，于是在某些情况下就无法把最短路径提取出来，将那一个地方的`int`改为`long long`后就过了（因为写的时候发现要开`long long`但是这一个地方漏掉了）。

附代码：

```cpp
#define _CRT_SECURE_NO_WARNINGS
#define _SILENCE_CXX17_C_HEADER_DEPRECATION_WARNING
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll inf = 0x3f3f3f3f3f3f3f3fll, N = 1e4 + 50, M = 4e4 + 50;
ll adj[N], nxt[M], to[M], len[M], cap[M], dis[N], ecnt, idx;
inline void addEdge(int f, int t, int l)
{
    nxt[ecnt] = adj[f];
    adj[f] = ecnt;
    to[ecnt] = t;
    len[ecnt] = l;
    ecnt++;
}
inline void addEdge_impl_(int f, int t, int c)
{
    nxt[ecnt] = adj[f];
    adj[f] = ecnt;
    to[ecnt] = t;
    cap[ecnt] = c;
    ecnt++;
}
inline void addEdge_F(int f, int t, int c)
{
    addEdge_impl_(f, t, c);
    addEdge_impl_(t, f, 0);
}
struct edge
{
    ll f, t, l;
    bool operator<(const edge &rhs) const { return l > rhs.l; }
} E[M];
struct heap_node
{
    ll u, d;
    heap_node(ll _u = 0, ll _d = 0) { u = _u, d = _d; }
    bool operator<(const heap_node &rhs) const { return d > rhs.d; }
};
priority_queue<heap_node> H;
int cnt[N], cur[N], fa[N];
ll ISAP(int S, int T)
{
    ll flow = 0;
    for (int i = 0; i < N; i++) dis[i] = N - 1;
    int len = 0, x;
    static int que[N];
    dis[que[len++] = T] = 0;
    for (int i = 0; i < len; i++)
        for (int e = adj[x = que[i]]; ~e; e = nxt[e])
            if (cap[e ^ 1] && dis[to[e]] > dis[x] + 1)
                dis[que[len++] = to[e]] = dis[x] + 1;
    memset(cnt, 0, sizeof(cnt));
    for (int i = 0; i < N; i++) cur[i] = adj[i], cnt[dis[i]]++;
    x = S;
    while (dis[S] < N - 1)
    {
        if (x == T)
        {
            ll curFlow = inf;
            for (x = T; x != S; x = to[fa[x] ^ 1]) curFlow = min(curFlow, cap[fa[x]]);
            for (x = T; x != S; x = to[fa[x] ^ 1]) cap[fa[x]] -= curFlow, cap[fa[x] ^ 1] += curFlow;
            flow += curFlow, x = S;
        }
        bool needRetreat = true;
        for (int e = cur[x]; needRetreat && ~e; e = nxt[e])
            if (cur[x] = e, cap[e] && dis[x] == dis[to[e]] + 1)
                needRetreat = false, fa[x = to[e]] = e;
        if (needRetreat)
        {
            ll nd = N - 2;
            for (int e = adj[x]; ~e; e = nxt[e])
                if (cap[e]) nd = min(nd, dis[to[e]]);
            if (--cnt[dis[x]] == 0) break;
            ++cnt[dis[x] = nd + 1];
            cur[x] = adj[x];
            if (x != S) x = to[fa[x] ^ 1];
        }
    }
    return flow;
}
int main()
{
    int Tt;
    scanf("%d", &Tt);
    while (Tt--)
    {
        memset(adj, -1, sizeof(adj)), ecnt = 0;
        int n, m;
        scanf("%d%d", &n, &m);
        for (int i = 0; i < m; i++)
            scanf("%d%d%d", &E[i].f, &E[i].t, &E[i].l);
        sort(E, E + m);
        for (int i = 0; i < m; i++) addEdge(E[i].f, E[i].t, E[i].l);
        memset(dis, 0x3f, sizeof(dis));
        H.push(heap_node(1, dis[1] = 0));
        for (heap_node cur; !H.empty(); H.pop())
            for (int e = adj[(cur = H.top()).u]; ~e; e = nxt[e])
                if (dis[to[e]] > dis[cur.u] + len[e])
                    H.push(heap_node(to[e], dis[to[e]] = dis[cur.u] + len[e]));
        memset(adj, -1, sizeof(adj)), ecnt = 0;
        for (int i = 0; i < m; i++)
            if (dis[E[i].t] == dis[E[i].f] + E[i].l)
                addEdge_F(E[i].f, E[i].t, E[i].l);
        printf("%lld\n", ISAP(1, n));
    }
    return 0;
}
```



## 1001 Blank

红小豆学习了$O(n^4)$的四维dp

全靠评测姬发善心和快读板子过题

只要998（ms），ac带回家

本来想拿pair胡搞，然而还是被vector摁住了

```cpp
#include<iostream>
#include<cstdio>
#include<algorithm>
#include<cmath>
#include<utility>
#include<cstring>
#include<cstdlib>
#include<vector>
using namespace std;
typedef long long ll;
int n, m,t;
vector<pair<int, int> >rq[101];
const ll mod = 998244353;
ll d[101][101][101][2];


inline char nc(){
    static char buf[100000],*p1=buf,*p2=buf;
    return p1==p2&&(p2=(p1=buf)+fread(buf,1,100000,stdin),p1==p2)?EOF:*p1++;
}
inline int rd(){
char ch=nc();int sum=0;
while(!(ch>='0'&&ch<='9'))ch=nc();
while(ch>='0'&&ch<='9')sum=sum*10+ch-48,ch=nc();
return sum;
}


int main()
{
    t=rd();
    while (t--) {
        n=rd();m=rd();
        int co = n;
        for (int i = 1; i <= n; i++) {
            rq[i].clear();
            rq[i].push_back({ i,1 });
        }
        for (int i = 1; i <= m; i++) {
            int l, x,r;
            l=rd();r=rd();x=rd();
            rq[r].push_back({ l,x });
        }
        memset(d, 0, sizeof(d));
        d[0][0][0][0] = 1;
        
        for(int now=1;now<=n;now++){
            bool gal = now & 1;
            for (int i = 0; i <= now; i++)
                for (int j = i; j <= now; j++)
                    for (int k = j; k <= now; k++)
                        d[i][j][k][gal] = 0;
        
            for(int i=0;i<=now;i++)
                for (int j = i; j <= now; j++)
                    for (int k = j; k <= now; k++) {
                        d[i][j][now - 1][gal] = (d[i][j][k][gal ^ 1] + d[i][j][now - 1][gal]) % mod;
                        d[j][k][now - 1][gal] = (d[i][j][k][gal ^ 1] + d[j][k][now - 1][gal]) % mod;
                        d[i][k][now - 1][gal] = (d[i][j][k][gal ^ 1] + d[i][k][now - 1][gal]) % mod;
                        d[i][j][k][gal] = (d[i][j][k][gal ^ 1] + d[i][j][k][gal]) % mod;
                    }
            
            for (int i = 0; i <= now; i++)
                for (int j = i; j <= now; j++)
                    for (int k = j; k <= now; k++)
                        for (auto p:rq[now])
                            if ((p.first <= i) + (p.first <= j) + (p.first <= k) + (p.first <= now) != p.second)
                                d[i][j][k][gal] = 0;
        }
        ll ans = 0;
        for (int i = 0; i <= n; i++)
            for (int j = i; j <= n; j++)
                for (int k = j; k <= n; k++)
                    ans = (ans + d[i][j][k][n & 1]) % mod;
        printf("%lld\n", ans);

    }

    return 0;
}

```





<hr />
> <span id='poem'></span>

<div id="__comment"></div>
<script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
