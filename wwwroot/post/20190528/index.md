---
template: post_with_isso
title: 蓝桥杯国赛&强网杯
pageId: 20190528
---

<style>
    .hid {
        color: white;
    }
    .hid:hover {
        color: black;
    }
</style>

# 蓝桥杯国赛&强网杯

众所周知我是一名非常菜的ACM/CTF复合选手。

## 蓝桥杯国赛

显然我们敬爱的平静的人买票总是后知后觉的，所以这次我们不得不坐一晚上的**硬座**坐去北京。<span class="hid">晚上的火车非常无聊什么都玩不了，于是和可爱的红小豆胡扯了一晚上。</span>趴在桌子上睡觉，然后在凌晨三点被气体胀醒，显然趴着睡会导致醒来后打嗝（暴论）。

第二天昏昏沉沉地走出火车站，试图和佬蒋去找记忆中的地下麦当劳，走了一圈无功而返于是只好去吃门口的天价麦当劳。在把巨重无比的书包扔给佬蒋后便和大部队去找龙神。在经历过种种交通问题后，见到了龙神，发现他意外的年轻。

在龙神带着我们逛过北航后，于是就去“CUGACM传统聚餐点”吃饭，我还是第一次知道这种地方的存在。

接着看考场和找宾馆，显然宾馆也订晚了，在从郊区向农村深入数公里后，才看到要住的位置。上 山 下 乡

回到宾馆看到佬蒋仍然瘫在那里，火车上的确没法睡得好。

等到他终于醒过来，感觉很无聊，于是打算做一些生草的事情来改善一下心情，他提议看电视，当我们打开电视的时候，发现竟然可以投屏！于是我们就开始把手机投影在屏幕上……看新宝岛！*下一站 下下一站/下下下一站仍然不是我最终的目的地\~* 接着是《春光献祖国》，显然佬蒋总是能够发现令人生草的视频。

草生完后佬蒋开始用我的电脑投屏打东方，然后只要音乐一卡，他就会挂，虽然他看的是电脑自己的屏幕，并不会卡。

晚上因为懒得出门而和学长们一起点了外卖。<span class="hid">吃饭时还被学长调侃（x </span><span class="hid">我也希望那是真的</span>

第二天早上起来，买早饭的时候，刚好卖到我的时候我要的东西就卖完了。依旧脸黑，已经习惯了所以就那样吧。反正想要的事物无法得到已经是一个常态了。

走去学校的路上看到一家麦当劳，去吃了个早餐，再次证明火车站有+100%的价格加成。

等待入场的时候碰到现在在蛤大的高中信息组同学，算了不说了。

开始后发现题目数量相比于往年远远变多，而且第一题就有点麻烦，还只有5分。不过还是在暴力跑出来的范围内。第二题的输入非常恶心，于是预处理了一下，硬是dfs出了个答案。第三题不会，第四题还是瞎dfs，感觉做对了，第五题数学打表，打不出来的就手算，也感觉对了。编程大题部分两题正解一题错误两题暴力。暴力打完就考完了。

出来发现第二题的答案忘记减初始值了，血亏。<span class="hid">拍照时的表情被红小豆评价为很糟糕，显然我不开心的时候是容易辨认的。</span>

中午吃烤串，我吃的速度好像是其他人的三倍，看来是我功耗太高了。

下午顺便旅游，过天安门安检的时候被盘问高数书里什么内容，不知安检在想什么，天安门在外墙维护，只能看见脚手架。

晚上在火车站等车的时候看佬蒋玩他的造车游戏，也能打发时间。

刚上火车的时候火车没开空调，比外面还热。

卧铺摇摇晃晃的很舒服，很快就睡着了。

## 强网杯

周日早上回到武汉便打车回学校直奔机房，开始投入ctf。

<span class="hid">红小豆醒的超晚，明明她还要打武理校赛的。</span>

上午看pwn的题目，一个也不会。

中途发了蓝桥杯国赛获奖名单，不敢看。

最后还是没有国一。嗯。

差了有一面的距离，所以是真的因为我菜吧。

下午去看别的题目，发现有个密码学的题可做，下面放上writeup：

### randomstudy

#### pretask

这个问题首先是一个爆破SHA256，使用go爆破之

#### challenge 1

根据题目附件，首先是用当前时间初始化随机数生成器然后依次生成随机数与用户输入进行比对。
考虑到网络延迟，可以在当前时间附近枚举随机数种子，然后生成n次后尝试输入。

```python
def rand_n(s, k):
    random.seed(s)
    for _ in xrange(k):
        r = random.randint(0, 2**64)
    return r
```

#### challenge 2

首先将.class反编译，获得如下结果：

```java
import java.util.Random;

public class Main {

   public static void main(String[] var0) {
      Random var1 = new Random();
      System.out.println(var1.nextInt());
      System.out.println(var1.nextInt());
      System.out.println(var1.nextInt());
   }
}
```

通过查询JDK源码了解到Java的Random使用的是线性同余随机数生成器，故仿照写出Python实现：

```python
def rnd_java(prev):
    if prev < 0:
        prev = (1 << 32) + prev
    multiplier = 0x5DEECE66D
    addend = 0xB
    mask = (1 << 48) - 1
    next = (prev * multiplier + addend) & mask
    return next
```

#### challenge 3

仍然使用challenge 1的随机数种子，于是直接发送`random.getrandbits(32)`即可。

exp如下：

```python
from pwn import *
from subprocess import Popen, PIPE
import time, random


def rand_n(s, k):
    random.seed(s)
    for _ in xrange(k):
        r = random.randint(0, 2**64)
    return r


def rnd_java(prev):
    if prev < 0:
        prev = (1 << 32) + prev
    multiplier = 0x5DEECE66D
    addend = 0xB
    mask = (1 << 48) - 1
    next = (prev * multiplier + addend) & mask
    return next


def s32(x):
    x &= (1 << 32) - 1
    if x >= (1 << 31):
        x = x - (1 << 32)
    return x


sh = remote("119.3.245.36", 23456)
sh.recvline()
target = sh.recvline().strip()[-64:]
prefix = sh.recvline().strip()[-10:]
token = "**********************"
print target, prefix
skr = Popen(["./qwb_crack", target, prefix], stdout=PIPE).stdout.read().strip()
sh.sendline(skr)
sh.sendline(token)
sh.recvuntil("librandomstudy")
print sh.recvuntil("[-]")
time_base = int(time.time())
for i in xrange(30):
    sh.sendline(str(rand_n(time_base - 15 + i, i + 1)))
    res = sh.recvuntil("[-]")
    if "++++++" in res:
        print res
        break
n1 = int(sh.recvline().strip())
sh.recvuntil("[-]")
n2 = int(sh.recvline().strip())
sh.recvuntil("[-]")
print n1, n2
for i in xrange(1 << 16):
    if s32(rnd_java(n1 << 16 | i) >> 16) == n2:
        print "ans", s32(rnd_java(rnd_java(n1 << 16 | i)) >> 16)
        sh.sendline(str(s32(rnd_java(rnd_java(n1 << 16 | i)) >> 16)))
sh.sendline(str(random.getrandbits(32)))
sh.interactive()
```

第一次在大型ctf比赛中过非签到题呢。

<span class="hid">晚上和打完武理校赛的红小豆讨论题目，发现自己好像理想情况能做六个，不过现场发挥肯定还有减益。可爱的红小豆打得比武理一队都好，真是棒到不行了。</span>

<hr />
> <span id='poem'></span>

<div id="__comment"></div>
<script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>
