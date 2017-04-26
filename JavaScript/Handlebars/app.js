import template from './templates/tmp.hbs'
import './app.css'
import Handlebars from 'handlebars'

const todos = [
	'Do stuff',
	'Do more stuff',
	'Do some other stuff'
]

function createHTML({ todos }) {
	var container = document.getElementById('container')
	container.innerHTML = template({ todos })
}

createHTML({
	todos
})