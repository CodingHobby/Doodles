class Cell {
	constructor(i, j, w) {
		this.mine = false
		this.revealed = false
		this.i = i
		this.j = j
		this.x = i * w
		this.y = j * w
		this.w = w
		this.neighborCount
	}

	show() {
		stroke(0)
		noFill()
		rect(this.x, this.y, this.w, this.w)
		if(this.revealed) {
			fill(200)
			stroke(0)
			if(this.mine) {
				ellipse(this.w * 0.5 + this.x, this.w * 0.5 + this.y, this.w * 0.5)
			} else {
				rect(this.x, this.y, this.w, this.w)
				textAlign(CENTER)
				fill(0)
				text(this.neighborCount || "", this.x + this.w * 0.5, this.y + this.w - 6)
			}
		}
	}

	contains(x, y) {
		return (
			x > this.x && x < this.x + this.w &&
			y > this.y && y < this.y + this.w
		)	
	}

	reveal() {
		if (this.neighborCount === 0) this.floodFill()
		this.revealed = true
	}

	countMines() {
		if(this.mine) this.neighborCount = -1
		let total = 0
		for(let xoff = -1; xoff <= 1; xoff++) {
			for(let yoff = -1; yoff <= 1; yoff++) {
				const i = this.i + xoff
				const j = this.j + yoff
				if( i < cols && j < rows && i > -1 && j > -1) {
					const neighbor = grid[i][j]
					total += neighbor.mine ? 1 : 0
				}
			}
		}
		this.neighborCount = total
	}

	floodFill() {
		for (let xoff = -1; xoff <= 1; xoff++) {
			for (let yoff = -1; yoff <= 1; yoff++) {
				const i = this.i + xoff
				const j = this.j + yoff
				if (i < cols && j < rows && i > -1 && j > -1) {
					const neighbor = grid[i][j]
					if (!neighbor.mine && !neighbor.revealed) neighbor.reveal()
				}
			}
		}
	}
}