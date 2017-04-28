const path = require('path')
module.exports = {
	entry: path.join(__dirname, "app", "home", "app.js"),
	output: {
		path: path.join(__dirname, 'app', 'home'),
		filename: 'bundle.js'
	}
}