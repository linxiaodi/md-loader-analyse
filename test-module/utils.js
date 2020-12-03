const { compileScript, compileTemplate } = require('@vue/compiler-sfc')

const stripTemplate = (str) => {
	const res = str.match(/<(template)>(.+)<\/\1>/is)
	return res && res[2] ? res[2] : ''
}

const stripScript = (str) => {
	const result = str.match(/<(script)>(.+)<\/\1>/is)
	return result && result[2] ? result[2].trim() : ''
}

/**
 * 把传入的template 组成render函数，把传入的script重新包装一次
 * @param {String} template 模板字符串 不包含template标签
 * @param {String} script
 * @return {String} 组合成的vue文件
 * */
const genInlineComponentText = (template, script) => {
	
	console.log(template);
	const compiled = compileTemplate({
		source: `<div>${template}</div>`,
		filename: 'inline-component',
		compilerOptions: {
			mode: 'function',
		},
	})

	// tips
	if (compiled.tips && compiled.tips.length) {
		compiled.tips.forEach(tip => {
			console.warn(tip)
		})
	}
	// errors
	if (compiled.errors && compiled.errors.length) {
		console.error(
			`\n  Error compiling template:\n${pad(compiled.source)}\n` +
			compiled.errors.map(e => `  - ${e}`).join('\n') +
			'\n',
		)
	}

	script = script.trim()
	if (script) {
		script = script
		.replace(/export\s+default/, 'const democomponentExport =')
		.replace(/import ({.*}) from 'vue'/g, (s, s1) => `const ${s1} = Vue`)
	} else {
		script = 'const democomponentExport = {}'
	}

	const demoComponentContent = `${(compiled.code).replace('return function render','function render')}`

	return `(function() {
    ${demoComponentContent}
    ${script}
    return {
      render,
      ...democomponentExport
    }
  })()`
}

module.exports = {
	genInlineComponentText,
	stripScript,
	stripTemplate
}
