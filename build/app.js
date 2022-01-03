"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = require("./models/blockchain");
const util_1 = require("./helper/util");
const logger_1 = require("./helper/logger");
const crypto_1 = require("./helper/crypto");
(0, logger_1.registerLoggers)();
let blockchain = (0, util_1.loadBlockchain)();
const Kuracoin = new blockchain_1.Blockchain(blockchain);
console.log(Kuracoin.chain);
console.log(Kuracoin.isValid());
Kuracoin.minePendingTransactions('test');
console.log((0, crypto_1.generatePair)());
console.log(Kuracoin.chain);
Kuracoin.minePendingTransactions('test');
console.log(Kuracoin.chain);
Kuracoin.minePendingTransactions('test');
Kuracoin.getBalanceOfAddress('test');
process.on('exit', async (code) => {
    //Logger.main.error("Saving blockchain to file...");
    //saveBlockchain(Kuracoin);
    logger_1.default.main.fatal("Exiting...");
});
//# sourceMappingURL=app.js.map