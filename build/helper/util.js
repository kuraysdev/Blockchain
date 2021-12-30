"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveBlockchain = exports.loadBlockchain = exports.SHA256 = void 0;
const crypto = require("crypto");
const fs = require("fs");
function SHA256(message) {
    return crypto.createHash("sha256").update(message).digest("hex");
}
exports.SHA256 = SHA256;
function loadBlockchain() {
    let file = fs.readFileSync("./blockchain");
    return file.toString();
}
exports.loadBlockchain = loadBlockchain;
function saveBlockchain(blockchain) {
    fs.writeFileSync("./blockchain", JSON.stringify(blockchain.chain));
}
exports.saveBlockchain = saveBlockchain;
//# sourceMappingURL=util.js.map