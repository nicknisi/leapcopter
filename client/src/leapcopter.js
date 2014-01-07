/*globals Leap*/
(function () {
	var controller;

	function start() {
		controller = new Leap.Controller({
			enableGestures: true,
			frameType: 'deviceFrame'
		});
		controller.on('frame', processFrame);
		controller.on('connect', function () {
			console.log('Successfully connected to device');
		});

		controller.on('deviceConnected', function () {
			console.log('Successfully deviceConnected to device');
		});

		controller.on('deviceDisconnected', function () {
			console.log('Successfully disconnected to device');
		});

		controller.on('ready', function () {
			console.log('ready...');
		});

		controller.connect();
	}

	function processFrame(frame) {
		frame.gestures.forEach(function (gesture) {
			var type = gesture.type;
			switch (type) {
			case 'circle':
				console.log('circle');
				break;
			case 'swipe':
				console.log('swipe');
				break;
			case 'screenTap':
				console.log('screenTap');
				break;
			case 'keyTap':
				console.log('keyTap');
				break;
			}
		});
	}

	start();
})();
