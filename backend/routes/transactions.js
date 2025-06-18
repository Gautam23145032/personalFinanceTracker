const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST a new transaction
router.post('/', async (req, res) => {
  const { text, amount, createdAt } = req.body;

  try {
    const newTransaction = new Transaction({ text, amount, createdAt });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// DELETE a transaction
router.delete('/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(404).json({ error: 'Transaction not found' });
  }
});

module.exports = router;
