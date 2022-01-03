"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const logger_1 = require("../helper/logger");
const util_1 = require("../helper/util");
class Block {
    constructor(timestamp, data) {
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.getHash();
    }
    getHash() {
        return (0, util_1.SHA256)(this.prev + this.timestamp + JSON.stringify(this.data));
    }
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.getHash();
        }
        logger_1.default.blockchain.info("BLOCK MINED: " + this.hash);
    }
}
exports.Block = Block;
//# sourceMappingURL=block.js.map