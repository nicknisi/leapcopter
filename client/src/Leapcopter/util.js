define([
	'exports'
], function (util) {
	util.debounce = function (fn, wait, immediate) {
		var timeout;
		return function () {
			var context = this, args = arguments,
				callNow = immediate && !timeout,
				later = function () {
					timeout = null;
					if (!immediate) {
						fn.apply(context, args);
					}
				};

			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) {
				fn.apply(context, args);
			}
		};
	};

	util.throttle = function (fn, threshold, scope) {
		threshold || (threshold = 250);
		var last, deferTimer;

		return function () {
			var context = scope || this;

			var now = +new Date(),
				args = arguments;
			if (last && now < last + threshold) {
				clearTimeout(deferTimer);
				deferTimer = setTimeout(function () {
					last = now;
					fn.apply(context, args);
				}, threshold);
			} else {
				last = now;
				fn.apply(context, args);
			}
		};
	};
});
