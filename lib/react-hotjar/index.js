const hotjarLib = require('./src/react-hotjar');

const hj = (...params) => {
	if (!window.hj) {
		throw new Error('Hotjar is not initialized');
	}
	window.hj(...params);
};

const hotjar = {
	initialize(id, sv) {
		hotjarLib(id, sv);
	},
	initialized() {
		return typeof window !== 'undefined' && typeof window.hj === 'function';
	},
	identify(userId, properties) {
		hj('identify', userId, properties);
	},
	event(event) {
		hj('event', event);
	},
	stateChange(relativePath) {
		hj('stateChange', relativePath);
	},
};

module.exports = hotjar