/* Magic Mirror
 * Module: MMM-qBittorrent
 *
 * By Mathieu Gery, https://github.com/MathieuGery/MMM-qBittorrent
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
const qbApi = require('qbittorrent-api-v2')

module.exports = NodeHelper.create({
	start: function () {
		//console.log('Starting node_helper for: ' + this.name);
	},

	callQb: function (payload) {
		return qbApi.connect(payload.qbUrl, payload.username, payload.password)
			.then(qbt => {
				return qbt.transferInfo()
					.then(torrents => {
						return torrents
					})
					.catch(err => {
						console.error(err)
					})
			})
			.catch(err => {
				console.error(err)
			})
	},

	getStats: function (payload) {
		let identifier = payload.identifier;
		let promises = [];

		promises.push(this.callQb(payload));
		Promise.all(promises).then((contents) => {
			let res = contents[0];
			let stats = {
				ratio: 10,
				downloadSpeed: res.dl_info_speed,
				uploadSpeed: res.up_info_speed,
				leftSpace: 50
			};
			this.sendSocketNotification('STATS_RESULT', { identifier: identifier, stats: stats });
		}).catch(err => {
			console.error(this.name + ' error when fetching data: ' + err);
		});
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === 'GET_STATS') {
			this.getStats(payload);
		}
	}
});
