const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')

const PORT = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = socketIO(server)


const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

io.on('connection', socket => {
	console.log('new user connected', socket)
	socket.on('disconnect', () => {
		console.log('User was disconnected')
	})
})

server.listen(PORT, () => console.log(`Server is up on port ${PORT}.`))