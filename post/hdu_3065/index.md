---
template: post_with_netease
title: HDU 3065
pageId: hdu_3065
---

# HDU 3065
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
#include <cstring>
struct node
{
    node *trans[26], *fail;
    int id;
} nodes[50010], virt;
node *root;
int tot;
node *new_node() { return &nodes[tot++]; }
node *que[50010];
void insert(char *str, int idx)
{
    node *cur = root;
    for (; *str; str++)
    {
        if (cur->trans[*str - 'A'] == 0) cur->trans[*str - 'A'] = new_node();
        cur = cur->trans[*str - 'A'];
    }
    cur->id = idx;
}
void getFail()
{
    int h = 0, t = 0;
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
char buf[2000010];
char virs[1010][55];
int cnt[1010];
void run(char *ch)
{
    node *cur = root;
    for (; *ch; ch++)
        if (isupper(*ch))
        {
            while (cur->trans[*ch - 'A'] == 0) cur = cur->fail;
            cur = cur->trans[*ch - 'A'];
            node *tmp = cur;
            for (; tmp; tmp = tmp->fail)
                cnt[tmp->id]++;
        }
        else
            cur = root;
}
int main()
{
    int n;
    while (~scanf("%d", &n))
    {
        memset(cnt, 0, sizeof(cnt));
        memset(nodes, 0, sizeof(nodes));
        tot = 0;
        (root = new_node())->fail = &virt;
        for (int i = 0; i < 26; i++) virt.trans[i] = root;
        for (int i = 1; i <= n; i++)
        {
            scanf("%s", virs[i]);
            insert(virs[i], i);
        }
        getFail();
        scanf("%s", buf);
        int len = strlen(buf);
        run(buf);
        for (int i = 1; i <= n; i++)
            if (cnt[i])
                printf("%s: %d\n", virs[i], cnt[i]);
    }
    return 0;
}
```
<div id="__comment"></div>
