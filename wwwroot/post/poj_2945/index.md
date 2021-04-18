---
template: post_with_isso
title: POJ 2945
pageId: poj_2945
---

# POJ 2945
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstring>
struct node
{
    node *trans[4];
    int cnt;
} nodes[400010];
int tot;
node *root;
inline node *new_node() { return &nodes[tot++]; }
void try_insert(node *n, char *str)
{
    if (*str == '\0')
        n->cnt++;
    else
    {
        if (n->trans[*str - '0'] == 0) n->trans[*str - '0'] = new_node();
        try_insert(n->trans[*str - '0'], str + 1);
    }
}
char f[1 << 8 | 1];
int ans[20010];
int main()
{
    f['A'] = '0', f['C'] = '1', f['G'] = '2', f['T'] = '3';
    int n, m;
    char buf[22];
    while (~scanf("%d%d", &n, &m) && (n + m))
    {
        memset(ans, 0, sizeof(ans));
        memset(nodes, 0, sizeof(nodes));
        tot = 0;
        root = new_node();
        for (int i = 0; i < n; i++)
        {
            scanf("%s", buf);
            for (int j = 0; j < m; j++)
                buf[j] = f[buf[j]];
            try_insert(root, buf);
        }
        for (int i = 0; i < tot; i++) ans[nodes[i].cnt]++;
        for (int i = 1; i <= n; i++)
            printf("%d\n", ans[i]);
    }
    return 0;
}
```
<div id="__comment"></div>
