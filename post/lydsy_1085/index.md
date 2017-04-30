---
template: post_with_netease
title: LYDSY 1085
pageId: lydsy_1085
---

# LYDSY 1085

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
template <typename T>
inline void swap(T &a, T &b)
{
    T t = a;
    a = b;
    b = t;
}
const char des[5][5] = { {'1', '1', '1', '1', '1'},
                        {'0', '1', '1', '1', '1'},
                        {'0', '0', '*', '1', '1'},
                        {'0', '0', '0', '0', '1'},
                        {'0', '0', '0', '0', '0'} };
const int dx[] = { 1, 2, 2, 1, -1, -2, -2, -1 };
const int dy[] = { -2, -1, 1, 2, 2, 1, -1, -2 };
const int Move[8][2] = { {1, -2}, {2, -1}, {2, 1}, {1, 2}, {-1, 2}, {-2, 1}, {-2, -1}, {-1, -2} };
char cur[5][5];
#define H()                                                \
    ((cur[0][0] != des[0][0]) + (cur[0][1] != des[0][1]) + \
     (cur[0][2] != des[0][2]) + (cur[0][3] != des[0][3]) + \
     (cur[0][4] != des[0][4]) + (cur[1][0] != des[1][0]) + \
     (cur[1][1] != des[1][1]) + (cur[1][2] != des[1][2]) + \
     (cur[1][3] != des[1][3]) + (cur[1][4] != des[1][4]) + \
     (cur[2][0] != des[2][0]) + (cur[2][1] != des[2][1]) + \
     (cur[2][2] != des[2][2]) + (cur[2][3] != des[2][3]) + \
     (cur[2][4] != des[2][4]) + (cur[3][0] != des[3][0]) + \
     (cur[3][1] != des[3][1]) + (cur[3][2] != des[3][2]) + \
     (cur[3][3] != des[3][3]) + (cur[3][4] != des[3][4]) + \
     (cur[4][0] != des[4][0]) + (cur[4][1] != des[4][1]) + \
     (cur[4][2] != des[4][2]) + (cur[4][3] != des[4][3]) + \
     (cur[4][4] != des[4][4]) - 1)
inline bool can(int x, int y)
{
    return 0 <= x && x <= 4 && 0 <= y && y <= 4;
}
int DEP;
bool dfs(int x, int y, int step)
{
    if (step == DEP) return H() == -1;
    if (H() + step > DEP) return false;
    for (int i = 0, nx, ny; i < 8; i++)
        if (can(nx = x + dx[i], ny = y + dy[i]))
        {
            swap(cur[x][y], cur[nx][ny]);
            if (dfs(nx, ny, step + 1)) return true;
            swap(cur[x][y], cur[nx][ny]);
        }
    return false;
}
int main()
{
    int T;
    scanf("%d", &T);
    while (T--)
    {
        for (int i = 0; i < 5; i++)
            scanf("%s", cur[i]);
        int si = -1, sj = -1;
        for (int i = 0; i < 5; i++)
            for (int j = 0; j < 5; j++)
                if (cur[i][j] == '*')
                    si = i, sj = j;
        for (DEP = 0; DEP <= 15; DEP++)
            if (dfs(si, sj, 0))
                break;
        printf("%d\n", DEP > 15 ? -1 : DEP);
    }
    return 0;
}
```
