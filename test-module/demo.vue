
  <template>
    <section class="content element-doc">
      <h2>Test test</h2>
<p>用图标、图片或者字符的形式展示用户或事物信息。</p>
<ul>
<li>first</li>
<li>second</li>
</ul>
<demo-block>
        
        <template #source><element-demo0 /></template>
        <pre><code class="language-html">&lt;template&gt;
  &lt;div&gt;{{ name }}&lt;/div&gt;
  &lt;div @click=&quot;count++&quot;&gt;{{ count }}&lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    data () {
      return {
        name: 'linxiaodi',
        count: 0
      }
    }
  }
&lt;/script&gt;
</code></pre>
</demo-block>
    </section>
  </template>
  <script lang="ts">
      import * as Vue from 'vue';
      export default {
        name: 'component-doc',
        components: {
          "element-demo0": (function() {
    const { toDisplayString: _toDisplayString, createVNode: _createVNode, openBlock: _openBlock, createBlock: _createBlock } = Vue

function render(_ctx, _cache) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("div", null, _toDisplayString(_ctx.name), 1 /* TEXT */),
    _createVNode("div", {
      onClick: _cache[1] || (_cache[1] = $event => (_ctx.count++))
    }, _toDisplayString(_ctx.count), 1 /* TEXT */)
  ]))
}
    const democomponentExport = {
    data () {
      return {
        name: 'linxiaodi',
        count: 0
      }
    }
  }
    return {
      render,
      ...democomponentExport
    }
  })(),
        }
      }
    </script>
  