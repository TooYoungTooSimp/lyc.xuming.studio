---
title: 开始页
template: basic
---

# 蒟蒻的新服务器

现在暂时什么都没有

> <span id="poem"></span>
<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
<script>
    $(function() {
        $.ajax("/api/poem").done(function(data){$("#poem").innerHTML=data});
    });
</script>