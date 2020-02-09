module.exports = {
	files: {
		javascripts: {
			joinTo: {
				'vendor.js': /^(?!app)/,
				'app.js': /^app/
			}
		},
		stylesheets: { joinTo: 'app.css' }
	},

	plugins: {
		babel: {
			presets: [ 'latest', 'react' ]
		},
		autoReload: { enabled: true }
	}
};
