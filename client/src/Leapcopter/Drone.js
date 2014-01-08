define([
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/topic'
], function (declare, lang, topic) {
	/*globals io*/
	return declare(null, {
		_connected: false,
		busy: false,
		active: true,
		isFyling: false,
		emergency: false,
		remote: null,
		socket: null,
		url: 'ws://localhost:3001',

		constructor: function () {
			topic.subscribe('remote/action', lang.hitch(this, 'sendAction'));

			this.socket = io.connect(this.url);
			this.socket.on('status', lang.hitch(this, 'updateStatus'));
		},

		updateStatus: function (status) {
			if (status.connected) {
				this._connected = true;
			}
			if (typeof status.busy !== 'undefined') {
				console.log('setting busy to ' + status.busy);
				this.busy = status.busy;
			}
		},

		sendAction: function (action) {
			if (!this._connected || this.busy) { return; }
			var type = action.type;
			if (type === 'toggle') {
				this.isFlying = !this.isFlying;
			}

			console.log('emitting ', type);
			if (this.active) {
				this.socket.emit('action', action);
			}
		}
	});
});
