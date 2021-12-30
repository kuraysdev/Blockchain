import { Block } from "./models/block";
import { Blockchain } from "./models/blockchain";
import { loadBlockchain, saveBlockchain } from "./helper/util";
import * as fs from 'fs';
import Logger, { registerLoggers } from "./helper/logger";
registerLoggers();
let blockchain = loadBlockchain()
const Kuracoin = new Blockchain(blockchain);

Kuracoin.addBlock(new Block(Date.now().toString(), { test: "lol" }))

console.log(Kuracoin.chain)
console.log(Kuracoin.isValid())


process.on('exit', async (code) => {
    Logger.main.error("Saving blockchain to file...");
    saveBlockchain(Kuracoin);
    Logger.main.fatal("Exiting...")
})