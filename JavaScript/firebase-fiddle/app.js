const firebase = require('firebase')
const firebaseInit = require('./firebase-init')
const { Element } = require('mare-dom')

let form = new Element('form')
const nameList = new Element('ul')

let names = []

const database = firebase.database()
const ref = database.ref('names')


let userInput = new Element('input')
	.attr('type', 'text')
	.addClass('form-control')
	.id('user')
	.render()

let submitButton = new Element('input')
	.attr('type', 'submit')
	.addClass('btn')
	.render()

form
	.addChild(userInput, submitButton)
	.render()

submitButton.on('click', e => {
	e.preventDefault()
	const data = {
		name: userInput.value()
	}
	ref.push(data)
	userInput.value('')
})

ref.on('value', data => {
	let values = data.val()
	if (values) {
		names = []
		nameList.content('')
		let keys = Object.keys(values)
		keys.forEach(key => {
			const name = values[key].name
			names.push(name)
		})
	}
	nameList
		.addChild(list(names))
		.render()
}, err => console.error(err))

function list(names) {
	return names.map(function (name) {
		return new Element('li', name)
			.addClass('name')
			.render()
	})
}