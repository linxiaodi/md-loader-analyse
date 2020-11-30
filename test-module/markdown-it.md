markdown-it-container 是为了把`:::demo *content* ::::`组合转换成：
```
<demo-block>
<!--element-demo:
    *content*
:element-demo-->
<em>content</em>
<demo-block>
```

多复制了一份并且给给源文件加了一份`<!--element-demo: :element-demo-->`的*markdown注释标识符*。
