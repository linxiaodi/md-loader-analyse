import React from 'react'
import ReactDOM from 'react-dom'
import Block from './block'

const Demo = () => <div>hehehe</div>

const Pen = () => (
	<>
		<h2>React Test</h2>
		<Block display={<Demo />}>
			{/* 转义文字	*/}
		</Block>
		<p>hello world</p>
	</>
)

export default Pen
