const md = require('markdown-it');
const fs = require('fs')

const md1 = md();
const md2 = md();

const testContent = fs.readFileSync('./test.md', 'utf-8');

// 基本用法
const res1 = md1.use(require('markdown-it-container'), 'demo').render(testContent)

console.log(res1)

// 把::: demo 装进<demo></demo>组件

const res2 = md2.use(require('markdown-it-container'), 'demo', {
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
})

fs.writeFile('markdown-it-container-convert.test2.md', res2.render(testContent), (err) => {
  if (err) {
    console.log(err);
  }
})
