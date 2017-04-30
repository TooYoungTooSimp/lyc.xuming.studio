---
template: post_with_netease
title: LYDSY 1029
pageId: lydsy_1029
---

# LYDSY 1029

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <algorithm>
#include <cctype>
#include <cstdio>
#include <queue>
using namespace std;
inline void readInt(int &x)
{
    int ch = x = 0;
    while (!isdigit(ch = getchar()))
        ;
    for (; isdigit(ch); ch = getchar()) x = x * 10 + ch - '0';
}
struct abcd
{
    int t1, t2;
    bool operator<(const abcd &rhs) const
    {
        return this->t2 < rhs.t2;
    }
} T[160001];
priority_queue<int> heap;
int n, now, ans;
int main()
{
    readInt(n);
    for (int i = 0; i < n; i++) readInt(T[i].t1), readInt(T[i].t2);
    sort(T, T + n);
    for (int i = 0; i < n; i++)
        if (now + T[i].t1 <= T[i].t2)
            heap.push(T[i].t1), now += T[i].t1, ans++;
        else if (T[i].t1 <= heap.top() && now - heap.top() + T[i].t1 <= T[i].t2)
            now -= heap.top(),
                now += T[i].t1,
                heap.pop(),
                heap.push(T[i].t1);
    printf("%d", ans);
    return 0;
}
```
<div id="__comment"></div>
