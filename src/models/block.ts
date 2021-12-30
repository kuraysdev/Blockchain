import { SHA256 } from "../helper/util";

export class Block {
    timestamp: string;
    data: any;
    hash: string;
    prev: string;


    constructor(timestamp: string, data: any) {
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.getHash();
    }
    
    getHash() {
        return SHA256(this.prev + this.timestamp + JSON.stringify(this.data));
    } 
}