import _ from 'underscore'
import $ from 'jquery'
import Backbone from 'backbone'

class WebsiteModel extends Backbone.Model {
	defaults = {
		name: 'An unknown website'
	}

	constructor(opts) {
		super(opts)
	}

	initialize() {
	}
}

$(document).ready(function () {
	const page = new WebsiteModel()
	console.log(page.get("name"))
	page.set({ name: 'A cool website' })
	console.log(page.get("name"))
})