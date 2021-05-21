import React from 'react';
import ReactDOM from 'react-dom';

const Demo = () => <div>123456</div>;

const Ret = () => (
	<section class="content element-doc">
		<h2>React Test</h2>
		<p>hello world</p>
		<DemoBlock display={<Demo name="heheh"/>}
		           highlight={
			           <pre><code class="language-jsx">const Demo = () =&gt; &lt;div&gt;123456&lt;/div&gt;

				           ReactDOM.render(&lt;Demo name=&quot;heheh&quot; /&gt;, mountNode)
</code></pre>
		           }></DemoBlock>
	</section>
);
export default Ret;
