let video = document.getElementById('video')

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
		video.src = window.URL.createObjectURL(stream);
		video.play();
	})
	/* Legacy stuff, not important! */
} else if (navigator.getUserMedia) { // Standard
	navigator.getUserMedia({ video: true }, function (stream) {
		video.src = stream;
		video.play();
	}, errBack);
} else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
	navigator.webkitGetUserMedia({ video: true }, function (stream) {
		video.src = window.webkitURL.createObjectURL(stream);
		video.play();
	}, errBack);
} else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
	navigator.mozGetUserMedia({ video: true }, function (stream) {
		video.src = window.URL.createObjectURL(stream);
		video.play();
	}, errBack);
}