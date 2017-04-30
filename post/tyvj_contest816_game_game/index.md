---
template: post_with_netease
title: TYVJ CONTEST816 GAME GAME
pageId: tyvj_contest816_game_game
---

# TYVJ CONTEST816 GAME GAME

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <algorithm>
#include <cctype>
#include <cstdio>
#include <vector>
using namespace std;
vector<int> graph[5001];
int n;
int main()
{
    freopen("game.in", "r", stdin);
    freopen("game.out", "w", stdout);
    scanf("%d", &n);
    for (int i = 1; i <= n; i++)
    {
        char ch;
        for (int j = 1; j <= n; j++)
        {
            while (!isdigit(ch = getchar()))
                ;
            if (ch == '1') graph[i].push_back(j);
        }
    }
    for (int i = 1; i <= n; i++)
        for (vector<int>::iterator j = graph[i].begin(); j != graph[i].end(); ++j)
            for (vector<int>::iterator k = graph[*j].begin(); k != graph[*j].end(); ++k)
                if (binary_search(graph[*k].begin(), graph[*k].end(), i))
                {
                    printf("%d %d %d", i, *j, *k);
                    return 0;
                }
    printf("-1");
    return 0;
}
```
<div id="__comment"></div>
