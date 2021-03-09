/* Magic Mirror
 * Module: MMM-qBittorrent
 *
 * By Mathieu Gery, https://github.com/MathieuGery/MMM-qBittorrent
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');

module.exports = NodeHelper.create({
	start: function() {
		//console.log('Starting node_helper for: ' + this.name);
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === 'GET_STATS') {
			this.getStats(payload);
		}
	}

});
