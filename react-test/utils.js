const stripContent = (input) => {
	const reg = /ReactDOM.render\(((.|\n)+),(.|\n)+mountNode(.|\n)+/g
	const [source, trigger] = reg.exec(input);
	return {
		component: input.replace(source, ''),
		trigger,
		source
	}
}

module.exports = { stripContent }
