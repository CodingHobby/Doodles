window.addEventListener('load', function () {

	const PLAYERS = ['X', 'O']
	let curr_player = 0
	const WINS = [
		[0, 1, 2],
		[0, 4, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[2, 4, 6],

		[3, 4, 5],

		[6, 7, 8]
	]

	const winner = document.getElementById('winner')

	let cells = Array.prototype.slice.call(document.querySelectorAll('.cell'))
	cells.forEach(cell => cell.addEventListener('click', function () {
		if (!cell.innerHTML) {
			cell.innerHTML = PLAYERS[curr_player]
			WINS.forEach(win => {
				let count = 0;
				win.forEach(winCell => {
					if (cells[winCell].innerHTML == PLAYERS[curr_player]) {
						count++;
					}
				})
				if (count == 3) {
					 winner.innerHTML = (PLAYERS[curr_player] + ' won!')
				}
			})
			curr_player = curr_player == 0 ? 1 : 0
		}
	}))
})