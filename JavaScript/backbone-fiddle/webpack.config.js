const path = require('path')

module.exports = {
	entry: path.join(__dirname, 'app.js'),
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['es2017'],
					plugins: ['transform-class-properties']
				}
			}
		]
	}
}