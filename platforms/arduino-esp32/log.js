module.exports = {
	info: 1,
	error: 2,
	debug: 4,
	log_flag: 0,
	i: function(str) {
		if ((this.log_flag & this.info) != 0) {
			_log(str, 'info');
		}
	},
	e: function(str) {
		if ((this.log_flag & this.error) != 0) {
			_log(str, 'error');
		}
	},
	d: function(str) {
		if ((this.log_flag & this.debug) != 0) {
			_log(str, 'debug');
		}
	}
};

function _log(str, tag) {
	console.log(tag + '\t' + str);
}