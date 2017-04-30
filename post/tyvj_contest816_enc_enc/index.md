---
template: post_with_netease
title: TYVJ CONTEST816 ENC ENC
pageId: tyvj_contest816_enc_enc
---

# TYVJ CONTEST816 ENC ENC

## 题目大意
暂无

## 题目解法
暂无

## RTFC

```cpp
#include <cstdio>
#include <iostream>
#include <string>
using namespace std;
char preh[256], revh[256];
string s1, s2, s3;
int main()
{
    freopen("enc.in", "r", stdin);
    freopen("enc.out", "w", stdout);
    cin >> s1 >> s2 >> s3;
    if (s1.size() != s2.size())
        cout << "ERROR";
    else
    {
        for (string::iterator i1 = s1.begin(), i2 = s2.begin(); i1 != s1.end(); ++i1, ++i2)
        {
            if (preh[*i1] == 0 && revh[*i2] == 0)
                preh[*i1] = *i2,
                revh[*i2] = *i1;
            else if (preh[*i1] == *i2 && revh[*i2] == *i1)
                continue;
            else
            {
                cout << "ERROR";
                return 0;
            }
        }
        for (string::iterator i3 = s3.begin(); i3 != s3.end(); ++i3)
            if (revh[*i3] == 0) {
                cout << "ERROR";
                return 0;
            }
            else
                putchar(revh[*i3]);
    }
    return 0;
}
```
<div id="__comment"></div>
