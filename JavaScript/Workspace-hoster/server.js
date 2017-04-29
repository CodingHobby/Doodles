#!/usr/bin/env node
const express = require('express'),
	port = process.env.PORT || 3000,
	app = express(),
	serveIndex = require('serve-index'),
	morgan = require('morgan')

app.use(morgan('dev'))

app.use('/', express.static(__dirname))

app.use('/', serveIndex(__dirname))


const server = app.listen(port, () => console.log(`App listening on \n http://127.0.0.1:${port}`))
