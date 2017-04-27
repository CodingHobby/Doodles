let value = 0


let plus = $('#up').asEventStream('click').map(1)
let minus = $('#down').asEventStream('click').map(-1)

const valP = $('#val').html(value)

const streams = plus.merge(minus)
streams.onValue(val => {
	value += val
	valP.html(value)
})