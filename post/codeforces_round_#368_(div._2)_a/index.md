---
template: post_with_netease
title: CODEFORCES ROUND #368 (DIV. 2) A
pageId: codeforces_round_#368_(div._2)_a
---

# CODEFORCES ROUND #368 (DIV. 2) A

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cctype>
#include <cstdio>
int main()
{
    int n, m;
    char ch;
    bool flag = false;
    scanf("%d%d", &n, &m);
    for (int i = 0; i < n * m; i++)
    {
        while (!isalpha(ch = getchar()))
            ;
        ch = toupper(ch);
        if (ch == 'C' || ch == 'M' || ch == 'Y') {
            flag = true;
            break;
        }
    }
    printf(flag ? "#Color" : "#Black&White");
    return 0;
}
```
<div id="__comment"></div>
