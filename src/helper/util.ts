import * as crypto from "crypto";
import * as fs from "fs";
import { Blockchain } from "../models/blockchain";

export function SHA256(message: string) {
    return crypto.createHash("sha256").update(message).digest("hex");
}


export function loadBlockchain() {
    let file = fs.readFileSync("./blockchain");
    return file.toString()
}

export function saveBlockchain(blockchain: Blockchain) {
    fs.writeFileSync("./blockchain", JSON.stringify(blockchain.chain))
}