/*jshint node:true*/
var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	dronestream = require('dronestream').listen(server),
	io = require('socket.io').listen(3001),
	arDrone = require('ar-drone'),
	client = arDrone.createClient(),
	flight = false,
	speed = 0.04;

app.use(express.static(__dirname + '/client'));

io.sockets.on('connection', function (socket) {
	console.log('\nNEW CONNECTION\n');
	socket.emit('status', {
		connected: true
	});
	socket.on('action', function (command) {
		console.log('\nACTION\n', command.type);
		var type = command.type;

		switch (type) {
		case 'toggle':
			console.log('toggle');
			if (flight) {
				socket.emit('status', { busy: true });
				client.land();
				client.after(1000, function () {
					socket.emit('status', { busy: false });
				});
				flight = false;
			} else {
				socket.emit('status', { busy: true });
				client.disableEmergency();
				client.takeoff();
				client.after(1000, function () {
					socket.emit('status', { busy: false });
				});
				flight = true;
			}
			break;
		case 'flip':
			console.log('flip');
			if (flight) {
				socket.emit('status', { busy: true });
				client.animate('flipLeft', 15);
				client.after(1000, function () {
					socket.emit('status', { busy: false });
				});
			}
			break;
		case 'forward':
			console.log('forward');
			if (flight) {
				client.front(speed);
			}
			break;
		case 'backward':
			console.log('backward');
			if (flight) {
				client.back(speed);
			}
			break;
		case null:
		case 'idle':
			console.log('idle');
			client.stop();
		}
	});
});

server.listen(3000);
