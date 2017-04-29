const firebase = require('firebase')
const tokens = require('./tokens')
const config = {
	apiKey: tokens.apiKey,
	authDomain: "auth-demo-6a022.firebaseapp.com",
	databaseURL: "https://auth-demo-6a022.firebaseio.com",
	projectId: "auth-demo-6a022",
	storageBucket: "auth-demo-6a022.appspot.com",
	messagingSenderId: "1052661701733"
};
firebase.initializeApp(config);