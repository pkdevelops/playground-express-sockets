var socket = io()

socket.on('connect', function () {
	console.log('Connected to server')
	socket.emit('createMessage', {
		from: 'Andrew',
		text: 'hey this is andrew'
	})
})

socket.on('disconnect', function () {
	console.log('Disconnected from server')
})

socket.on('newMessage', function (message) {
	console.log('New Message', message)
})