/* Magic Mirror
 * Module: MMM-qBittorrent
 *
 * By Mathieu Gery, https://github.com/MathieuGery/MMM-qBittorrent
 * MIT Licensed.
 */


Module.register('MMM-qBittorrent', {
	defaults: {
		showUploadSpeed: true,
		showDownloadSpeed: true,
		showRatio: true,
		showLeftSpace: true,
		username: "username",
		password: "password",
		qbUrl: "http://localhost",
		fetchInterval: 10 * 60 * 1000 //fetch interval default every minutes
	},

	getStyles: function () {
		return ['modules/MMM-qBittorrent/MMM-qBittorrent.css', 'font-awesome.css'];
	},

	getTranslations: function () {
		return {
			en: 'translations/en.json',
			sv: 'translations/fr.json'
		}
	},

	getDom: function () {
		let wrapper = document.createElement('table');

		if (null == this.stats) {
			wrapper.innerHTML = this.translate('LOADING');
			wrapper.className = 'loading dimmed xsmall';
			return wrapper;
		}
		wrapper.className = 'bright xsmall';

		let headerRow = document.createElement('tr');
		headerRow.className = 'normal header-row';
		this.createTableCell(headerRow, this.translate('RATIO'), this.config.showRatio, 'ratio-header', 'center');
		this.createTableCell(headerRow, this.translate('DOWNLOAD_SPEED'), this.config.showDownloadSpeed, 'download-speed-header', 'center');
		this.createTableCell(headerRow, this.translate('UPLOAD_SPEED'), this.config.showUploadSpeed, 'upload-speed-header', 'center');
		this.createTableCell(headerRow, this.translate('LEFT_SPACE'), this.config.showLeftSpace, 'left-space-header', 'center');

		wrapper.appendChild(headerRow);

		for (let i = 0; i < 1; ++i) {
			let row = document.createElement('tr');
			row.className = 'normal bright stats-row';

			const stat = this.stats;
			this.createNumberTableCell(row, stat.ratio, this.config.showRatio, 'ratio');
			this.createTableCell(row, stat.downloadSpeed, this.config.showDownloadSpeed, 'downloadSpeed');
			this.createNumberTableCell(row, stat.uploadSpeed, this.config.showUploadSpeed, 'uploadSpeed');
			this.createNumberTableCell(row, stat.leftSpace, this.config.showLeftSpace, 'uploadSpeed');
			wrapper.appendChild(row);
		}
		return wrapper
	},

	createNumberTableCell: function (row, number, show, className) {
		if (!show)
			return;

		const text = new Intl.NumberFormat().format(number);
		this.createTableCell(row, text, show, className);
	},
	// Creates a table row cell.
	// @param row - The table row to add cell to.
	// @param text - The text to show.
	// @param show - Whether to actually show.
	// @param align - Text align: 'left', 'center' or 'right'.
	createTableCell: function (row, text, show, className, align = 'right') {
		if (!show)
			return;

		let cell = document.createElement('td');
		cell.innerHTML = text;
		cell.className = className;

		cell.style.cssText = 'text-align: ' + align + ';';

		row.appendChild(cell);
	},

	start: function () {
		this.stats = null;

		// Tell node_helper to load stats at startup.
		this.sendSocketNotification('GET_STATS', {
			identifier: this.identifier,
			username: this.config.username,
			password: this.config.password,
			qbUrl: this.config.qbUrl
		});
		let interval = Math.max(this.config.fetchInterval, 1000);
		let self = this;
		setInterval(function () {
			self.sendSocketNotification('GET_STATS', {
				identifier: this.identifier,
				apiToken: this.config.apiToken,
				qbUrl: this.config.qbUrl
			});
		}, interval); // In millisecs.
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === 'STATS_RESULT') {
			console.error(this.name + ' error when fetching data: ' + "la bite");
			this.stats = payload.stats;
			this.updateDom(0);
		}
	},
	notificationReceived: function () { },
})