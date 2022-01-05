import Logger from "../helper/logger";
import { SHA256 } from "../helper/util";

export class Block {
    timestamp: string;
    data: any;
    hash: string;
    prev: string;
    nonce: number = 0;


    constructor(timestamp: string, data: any) {
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.getHash();
    }
    
    getHash() {
        return SHA256(this.prev + this.timestamp + JSON.stringify(this.data) + this.nonce);
    } 

    mineBlock(difficulty: number) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.getHash();
        }
 
        Logger.blockchain.info("BLOCK MINED: " + this.hash);
    }
}