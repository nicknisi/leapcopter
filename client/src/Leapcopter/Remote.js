define([
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/_base/array',
	'dojo/Evented',
	'dojo/request',
	'./Leap'
], function (declare, lang, array, Evented, request, Leap) {
	return declare(Evented, {
		controller: null,
		enableGestures: true,

		constructor: function () {
			// init a new Leap controller
			this.controller = new Leap.Controller({
				enableGestures: this.enableGestures
			});
			this.controller.on('frame', lang.hitch(this, 'onFrame'));
		},

		start: function () {
			this.controller.connect();
		},

		stop: function () {},

		onFrame: function (frame) {
			this.emit('frame', frame);
			var action = null;
			array.forEach(frame.gestures, function (gesture) {
				var type = gesture.type;

				switch (type) {
				case 'circle':
					action = 'flip';
					break;
				case 'keyTap':
					action = 'toggle';
					break;
				}
			}, this);

			// only care about one hand...
			var hand = frame.hands[0];
			if (!action && hand) {
				var pitch = hand.pitch();
				if (pitch > 0.5) {
					action = 'backward';
				} else if (pitch < -0.1) {
					action = 'forward';
				}
			}
			this.emit('action', { type: action });
		}
	});
});
