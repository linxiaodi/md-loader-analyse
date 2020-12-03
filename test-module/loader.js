const fs = require('fs')
const fileStr = fs.readFileSync('./test.md', 'utf-8')
const { stripTemplate, stripScript, genInlineComponentText } = require('./utils')
let md = require('markdown-it')();

md.use(require('markdown-it-container'), 'demo', {
	validate: function(params) {
		return params.trim().match(/^demo\s*(.*)$/)
	},

	render(tokens, idx) {
		const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
		if (tokens[idx].nesting === 1) {
			const description = m && m.length > 1 ? m[1] : ''
			const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
			return `<demo-block>
        ${description ? `<div>${md2.render(description)}</div>` : ''}
        <!--element-demo: ${content}:element-demo-->
        `
		}
		return '</demo-block>'
	},
});

const loader = (filStr) => {
	const content = md.render(fileStr)

	const startTag = '<!--element-demo:'
	const startTagLen = startTag.length
	const endTag = ':element-demo-->'
	const endTagLen = endTag.length

	let componenetsString = ''
	let id = 0 // demo 的 id
	let output = [] // 输出的内容
	let start = 0 // 字符串开始位置

	let commentStart = content.indexOf(startTag)
	let commentEnd = content.indexOf(endTag, commentStart + startTagLen)
	while (commentStart !== -1 && commentEnd !== -1) {
		output.push(content.slice(start, commentStart))

		const commentContent = content.slice(commentStart + startTagLen, commentEnd)
		const html = stripTemplate(commentContent)
		const script = stripScript(commentContent)
		let demoComponentContent = genInlineComponentText(html, script)
		const demoComponentName = `element-demo${id}`
		output.push(`<template #source><${demoComponentName} /></template>`)
		componenetsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`
		// 重新计算下一次的位置
		id++
		start = commentEnd + endTagLen
		commentStart = content.indexOf(startTag, start)
		commentEnd = content.indexOf(endTag, commentStart + startTagLen)
	}

	output.push(content.slice(start))

	let pageScript = ''
	if (componenetsString) {
		pageScript = `<script lang="ts">
      import * as Vue from 'vue';
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        }
      }
    </script>`
	}

	const result = `
  <template>
    <section class="content element-doc">
      ${output.join('')}
    </section>
  </template>
  ${pageScript}
  `
	return result
}
