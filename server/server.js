const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')

const { generateMessage } = require('./utils/message')
const PORT = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = socketIO(server)


const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

io.on('connection', socket => {
	console.log('New user connected')
	
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'))

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user joined.'))


	socket.on('createMessage', (message) => {
		// console.log('createMessage', message)
		io.emit('newMessage', generateMessage(message.from, message.text))
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// })
	})

	socket.on('createEmail', (newEmail) => {
		console.log('createEmail', newEmail)
	})

	socket.on('disconnect', () => {
		console.log('User was disconnected')
	})
})

server.listen(PORT, () => console.log(`Server is up on port ${PORT}.`))