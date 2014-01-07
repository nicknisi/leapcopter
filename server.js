/*jshint node:true*/
var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	dronestream = require('dronestream').listen(server),
	io = require('socket.io').listen(8081),
	arDrone = require('ar-drone'),
	client = arDrone.createClient(),
	flight = false;

app.use(express.static(__dirname + '/client'));

io.sockets.on('connection', function (socket) {
	console.log('\nNEW CONNECTION\n');
	socket.on('action', function (command) {
		console.log('\nACTION\n', command.type);
		var type = command.type;

		switch (type) {
		case 'toggle':
			console.log('toggle');
			if (flight) {
				client.land();
				flight = false;
			} else {
				client.takeoff();
				flight = true;
			}
			break;
		case 'flip':
			console.log('flup');
			if (flight) {
				client.animate('flipLeft', 15);
			}
			break;
		case 'forward':
			console.log('forward');
			if (flight) {
				client.front(0.01);
			}
			break;
		case 'backward':
			console.log('backward');
			if (flight) {
				client.back(0.01);
			}
			break;
		case null:
		case 'idle':
			console.log('idle');
			client.stop();
		}
	});
});

server.listen(8080);
