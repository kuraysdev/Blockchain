import * as log4js from 'log4js';
import { bold } from 'colorette';

const Logger = {
	preinit: log4js.getLogger('PreInit'),
	control: log4js.getLogger('Control'),
	main: log4js.getLogger('Main'),
	
	peer: log4js.getLogger('Peer'),
	blockchain: log4js.getLogger('Blockchain'),
	gateway: log4js.getLogger('Gateway')
};

export function registerLoggers(): void {
	log4js.configure({
		appenders: {
			console: {
				type: 'console',
				layout: {
					type: 'pattern',
					pattern: `%[[%d{hh:mm:ss}] [%p/${bold('%c')}]%]: %m`
				}
			}
		},
		categories: {
			default: {
				appenders: [
					'console'
				],
				level: 'all'
			}
		}
	});
}

export default Logger;