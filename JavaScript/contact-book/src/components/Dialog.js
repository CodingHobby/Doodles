import React, {Component} from 'react'

import '../assets/styles/components/Dialog.css'

export default class Dialog extends Component {
	constructor(props) {
		super(props)

		let style = {}

		if(this.props.position) {
			let upDownPos = this.props.position.split('-')[0]
			let rightLeftPos = this.props.position.split('-')[1]
			
			if(upDownPos === 'top') {
				style.top = '10px'
				style.bottom = undefined
			} 
			else {
				style.bottom = '10px'
				style.bottom = undefined
			}

			if(rightLeftPos === 'right') {
				style.right = '10px'
				style.left = undefined
			} 
			else {
				style.left = '10px'
				style.right = undefined
			}
		}

		this.state = {style} 
	}

	render() {
		return (
			<div
				className="signup dialog"
				style={Object.assign({display: this.props.visible ? 'block' : 'none'}, this.state.style)}
			>
				<p
					onClick={this.props.onClose} 
					className="close"
				>
					x
				</p>
				<h3>{this.props.title}</h3>
				{this.props.children}
			</div>
		)
	}
}