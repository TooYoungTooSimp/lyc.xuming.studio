---
template: post_with_netease
title: LYDSY 3098
pageId: lydsy_3098
---

# LYDSY 3098

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <cstdlib>
int main()
{
    printf("100000 %d\n", ((rand() << 16) | rand()) % 100000 + 1);
    for (int i = 0; i < 100000; i++) putchar(rand() % 26 + 'a');
    return 0;
}
```
<div id="__comment"></div>
