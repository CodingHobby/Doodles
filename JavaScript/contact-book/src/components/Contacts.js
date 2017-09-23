import React, {Component} from 'react'

export default class Contacts extends Component {
	constructor(props) {
		super(props)

		this.state = {
			ref: `/${this.props.user.uid}/contacts`
		}
	}

	componentDidMount() {
		firebase.database()
			.ref(this.state.ref)
			.on('value', snap => {
				snapshot = snap.val()
				if(snapshot) {
					this.setState({contacts: snapshot})
				} else {
					this.setState({contacts: []})
				}
			})
	}
	
	render() {
		return(
			<div className="contacts">
				{this.renderContacts()}
			</div>
		)
	}

	renderContacts() {
		this.state.contacts.forEach(contact => (
			<div className="contact">
				{contact.name} | {contact.number}
			</div>
		))
	}
}