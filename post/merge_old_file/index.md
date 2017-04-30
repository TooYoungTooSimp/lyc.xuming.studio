---
template: post_with_netease
title: 将以前水过的题搬到新服务器上
pageId: merge_old_file
---

# 将以前水过的题搬到新服务器上

## 这件无聊的事的背景
我买了一个服务器，不知道干什么，就瞎搞了一通。（然后欣喜的发现我因为全省第九而退役，这个东西没卵用了

## 数据源
原来的数据在[GitHub](https://github.com/TooYoungTooSimp/my_solutions)上，我只转移了OnlineJudges这个文件夹里的源码。

## 转移方式
写了两个临时用的小程序，再加上Windows 10自带的WSL里的coreutils。

### step 1
两句bash命令
```bash
g++ -march=native -O3 mk.cpp -o mk
find | grep .cpp | while read line; do
    ./mk $line;
done
```
以及mk.cpp
```cpp
#include <bits/stdc++.h>
using namespace std;
char buffer[1 << 20 | 1];
char pageId[101], outFile[101];
int main(int argc, char **argv)
{
    char *fileName = argv[1] + 2;
    strcpy(pageId, fileName);
    freopen(fileName, "r", stdin);
    for (char *ptr = fileName; *ptr; ptr++)
        if (*ptr == '/')
            *ptr = ' ';
        else if (islower(*ptr))
            *ptr = toupper(*ptr);
        else if (*ptr == '.' && ptr[1] == 'c')
            *ptr = '\0';
    for (char *ptr = pageId; *ptr; ptr++)
        if (*ptr == '/' || *ptr == ' ')
            *ptr = '_';
        else if (isupper(*ptr))
            *ptr = tolower(*ptr);
        else if (*ptr == '.' && ptr[1] == 'c')
            *ptr = '\0';
    strcpy(outFile, pageId);
    size_t len = strlen(outFile);
    outFile[len++] = '.';
    outFile[len++] = 'm';
    outFile[len++] = 'd';
    freopen(outFile, "w", stdout);
    puts("---");
    puts("template: post_with_netease");
    printf("title: %s\n", fileName);
    printf("pageId: %s\n", pageId);
    puts("---");
    putchar('\n');
    printf("# %s\n\n", fileName);
    printf("## 题目大意\n暂无\n\n");
    printf("## 题目解法\n暂无\n\n");
    printf("## RTFC\n\n");
    puts("```cpp");
    size_t sz = fread(buffer, 1, 1 << 20 | 1, stdin);
    fwrite(buffer, 1, sz, stdout);
    puts("\n```");
    return 0;
}
```
### step 2
把文件放到文件夹里去，考虑到C++标准对文件系统支持有限（filesystem到底进标准了没有？），我选择了C#。
```cs
using System;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;

namespace MoveFile
{
    class Program
    {
        static void Main(string[] args)
        {
            string basePath = "*************";
            Directory.GetFiles(basePath).AsParallel().ForAll(path =>
            {
                string newPath = Path.Combine(basePath, Path.GetFileNameWithoutExtension(path));
                Directory.CreateDirectory(newPath);
                newPath = Path.Combine(newPath, "index.md");
                File.Move(path, newPath);
            });
            StringBuilder sb = new StringBuilder();
            foreach (var path in Directory.GetDirectories(basePath).Select(p => Path.GetFileName(p)))
                sb.AppendLine(String.Format("### [{0}](/post/{1})\n> {0}\n", path.Replace('_', ' ').ToUpper(), path));
            File.WriteAllText(Path.Combine(basePath, "index.md"), sb.ToString());
        }
    }
}

```
C#用的真爽。
### step 3
善后，发现生成的文件没加评论框
```bash
find | grep .md | while read line; do
    echo '<div id="__comment"></div>' >> $line;
done
```
## 感谢[Caddy](https://caddyserver.com/), the web server
自动SSL用起来真方便，自动Markdown生成真方便，Template真方便

## 语录
> <span id="poem"></span>

<script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>

<div id=__comment></div>