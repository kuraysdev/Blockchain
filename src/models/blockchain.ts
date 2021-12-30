import Logger from '../helper/logger';
import { SHA256 } from '../helper/util';
import { Block } from './block'


export class Blockchain {
    difficulty: Number = 1;
    chain: Block[];

    constructor(chains: string) {
        if(chains == "") {
            this.chain = [new Block(Date.now().toString(), null)];
            Logger.blockchain.warn('Created new Blockchain');
        } else {
            this.chain = JSON.parse(chains);
            Logger.blockchain.warn('Loaded Blockchain from file');
        }
        
        Logger.blockchain.trace('Blocks in blockchain: '+this.chain.length);
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(block: Block) {
        // Так как мы добавляем новый блок, prev будет хешем предыдущего последнего блока
        block.prev = this.getLastBlock().hash;
        // Так как теперь в prev имеется значение, нужно пересчитать хеш блока
        block.hash = block.getHash();
        Logger.blockchain.trace(`Added block ${block.hash}`);
        this.chain.push(block);

    }

    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const current = this.chain[i];
            const prev = this.chain[i-1];

            if (current.hash !== SHA256(current.prev + current.timestamp + JSON.stringify(current.data)) || prev.hash !== current.prev) {
                return false;
            }
        }

        return true;
    }
}