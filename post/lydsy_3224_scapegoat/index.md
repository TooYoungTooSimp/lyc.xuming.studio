---
template: post_with_disqus
title: LYDSY 3224_SCAPEGOAT
pageId: lydsy_3224_scapegoat
---

# LYDSY 3224_SCAPEGOAT
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
inline int max(int a, int b) { return a > b ? a : b; }
const int maxn = 100005;
int val[maxn], lch[maxn], rch[maxn], sz[maxn], cap[maxn], arr[maxn], aend, root, pool[maxn], idx = 1;
bool exist[maxn];
inline int newNode() { return pool[idx++]; }
inline void delNode(int x) { pool[--idx] = x; }
inline void setNode(int x, int v = 0) { val[x] = v, lch[x] = rch[x] = 0, exist[x] = true, sz[x] = cap[x] = 1; }
inline bool isBad(int x)
{
    return (sz[x] + 5 < cap[x] >> 1) ||
           (max(sz[lch[x]], sz[rch[x]]) - 5 > (sz[x] * 3) >> 2);
}
inline void update(int x)
{
    sz[x] = sz[lch[x]] + sz[rch[x]] + exist[x];
    cap[x] = cap[lch[x]] + cap[rch[x]] + 1;
}
void rebuild_impl(int x)
{
    if (x == 0) return;
    rebuild_impl(lch[x]);
    if (exist[x]) arr[aend++] = val[x];
    rebuild_impl(rch[x]);
    delNode(x);
}
void rebuild_impl(int &x, int b, int e)
{
    if (b < e)
    {
        setNode(x = newNode(), 0);
        int m = (b + e) >> 1;
        val[x] = arr[m];
        rebuild_impl(lch[x], b, m);
        rebuild_impl(rch[x], m + 1, e);
        update(x);
    }
}
inline void rebuild(int &x)
{
    if (x == 0) return;
    aend = 0;
    rebuild_impl(x);
    rebuild_impl(x, 0, aend);
}
int rnk(int x)
{
    int cur = root, ans = 1;
    while (cur)
        if (x <= val[cur])
            cur = lch[cur];
        else
            ans += sz[lch[cur]] + exist[cur], cur = rch[cur];
    return ans;
}
int kth(int x)
{
    int cur = root;
    while (cur)
    {
        if (sz[lch[cur]] + 1 == x && exist[cur])
            break;
        else if (sz[lch[cur]] >= x)
            cur = lch[cur];
        else
            x -= sz[lch[cur]] + exist[cur], cur = rch[cur];
    }
    return val[cur];
}
int *insert_impl(int &node, int x)
{
    int *res = 0;
    if (node == 0)
        setNode(node = newNode(), x);
    else
    {
        res = insert_impl(x < val[node] ? lch[node] : rch[node], x);
        update(node);
        if (isBad(node)) res = &node;
    }
    return res;
}
int *delete_impl(int &node, int x)
{
    if (node == 0) return 0;
    int *ret = 0;
    sz[node]--;
    int pos = sz[lch[node]] + exist[node];
    if (pos == x && exist[node])
        exist[node] = false;
    else
    {
        ret = x <= pos ? delete_impl(lch[node], x) : delete_impl(rch[node], x - pos);
        update(node);
        if (isBad(node)) ret = &node;
    }
    return ret;
}
void ins(int x)
{
    int *ret = insert_impl(root, x);
    if (ret) rebuild(*ret);
}
void del(int x)
{
    int rk = rnk(x);
    if (x != kth(rk)) return;
    int *ret = delete_impl(root, rk);
    if (ret) rebuild(*ret);
}
int main()
{
    for (int i = 0; i < maxn; i++) pool[i] = i;
    int n;
    scanf("%d", &n);
    for (int i = 0, op, x; i < n; i++)
    {
        scanf("%d%d", &op, &x);
        if (op == 1) ins(x);
        if (op == 2) del(x);
        if (op == 3) printf("%d\n", rnk(x));
        if (op == 4) printf("%d\n", kth(x));
        if (op == 5) printf("%d\n", kth(rnk(x) - 1));
        if (op == 6) printf("%d\n", kth(rnk(x + 1)));
    }
    return 0;
}

```
<div id="__comment"></div>
