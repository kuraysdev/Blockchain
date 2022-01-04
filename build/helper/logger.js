"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerLoggers = void 0;
const log4js = require("log4js");
const colorette_1 = require("colorette");
const Logger = {
    preinit: log4js.getLogger('PreInit'),
    control: log4js.getLogger('Control'),
    main: log4js.getLogger('Main'),
    peer: log4js.getLogger('Peer'),
    blockchain: log4js.getLogger('Blockchain'),
    gateway: log4js.getLogger('Gateway')
};
function registerLoggers() {
    log4js.configure({
        appenders: {
            console: {
                type: 'console',
                layout: {
                    type: 'pattern',
                    pattern: `%[[%d{hh:mm:ss}] [%p/${(0, colorette_1.bold)('%c')}]%]: %m`
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
exports.registerLoggers = registerLoggers;
exports.default = Logger;
//# sourceMappingURL=logger.js.map