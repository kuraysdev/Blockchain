"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = require("./models/block");
const blockchain_1 = require("./models/blockchain");
const util_1 = require("./helper/util");
const logger_1 = require("./helper/logger");
logger_1.registerLoggers();
let blockchain = util_1.loadBlockchain();
const Kuracoin = new blockchain_1.Blockchain(blockchain);
Kuracoin.addBlock(new block_1.Block(Date.now().toString(), { test: "lol" }));
console.log(Kuracoin.chain);
console.log(Kuracoin.isValid());
process.on('exit', async (code) => {
    logger_1.default.main.error("Saving blockchain to file...");
    util_1.saveBlockchain(Kuracoin);
    logger_1.default.main.fatal("Exiting...");
});
//# sourceMappingURL=app.js.map