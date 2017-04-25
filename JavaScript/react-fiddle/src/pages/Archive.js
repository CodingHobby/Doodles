import React, { Component } from 'react';
import '../styles/App.css'

import Navbar from '../components/Navbar'

export default class Archive extends Component {
	render() {
		return (
			<div>
				<h1>Archive ({this.props.match.params.article})</h1>
			</div>
		)
	}
}