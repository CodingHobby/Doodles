const express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	path = require('path'),
	server = app.listen(port, function () {
		console.log('App running on port ' + port)
	})

app.use(express.static(path.join(__dirname, 'app')))

app.get('/', (req, res) => res.redirect('/home'))