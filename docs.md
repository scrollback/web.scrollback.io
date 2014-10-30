---
layout: page
title: Documentation
permalink: /documentation/
---

<ol>
{% for page in site.pages %}
  {% if page.permalink contains '/docs/' %}
    <li><a href="{{page.permalink}}">{{page.title}}</a></li>
  {% endif %}
{% endfor %}
</ol>
