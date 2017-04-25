const { Element, select } = require('mare-dom')

let timer = new Element('p').addClass('timer').render()
let audio = new Audio('./assets/alarm.wav')
const SET_MINUTES = 25,
	SET_SECONDS = 0

let timerInterval

function formatNumber(n, l) {
	var out = '' + n
	while (out.length < l) {
		out = '0' + out
	}
	return out
}

function formatTime(mins, secs) {
	return `${formatNumber(mins)} : ${formatNumber(secs)}`
}

let reset = new Element('button')
	.content('Start Timer')
	.on('click', function () {
		clearInterval(timerInterval)
		timer.content(formatTime(formatNumber(SET_MINUTES, 2), formatNumber(SET_SECONDS, 2)))
		let minutes = SET_MINUTES
		let seconds = SET_SECONDS
		time(minutes, seconds)
	})
	.render()

timer.content(formatTime(formatNumber(SET_MINUTES, 2), formatNumber(SET_SECONDS, 2)))


function time(mins, secs) {
	let minutes = mins
	let seconds = secs
	timerInterval = setInterval(function () {
		if (seconds > 0) {
			seconds -= 1
		} else if (seconds <= 0) {
			seconds = 59
			minutes -= 1
		}
		if (seconds <= 0 && minutes <= 0) {
			clearInterval(timerInterval)
			audio.play()
		}
		timer.content(formatTime(formatNumber(minutes, 2), formatNumber(seconds, 2)))
	}, 1000)
	return false
}