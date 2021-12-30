"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const util_1 = require("../helper/util");
class Block {
    constructor(timestamp, data) {
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.getHash();
    }
    getHash() {
        return util_1.SHA256(this.prev + this.timestamp + JSON.stringify(this.data));
    }
}
exports.Block = Block;
//# sourceMappingURL=block.js.map