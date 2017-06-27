const firebase = require('firebase')
module.exports = function() {
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyAg2h57mn7VyUsG-Rb0Q9CBjCUIR5oQ7m0",
		authDomain: "hapidemo-3b9da.firebaseapp.com",
		databaseURL: "https://hapidemo-3b9da.firebaseio.com",
		projectId: "hapidemo-3b9da",
		storageBucket: "hapidemo-3b9da.appspot.com",
		messagingSenderId: "295421344046"
	}
	firebase.initializeApp(config)
}