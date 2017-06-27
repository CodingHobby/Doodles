const Hapi = require('hapi')
const routes = require('./routes')
const server = new Hapi.Server()


// Create a new Hapi server
server.connection({
	host: 'localhost',
	port: 3000
})

server.register(require('vision'), (err) => {
	if(err) throw err

	server.views({
		engines: {
			handlebars: require('handlebars')
		},
		path: 'views',
		layoutPath: 'views/layout',
		layout: 'default'
	})
})

server.route(routes)

		server.start(function (err) {
			if(err) throw err
			console.log('Server started at: ' + server.info.uri)
		})