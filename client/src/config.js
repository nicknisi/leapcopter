/*exported dojoConfig*/
var dojoConfig = {
	isDebug: true,
	async: true,
	baseUrl: 'src/',
	packages: [
		{ name: 'dojo', location: 'bower_components/dojo' },
		{ name: 'dijit', location: 'bower_components/dijit' },
		{ name: 'put-selector', location: 'bower_components/put-selector' },
		'Leapcopter'
	]
};
