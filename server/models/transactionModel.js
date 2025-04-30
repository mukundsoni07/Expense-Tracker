import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a description']
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive or negative number']
    },
    isCredit: {
        type: Boolean,
        required: [true, 'Please add a transaction type']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
