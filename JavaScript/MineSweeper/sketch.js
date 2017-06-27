const w = 20
let grid

let cols 
let rows

const totalMines = 20

function setup() {
	createCanvas(201, 201)
	
	cols = floor(width / w)
	rows = floor(height / w)
	grid = make2DArray(cols, rows)
	
	for(let i = 0; i < cols; i++) {
		for(let j = 0; j < rows; j++) {
			grid[i][j] = new Cell(i, j, w)	
		}
	}

	// Pick mine spots
	let opts = []
	for(let i = 0; i < cols; i++) {
		for(let j = 0; j < rows; j++) {
			opts.push([i, j])
		}
	}

	for(let n = 0; n < totalMines; n++) {
		const index = floor(random(opts.length))
		const choice = opts[index]
		const i = choice[0]
		const j = choice[1]
		grid[i][j].mine = true
		opts.splice(index, 1)
	}
	
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j].countMines()
		}
	}
}

function draw() {
	background(255)
	for(let i = 0; i < cols; i++) {
		for(let j = 0; j < rows; j++) {
			grid[i][j].show()
		}
	}
}


function make2DArray(cols, rows) {
	var arr = new Array(cols)
	for(let i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows)
	}
	return arr
}

function mousePressed() {
	for(let i = 0; i < cols; i++) {
		for(let j = 0; j < rows; j++) {
			if(grid[i][j].contains(mouseX, mouseY)) {
				grid[i][j].reveal()
			}
		}
	}
}