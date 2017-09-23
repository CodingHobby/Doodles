import React, {Component} from 'react'
import firebase from 'firebase'
import '../assets/styles/components/Nav.css'
import Dialog from './Dialog'

export default class Nav extends Component {
	constructor(props) {
		super(props)
		this.state = {showLogin: false, showSignup: false}
	}

	render() {
		return (
			<div>
				<nav>
					<ul className="navbar">
						<li>
							{
								!this.props.user ? (
									<a
										href="#"
										style={{ display: this.state.showSignup || this.state.showLogin ? 'none' : 'inline' }}
										onClick={() => this.setState({ showLogin: true })}
										ref="sign-in"
									>
										Log in or Sign up
									</a>
								) : (
									<div>
										<p>
											{this.props.user.displayName || this.props.user.email.split('@')[0]} 
											&nbsp;<a onClick={() => firebase.auth().signOut().catch(e => alert(e.message))} href="#">Logout</a>
										</p>
									</div>
								)
							}
						</li>
					</ul>
				</nav>
				<Dialog 
					title="Sign Up" 
					visible={this.state.showSignup} 
					onClose={() => this.setState({showSignup: false})}
					position="top-left"
				>
					<form onSubmit={this.register.bind(this)}>
						<input type="text" ref="registerUsername" placeholder="Username" />
						<input type="email" ref="registerEmail" placeholder="Email" />
						<input type="password" ref="registerPassword" placeholder="Password"/>
						<input type="submit" className="btn btn-green" value="Sign Up" />
						<div className="note">
							<p>Already have an account?</p>
							<a href="#" onClick={() => this.setState({ showLogin: true, showSignup: false })}>Log in!</a>
						</div>
					</form>
				</Dialog>

				<Dialog 
					title="Log In" 
					visible={this.state.showLogin} 
					onClose={() => this.setState({showLogin: false})}
					position="top-left"
				>
					<form onSubmit={this.login.bind(this)}>
						<input type="email" ref="loginEmail" placeholder="Email" />
						<input type="password" ref="loginPassword" placeholder="Password" />
						<input type="submit" className="btn btn-blue" value="Login" />
						<div className="note">
							<p>Don't have an account?</p>
							<a href="#" onClick={() => this.setState({ showLogin: false, showSignup: true })}>Sign up!</a>
						</div>
					</form>
				</Dialog>
			</div>
		)
	}

	register(e) {
		e.preventDefault()
		console.log('Submit')
		let email = this.refs.registerEmail.value
		let password = this.refs.registerPassword.value
		let userName = this.refs.registerUsername.value
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(user => {
				user.updateProfile({displayName: userName})
				this.refs.registerEmail.value = ""
				this.refs.registerPassword.value = ""
				this.refs.registerUsername.value = ""
				this.setState({showSignup: false})
			})
			.catch(e => alert(e.message))
	}

	login(e) {
		e.preventDefault()
		let email = this.refs.loginEmail.value
		let password = this.refs.loginPassword.value

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => {
				this.refs.loginEmail.value = ""
				this.refs.loginPassword.value = ""
				this.setState({showLogin: false})
			})
			.catch(e => alert(e.message))
	}
}