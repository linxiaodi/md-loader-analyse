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

接下来需要把当前文件解析成`vue-loader`处理的格式，vue-loader一般处理这种文件：
```vue
<template>
</template>
<script lang="ts">
export default {
  // xxx
}
</script>
```


我们当前的文件长这样：

```
// xxx.md
# Test
:::demo
<template>
  <div>实例文档</div>
</template>
<script lang="ts">
export default {
  // xxx
}
</script>
:::

// markdown-it-container转换后：

// xxx.md
<h1>Test</h1>
// 转义后的输出文字
<template>
  <div>实例文档</div>
</template>
<script lang="ts">
export default {
  // xxx
}
</script>
// 转义后的输出文字 end

<!--element-demo:
<template>
  <div>实例文档</div>
</template>
<script lang="ts">
export default {
  // xxx
}
</script>
:element-demo-->
```

那么在markdown-it-container的处理过后把element-demo:的输入提取出成render function：
```
// xxx.md
<h1>Test</h1>
// 转义后的输出文字
<template>
  <div>实例文档</div>
</template>
<script lang="ts">
export default {
  // xxx
}
</script>
// 转义后的输出文字 end

<template #source><el-demo-0></template>
```


最后一个页面路由输出：

```
<template>
    // xxx.md
    <h1>Test</h1>
    // 转义后的输出文字
    <template>
      <div>实例文档</div>
    </template>
    <script lang="ts">
    export default {
      // xxx
    }
    </script>
    // 转义后的输出文字 end
    <template #source><el-demo-0></template>
</template>
<script>
export default {
    components: {
        'el-demo-0': (function() {
            // render function
            return {
                render() {}
            }
        })
    }
}
</script>
```
