const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const transactionsRoute = require('./routes/transactions');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionsRoute);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.log('❌ DB Error:', err));
