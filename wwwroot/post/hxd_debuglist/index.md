---
template: post_with_isso
title: hxd's debug list
pageId: hxd_debuglist
---

# hxd's debug list

> ACM本就逆风而行，在去机房的路上被风吹翻很正常。

- 线段树要开4倍内存
- cin跑得超级慢
- memset 比 for循环快得多
  - memset总是清空整个数组，有时候只清理要用到的部分用for也许更好。
- 有多组数据时要清空全局变量（以及各种队列）
- `std::accumulate` 的返回类型由第三个参数（初始值）决定。
- 进bfs的时候要记得push初始状态。 / front后记得pop。
- 检查输出编号是否在范围内(0)。
- 检查不存在可行解时的输出(-1)。
- cin不仅跑得慢，而且跑得超级无敌螺旋飞天香蕉船慢。
- 当你怎么样都过不了的时候（显然不会TLE的东西TLE了或者RE），试试把数组开大十倍，有可能是题面打错了。
- `explicit specialization of 'template<class _Tp> struct std::hash' outside its namespace must use a nested-name-specifier [-fpermissive]`for example: `struct std::hash<pair<int, int>>` but not `struct hash<pair<int, int>>`
- 重构代码之后记得把前一次的所有不该用的东西清掉；记得if之后还是要else break的；
- 如果写一个分数类的话可能会因为分子分母不可约导致爆`long long`，题目要输出$P*Q^{-1} \pmod{M}$的时候直接每次求个逆元就好。这样算出来的东西甚至可以求前缀和。
- `for (int i = 0; i < 100000000; i++)`里面出现的`i * i`会爆范围，比如打质数表的时候。
- 使用`<=>`而非'== -1,0,1'来判断`strcmp`的返回值。

<div id="__comment"></div>
