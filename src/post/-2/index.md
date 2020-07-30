---
title: isso_test
template: post_with_isso
pageId: isso_test
---

# isso_test

测试isso是否正常工作

> <span id="poem"></span>

<script>$(function(){$.ajax('/api/poem?rnd='+Date.now()+Math.random()).done(function(data){$('#poem').text(data);});});</script>

<div id="__comment"></div>