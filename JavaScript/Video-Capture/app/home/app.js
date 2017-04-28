const { Element } = require('mare-dom')

let video = new Element('video')
	.attr('width', 600)
	.attr('height', 600)
	.attr('autoplay', true)

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
		video.attr('src', window.URL.createObjectURL(stream));
		video.toNode().play();
	})
}