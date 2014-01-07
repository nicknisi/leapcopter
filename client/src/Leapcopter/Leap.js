define([
	'src/bower_components/leapjs/leap'
], function () {
	/*globals Leap*/

	// because leap.js AMD checking appears to be broken...
	// load it and then return the global
	return Leap;
});
