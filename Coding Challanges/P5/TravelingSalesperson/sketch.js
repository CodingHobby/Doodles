let vals = [0, 1, 2]

function setup() {
}

function draw() {
	console.log(vals)

	let largestI = -1;
	for(var i = 0; i < vals.length - 1; i++) {
		if(vals[i] < vals[i + 1]) largestI = i
	}

	if(largestI === -1) {
		noLoop()
		console.log('Finished!')
	}

	let largestJ = -1
	for(var j = 0; j < vals.length; j++) {
		if(vals[j] < vals[largestI]) largestJ = j
	}

	swap(vals, largestI, largestJ)
	let endArray = vals
		.splice(largestI + 1)
		.reverse()
	vals.push(...endArray)
}

function swap(arr, i, j) {
	const temp = arr[i]
	arr[i] = arr[j]
	arr[j] = temp
}