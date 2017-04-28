const { Element } = require('mare-dom')

let video = new Element('video')
	.attr('width', 600)
	.attr('height', 600)
	.attr('autoplay', true)

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	// Not adding `{ audio: true }` since we only want video now
	navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
		video.src = window.URL.createObjectURL(stream);
		video.play();
	})
}