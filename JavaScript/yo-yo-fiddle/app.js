import yo from 'yo-yo'

let todos = [
	'Do stuff',
	'Do more stuff',
	'Do some other stuff'
]

var el = list(todos)

function list(items) {
	return yo`<div class="board">
    ${items.map(function (item, i) {
			return yo`<div class="comment">
					${item}
				<button onclick=${function() {remove(i)}} class="btn btn-red">Remove</button>
			</div>`
		})}
		</div>
  </ul>`
}

document.getElementById('root').appendChild(el)

document.getElementById('add').addEventListener('click', function(e) {
	e.preventDefault()

	todos.push(document.getElementById('text').value)
	document.getElementById('text').value = ''
	let newList = list(todos)
	yo.update(el, newList)
})

function remove(i) {
	console.log('Remove')
	todos.splice(i, 1)
	let newList = list(todos)
	yo.update(el, newList)
}