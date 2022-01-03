export class Transaction {
    sender: string;
    receiver: string;
    amount: Number;

    constructor(sender: string, receiver: string, amount: Number) {
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
    }
}