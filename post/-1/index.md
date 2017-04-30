---
title: disqus_test
template: post_with_disqus
---

# disqus_test

测试disqus是否正常工作

> <span id="poem"></span>

<script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>

<div id=disqus_thread></div>