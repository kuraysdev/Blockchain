"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockchain = void 0;
const logger_1 = require("../helper/logger");
const util_1 = require("../helper/util");
const block_1 = require("./block");
class Blockchain {
    constructor(chains) {
        this.difficulty = 1;
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
        // Так как мы добавляем новый блок, prev будет хешем предыдущего последнего блока
        block.prev = this.getLastBlock().hash;
        // Так как теперь в prev имеется значение, нужно пересчитать хеш блока
        block.hash = block.getHash();
        logger_1.default.blockchain.trace(`Added block ${block.hash}`);
        this.chain.push(block);
    }
    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const current = this.chain[i];
            const prev = this.chain[i - 1];
            if (current.hash !== util_1.SHA256(current.prev + current.timestamp + JSON.stringify(current.data)) || prev.hash !== current.prev) {
                return false;
            }
        }
        return true;
    }
}
exports.Blockchain = Blockchain;
//# sourceMappingURL=blockchain.js.map