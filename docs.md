---
layout: page
title: Documentation
permalink: /docs/
---

<ol>
{% for page in site.pages %}
  {% if page.permalink contains '/docs/' and page.permalink != '/docs/' %}
    <li><a href="{{page.permalink}}">{{page.title}}</a></li>
  {% endif %}
{% endfor %}
</ol>
