const firebase = require('firebase'),
	firebaseInit = require('./firebase-init'),
	material = require('./lib/material'),
	database = firebase.database()



const emailTxt = document.getElementById('email'),
	passwdTxt = document.getElementById('password'),
	loginBtn = document.getElementById('btn-login'),
	signupBtn = document.getElementById('btn-signup'),
	logoutBtn = document.getElementById('btn-logout'),
	word = document.getElementById('word'),
	addWordBtn = document.getElementById('add-word-btn')


firebase.auth().onAuthStateChanged(user => {
	if (user) {
		console.log('logged in')
		logoutBtn.addEventListener('click', function (e) {
			const auth = firebase.auth()
			auth.signOut()
				.catch(e => console.error(e))
		})

		document.getElementById('onceLoggedIn').classList.remove('hidden')
		document.getElementById('login').classList.add('hidden')
		let uid = user.uid
		let words = []


		database.ref(`/${uid}/words`).on('value', function (data) {
			if (data.val()) {
				let wordDbValue = data.val()
				let keys = Object.keys(wordDbValue)
				keys.forEach(k => {
					words[k] = (wordDbValue[k])
				})

				document.getElementById('words').innerHTML = ''
				words.forEach(word => {
					document.getElementById('words').innerHTML += `<li>${word}</li>`
				})
			} else {
				words = []
				document.getElementById('words').innerHTML = ''
			}
		})

		/* This is important, since otherwise we'd still have a listener which pushes data to the old user UID */
		recreateNode(document.querySelector('#add-word-btn'))

		addWordBtn.addEventListener('click', function (e) {
			e.preventDefault()
			console.log('click')
			const wordValue = word.value
			if (wordValue) {
				words.push(wordValue)
				word.value = ''
				firebase.database().ref(`/${uid}/words`).set(words)
			}
		})

	} else {
		loginBtn.addEventListener('click', function (e) {
			const email = emailTxt.value
			const passwd = passwdTxt.value
			const auth = firebase.auth()

			auth.signInWithEmailAndPassword(email, passwd)
				.catch(err => alert(err))
		})

		signupBtn.addEventListener('click', function (e) {
			const email = emailTxt.value
			const passwd = passwdTxt.value
			const auth = firebase.auth()

			auth.createUserWithEmailAndPassword(email, passwd)
				.catch(e => console.error(e))
		})

		document.getElementById('login').classList.remove('hidden')
		document.getElementById('onceLoggedIn').classList.add('hidden')
		console.log('logged out')
	}
})

function recreateNode(el) {
	var clone = el.cloneNode();
	while (el.firstChild) {
		clone.appendChild(el.lastChild);
	}
	el.parentNode.replaceChild(clone, el);
}
