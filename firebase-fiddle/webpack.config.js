const path = require('path')
module.exports = {
	entry: path.join(__dirname, "app.js"),
	output: {
		path: __dirname,
		filename: "bundle.js"
	}
}