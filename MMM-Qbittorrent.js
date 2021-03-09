/* Magic Mirror
 * Module: MMM-qBittorrent
 *
 * By Mathieu Gery, https://github.com/MathieuGery/MMM-qBittorrent
 * MIT Licensed.
 */


Module.register('MMM-qBittorrent', {
  defaults: {
    uploadSpeed: 0,
    downloadSpeed: 0,
    ratio: 0
  },

  getStyles: function() {
		return [ 'modules/MMM-qBittorrent/MMM-qBittorrent.css', 'font-awesome.css'];
	},

  getTranslations: function () {
		return {
			en: 'translations/en.json',
			sv: 'translations/sv.json'
		}
	},

  getDom: function() {
    let wrapper = document.createElement('table');

    wrapper.className = 'bright xsmall';

    let headerRow = document.createElement('tr');
		headerRow.className = 'normal header-row';
		this.createTableCell(headerRow, this.translate('RATIO'), true, 'ratio-header', 'center');
		this.createTableCell(headerRow, this.translate('DOWNLOAD_SPEED'), true, 'download-speed-header', 'center');
		this.createTableCell(headerRow, this.translate('UPLOAD_SPEED'), true, 'upload-speed-header', 'center');

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