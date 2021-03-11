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
    fetchInterval: 1 * 60 * 1000 //fetch interval default every minutes
  },

  getStyles: function() {
		return [ 'modules/MMM-qBittorrent/MMM-qBittorrent.css', 'font-awesome.css'];
	},

  getTranslations: function () {
		return {
			en: 'translations/en.json',
			sv: 'translations/fr.json'
		}
	},

  getDom: function() {
    let wrapper = document.createElement('table');

    wrapper.className = 'bright xsmall';

    let headerRow = document.createElement('tr');
		headerRow.className = 'normal header-row';
		this.createTableCell(headerRow, this.translate('RATIO'), this.config.showRatio, 'ratio-header', 'center');
		this.createTableCell(headerRow, this.translate('DOWNLOAD_SPEED'), this.config.showDownloadSpeed, 'download-speed-header', 'center');
		this.createTableCell(headerRow, this.translate('UPLOAD_SPEED'), this.config.showUploadSpeed, 'upload-speed-header', 'center');
		this.createTableCell(headerRow, this.translate('LEFT_SPACE'), this.config.showLeftSpace, 'left-space-header', 'center');

    wrapper.appendChild(headerRow);
    return wrapper
  },

  // Creates a table row cell.
	// @param row - The table row to add cell to.
	// @param text - The text to show.
	// @param show - Whether to actually show.
	// @param align - Text align: 'left', 'center' or 'right'.
	createTableCell: function(row, text, show, className, align = 'right')
	{
		if (!show)
			return;

		let cell = document.createElement('td');
		cell.innerHTML = text;
		cell.className = className;

		cell.style.cssText = 'text-align: ' + align + ';';

		row.appendChild(cell);
	},

  start: function () {},
  notificationReceived: function() {},
  socketNotificationReceived: function() {},
})