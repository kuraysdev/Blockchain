import { Block } from "./models/block";
import { Blockchain } from "./models/blockchain";
import { loadBlockchain, saveBlockchain } from "./helper/util";
import * as fs from 'fs';
import Logger, { registerLoggers } from "./helper/logger";
import { generatePair } from "./helper/crypto";
registerLoggers();
let blockchain = loadBlockchain()
const Kuracoin = new Blockchain(blockchain);



console.log(Kuracoin.chain)
console.log(Kuracoin.isValid())
Kuracoin.minePendingTransactions('test');
console.log(generatePair())
console.log(Kuracoin.chain)
Kuracoin.minePendingTransactions('test');
console.log(Kuracoin.chain)
Kuracoin.minePendingTransactions('test');
Kuracoin.getBalanceOfAddress('test')

process.on('exit', async (code) => {
    //Logger.main.error("Saving blockchain to file...");
    //saveBlockchain(Kuracoin);
    Logger.main.fatal("Exiting...")
})