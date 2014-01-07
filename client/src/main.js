(function () {
	/*globals io,Leap*/

	var socket = io.connect('ws://leapcopter.dev:4000'),
		controller = new Leap.Controller({ enableGestures: true });

	controller.on('frame', function (frame) {
		frame.gestures.forEach(function (gesture) {
			var type = gesture.type;

			switch (type) {
			case 'keyTap':
				console.log('takeoff');
				socket.emit('command', {
					type: 'takeoff'
				});
				break;
			case 'screenTap':
				console.log('land');
				socket.emit('command', {
					type: 'land'
				});
				break;
			case 'circle':
				console.log('circle');
				socket.emit('command', {
					type: 'circle'
				});
				break;
			}
		});
	});

	controller.connect();
})();
