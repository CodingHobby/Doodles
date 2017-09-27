const size = 10
let x = 1
let y = 1

function setup() {
	createCanvas(400, 400);
	background(0)
}

function draw() {
	fill(255)
	stroke(255)
	strokeWeight(2)
	if(random(1) > 0.5) {
		slash(x, y)
	} else {
		backSlash(x, y)
	}
	if (x > width) {
		x = 0
		y += size
	} else {
		x += size
	}
}

function backSlash(x, y) {
	line(x, y, x+size, y+size)
}

function slash(x, y) {
	line(x, y+size, x+size, y)
}