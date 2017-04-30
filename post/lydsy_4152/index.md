---
template: post_with_netease
title: LYDSY 4152
pageId: lydsy_4152
---

# LYDSY 4152
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <algorithm>
#include <cctype>
#include <cstdio>
#include <cstring>
#include <queue>
using namespace std;
const int maxn = 200010;
inline void readInt(int &x)
{
    int ch = x = 0;
    while (!isdigit(ch = getchar()))
        ;
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
}
int head[maxn], to[maxn << 2], nxt[maxn << 2], len[maxn << 2], ecnt, n;
inline void addEdge(int f, int t, int l)
{
    ecnt++;
    nxt[ecnt] = head[f];
    head[f] = ecnt;
    to[ecnt] = t;
    len[ecnt] = l;
}
struct P
{
    int id, x, y;
} ps[maxn];
bool cmpx(const P &lhs, const P &rhs) { return lhs.x < rhs.x; }
bool cmpy(const P &lhs, const P &rhs) { return lhs.y < rhs.y; }
int pathlen[maxn];
struct heapnode
{
    int id, dis;
    heapnode(int x, int y) : id(x), dis(y) {}
    bool operator<(const heapnode &rhs) const { return dis > rhs.dis; }
};
int main()
{
    readInt(n);
    for (int i = 0; i < n; i++) ps[i].id = i + 1, readInt(ps[i].x), readInt(ps[i].y);
    sort(ps, ps + n, cmpx);
    for (int i = 0; i < n - 1; i++)
        addEdge(ps[i].id, ps[i + 1].id, ps[i + 1].x - ps[i].x),
            addEdge(ps[i + 1].id, ps[i].id, ps[i + 1].x - ps[i].x);
    sort(ps, ps + n, cmpy);
    for (int i = 0; i < n - 1; i++)
        addEdge(ps[i].id, ps[i + 1].id, ps[i + 1].y - ps[i].y),
            addEdge(ps[i + 1].id, ps[i].id, ps[i + 1].y - ps[i].y);
    memset(pathlen, 0x3f3f3f3f, sizeof(pathlen));
    pathlen[1] = 0;
    priority_queue<heapnode> Q;
    Q.push(heapnode(1, 0));
    while (!Q.empty())
    {
        heapnode x = Q.top();
        Q.pop();
        if (x.dis > pathlen[x.id]) continue;
        for (int cur = head[x.id]; cur; cur = nxt[cur])
            if (pathlen[to[cur]] > pathlen[x.id] + len[cur])
            {
                pathlen[to[cur]] = pathlen[x.id] + len[cur];
                Q.push(heapnode(to[cur], pathlen[to[cur]]));
            }
    }
    printf("%d", pathlen[n]);
    return 0;
}
```
<div id="__comment"></div>
