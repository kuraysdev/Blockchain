import Logger from '../helper/logger';
import { SHA256 } from '../helper/util';
import { Block } from './block'
import { Transaction } from './transaction';


export class Blockchain {
    difficulty: number = 0;
    chain: Block[];

    reward: number = 1.4;

    transactionsWaiting: Transaction[];

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
        block.prev = this.getLastBlock().hash;
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

    minePendingTransactions(adress: string){
        let block = new Block(Date.now().toString(), this.transactionsWaiting);
        block.mineBlock(this.difficulty);
 
        Logger.blockchain.info('Block successfully mined!');
        this.chain.push(block);
 
        this.transactionsWaiting = [
            new Transaction(null, adress, this.reward)
        ];
    }


    getBalanceOfAddress(address: string){
        let balance = 0;
 
        for(const block of this.chain){
            for(const trans of block.data){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }
 
                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
 
        return balance;
    }
}