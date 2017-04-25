import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import '../styles/Nav.css'

export default class Navbar extends Component{
	render() {
		return(
			<nav className="nav">
				<ul className="nav-ul">
					<li><Link to="/">Home</Link></li>
					<li><Link to="/archive">Archive</Link></li>
					<li><Link to="/settings">Settings</Link></li>
					<li><Link to="/featured">Featured</Link></li>
				</ul>
			</nav>
		)
	}
}