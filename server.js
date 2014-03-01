/*jshint node:true*/
var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	dronestream = require('dronestream').listen(server),
	io = require('socket.io').listen(3001),
	arDrone = require('ar-drone'),
	client = arDrone.createClient(),
	flight = false,
	speed = 0.7,
	busy = false;

app.use(express.static(__dirname + '/client'));

io.sockets.on('connection', function (socket) {
	console.log('\nNEW CONNECTION\n');
	socket.emit('status', {
		connected: true
	});

	socket.on('action', function (action) {
		function setBusy(isBusy) {
			busy = isBusy;
			socket.emit('status', { busy: busy });
		}

		function runAction(action, args) {
			setBusy(true);
			action.apply(client, args);
			client.after(1000, function () {
				setBusy(false);
			});
		}
		var type = action.type;
		if (type === 'toggle') {
			console.log('toggle');
			if (flight) {
				console.log('\tland');
				runAction(client.land);
				flight = false;
			} else {
				console.log('\ttakeoff');
				client.disableEmergency();
				runAction(client.takeoff);
				flight = true;
			}
		} else if (type === 'flip') {
			console.log('flip');
			// if (flight) {
			// 	runAction(client.animate, ['flipLeft', 15]);
			// }
		}

		console.log(action);
		client.left(speed * action.left);
		client.right(speed * action.right);
		client.front(speed * action.forward);
		client.back(speed * action.backward);

		if (!action.left && !action.right && !action.forward && !action.backward) {
			console.log('idle');
			client.stop();
		}
	});
});

server.listen(3000);
