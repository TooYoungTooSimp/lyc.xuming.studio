---
template: post_with_isso
title: POJ 3630
pageId: poj_3630
---

# POJ 3630
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
    node *trans[10];
    bool is_end;
} nodes[100010];
node *root;
int cnt;
node *new_node() { return &nodes[cnt++]; }
char buf[11];
bool try_insert(node *n, char *str)
{
    if (n->is_end) return false;
    if (*str == '\0')
    {
        for (int i = 0; i < 10; i++)
            if (n->trans[i])
                return false;
        n->is_end = true;
        return true;
    }
    if (n->trans[*str - '0'] == 0) n->trans[*str - '0'] = new_node();
    return try_insert(n->trans[*str - '0'], str + 1);
}
int main()
{
    int t, n;
    scanf("%d", &t);
    while (t--)
    {
        memset(nodes, 0, sizeof(nodes));
        cnt = 0;
        root = new_node();
        scanf("%d", &n);
        bool flag = true;
        while (n--)
        {
            scanf("%s", buf);
            if (flag) flag = try_insert(root, buf);
        }
        puts(flag ? "YES" : "NO");
    }
    return 0;
}
```
<div id="__comment"></div>
