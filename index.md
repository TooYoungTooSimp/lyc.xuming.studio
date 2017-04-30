---
title: 开始页
template: basic
---

# 蒟蒻的新服务器

现在暂时什么都没有

> <span id="poem"></span>

<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
<script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>

<div id="disqus_thread"></div>
<script>
(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');
s.src = 'https://lyc-xuming-studio.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
</script>
                                