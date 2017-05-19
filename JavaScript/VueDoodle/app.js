const app = new Vue({
	el: '#app',
	data: {
		todos: [
			{
				text: "Do some stuff",
				completed: false
			},
			{
				text: "Do more stuff",
				completed: false
			},
			{
				text: "Do other Vue stuff",
				completed: true
			}
		],
		newTodo: ""
	},
	methods: {
		toggleCompleted: function(i) {
			this.todos[i].completed = !this.todos[i].completed
		},

		addTodo: function(e) {
			e.preventDefault()
			this.todos.push({
				text: this.newTodo,
				completed: false
			})
		},

		deleteTodo(i) {
			this.todos.splice(i, 1)
		}
	}
})