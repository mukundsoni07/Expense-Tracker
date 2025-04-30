import Transaction from '../models/transactionModel.js';

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1 });
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const addTransaction = async (req, res) => {
    try {
        let { text, amount, isCredit } = req.body;

        if (isCredit === false) {
            amount = -Math.abs(amount);

        }

        const transaction = await Transaction.create({
            text,
            amount,
            isCredit
        });

        res.status(201).json(transaction);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByIdAndDelete(id);

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.status(200).json(transaction);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}