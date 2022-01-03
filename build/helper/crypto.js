"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySignature = exports.sign = exports.generatePair = void 0;
const elliptic = require("elliptic");
const ec = new elliptic.ec("secp256k1");
function generatePair() {
    let pair = ec.genKeyPair();
    return {
        publicKey: pair.getPublic("hex"),
        privateKey: pair.getPrivate("hex")
    };
}
exports.generatePair = generatePair;
function sign(message, privateKey) {
    try {
        let pair = ec.keyFromPrivate(privateKey, "hex");
        return pair.sign(message).toDER("hex");
    }
    catch (error) {
        return "invalid signature";
    }
}
exports.sign = sign;
function verifySignature(message, signature, publicKey) {
    try {
        let pair = ec.keyFromPublic(publicKey, "hex");
        return ec.verify(message, signature, pair);
    }
    catch (error) {
        return false;
    }
}
exports.verifySignature = verifySignature;
//# sourceMappingURL=crypto.js.map