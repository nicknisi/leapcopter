define([
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dijit/_WidgetBase',
	'./util',
	'put-selector/put',
	'dojo/topic'
], function (declare, lang, _WidgetBase, util, put, topic) {
	/*globals io*/
	return declare(_WidgetBase, {
		active: true,
		isFyling: false,
		_flown: false,
		emergency: false,
		remote: null,
		socket: null,
		url: 'ws://localhost:8081',
		image: null,
		width: 800,
		height: 600,
		prevAction: null,

		buildRendering: function () {
			this.inherited(arguments);
			this.image = put(this.domNode, 'img', {
				// src: 'http://leapcopter.dev:8000',
				height: this.height,
				width: this.width
			});
		},

		postCreate: function () {
			this.inherited(arguments);
			topic.subscribe('remote/action', lang.hitch(this, 'update'));

			try {
				this.socket = io.connect(this.url);
			} catch (e) {/*noop*/}
		},

		update: function (action) {
			var type = action.type;
			if (this.prevAction !== type) {
				if (type === 'toggle') {
					if (this._flown && !this.isFlying) {
						return;
					}
					this._flown = true;
					this.isFlying = !this.isFlying;
				}

				console.log('emitting ', type);
				if (this.active) {
					this.socket.emit('action', { type: type });
				}
			}
			this.prevAction = type;
		}
	});
});
