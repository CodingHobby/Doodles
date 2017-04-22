const { app, BrowserWindow } = require('electron'),
	path = require('path'),
	url = require('url')

let win

function createWindow() {
	win = new BrowserWindow({ 
		width: 400, 
		height: 170,
		resizable: false,
		title: 'Pomodoro',
		frame: false,
		x: 10,
		y: 0
	})

	win.setAutoHideMenuBar(true)

	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}))

	win.on('closed', () => {
		win = null
	})
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
	if(process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('active', function() {
	if(!win) {
		createWindow()
	}
})