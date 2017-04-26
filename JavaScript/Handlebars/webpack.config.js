const path = require('path')

module.exports = {
	entry: path.join(__dirname, "app.js"),
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	module: {
		rules: [
			{test: /\.hbs$/, loader: 'handlebars-loader'},
			{test: /\.css$/, loader: 'style-loader!css-loader'},
			{test: /\.js/, exclude: /node_module/, loader: 'babel-loader'}
		]
	}
}