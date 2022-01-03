"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockchain = void 0;
const logger_1 = require("../helper/logger");
const util_1 = require("../helper/util");
const block_1 = require("./block");
const transaction_1 = require("./transaction");
class Blockchain {
    constructor(chains) {
        this.difficulty = 0;
        this.reward = 1.4;
        if (chains == "") {
            this.chain = [new block_1.Block(Date.now().toString(), null)];
            logger_1.default.blockchain.warn('Created new Blockchain');
        }
        else {
            this.chain = JSON.parse(chains);
            logger_1.default.blockchain.warn('Loaded Blockchain from file');
        }
        logger_1.default.blockchain.trace('Blocks in blockchain: ' + this.chain.length);
    }
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(block) {
        block.prev = this.getLastBlock().hash;
        block.hash = block.getHash();
        logger_1.default.blockchain.trace(`Added block ${block.hash}`);
        this.chain.push(block);
    }
    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const current = this.chain[i];
            const prev = this.chain[i - 1];
            if (current.hash !== (0, util_1.SHA256)(current.prev + current.timestamp + JSON.stringify(current.data)) || prev.hash !== current.prev) {
                return false;
            }
        }
        return true;
    }
    minePendingTransactions(adress) {
        let block = new block_1.Block(Date.now().toString(), this.transactionsWaiting);
        block.mineBlock(this.difficulty);
        logger_1.default.blockchain.info('Block successfully mined!');
        this.chain.push(block);
        this.transactionsWaiting = [
            new transaction_1.Transaction(null, adress, this.reward)
        ];
    }
    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.data) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }
}
exports.Blockchain = Blockchain;
//# sourceMappingURL=blockchain.js.map