const firebase = require('firebase')
const initFirebase = require('../initFirebase')

initFirebase()

module.exports = [
	{
		method: 'GET',
		path: '/',
		handler: function (req, res) {
			let todos = []
			firebase.database()
				.ref('/todos')
				.once('value', function (snap) {
					let snapshot = snap.val()
					if(snapshot)
						Object.keys(snapshot).forEach(k => todos.push(snapshot[k]))
					else
						todos = []
					return res.view('home', { todos })
				})
		}
	},
	{
		method: 'POST',
		path: '/add',
		handler: function(req, res) {
			firebase.database()
				.ref('/todos')
				.push(req.payload.todo)
			res.redirect('/')
		}
	}
]