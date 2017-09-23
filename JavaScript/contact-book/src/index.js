import React from 'react'
import ReactDOM from 'react-dom'
import './assets/styles/index.css'
import App from './components/App'
import firebase from 'firebase'
import registerServiceWorker from './registerServiceWorker'


	// Initialize Firebase
	const config = {
		apiKey: "AIzaSyAnAOQbRD1ynma02L4Ex0FAy4DxgtFZLAY",
	authDomain: "address-book-5abd0.firebaseapp.com",
	databaseURL: "https://address-book-5abd0.firebaseio.com",
	projectId: "address-book-5abd0",
	storageBucket: "address-book-5abd0.appspot.com",
	messagingSenderId: "1011262386792"
}
firebase.initializeApp(config)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
