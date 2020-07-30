---
template: post_with_isso
title: LYDSY 1216
pageId: lydsy_1216
---

# LYDSY 1216
<span id="poem"></span><script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <queue>
using namespace std;
struct task
{
    int id, arrTime, exeTime, pri;
    bool operator<(const task &rhs) const
    {
        return pri < rhs.pri || (pri == rhs.pri && arrTime > rhs.arrTime);
    }
};
priority_queue<task> heap;
int main()
{
    int curtime = 0;
    task newTask;
    while (~scanf("%d%d%d%d", &newTask.id, &newTask.arrTime, &newTask.exeTime, &newTask.pri))
    {
        int delta = newTask.arrTime - curtime;
        while (heap.empty() == false && delta > 0)
        {
            if (heap.top().exeTime <= delta)
            {
                delta -= heap.top().exeTime;
                curtime += heap.top().exeTime;
                printf("%d %d\n", heap.top().id, curtime);
                heap.pop();
            }
            else
            {
                ((task *)(&heap.top()))->exeTime -= delta;
                curtime += delta;
                delta = 0;
            }
        }
        curtime += delta;
        heap.push(newTask);
    }
    while (!heap.empty())
    {
        curtime += heap.top().exeTime;
        printf("%d %d\n", heap.top().id, curtime);
        heap.pop();
    }
    return 0;
}
```
<div id="__comment"></div>
