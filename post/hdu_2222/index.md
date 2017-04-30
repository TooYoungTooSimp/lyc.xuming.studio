---
template: post_with_netease
title: HDU 2222
pageId: hdu_2222
---

# HDU 2222

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
    node *trans[26], *fail;
    int cnt;
} nodes[500010], virt;
node *que[500010];
int tot;
node *root;
node *new_node() { return &nodes[tot++]; }
void insert(char *str)
{
    node *cur = root;
    for (; *str; str++)
    {
        if (cur->trans[*str - 'a'] == 0)
            cur->trans[*str - 'a'] = new_node();
        cur = cur->trans[*str - 'a'];
    }
    cur->cnt++;
}
void buildFail()
{
    int h = 0, t = 0;
    root->fail = &virt;
    que[t++] = root;
    while (h < t)
    {
        node *cur = que[h++];
        for (int i = 0; i < 26; i++)
        {
            node *f = cur->fail;
            while (f->trans[i] == 0) f = f->fail;
            f = f->trans[i];
            if (cur->trans[i])
                (que[t++] = cur->trans[i])->fail = f;
            else
                cur->trans[i] = f;
        }
    }
}
char buf[1000010];
int vis[500010];
int main()
{
    memset(vis, -1, sizeof(vis));
    int T, n;
    scanf("%d", &T);
    while (T--)
    {
        memset(nodes, 0, sizeof(nodes));
        tot = 0, root = new_node();
        for (int i = 0; i < 26; i++) virt.trans[i] = root;
        scanf("%d", &n);
        for (int i = 0; i < n; i++)
        {
            scanf("%s", buf);
            insert(buf);
        }
        buildFail();
        scanf("%s", buf);
        node *cur = root, *tmp;
        int ans = 0;
        for (char *ch = buf; *ch; ch++)
        {
            tmp = cur = cur->trans[*ch - 'a'];
            while (tmp != &virt && vis[tmp - nodes] != T)
            {
                vis[tmp - nodes] = T;
                ans += tmp->cnt;
                tmp = tmp->fail;
            }
        }
        printf("%d\n", ans);
    }
    return 0;
}

```
