# 💰 Personal Finance Tracker

A full-stack Personal Finance Tracker app to help users track their **income, expenses**, and calculate net balance with **monthly/yearly filters**. Built using **Node.js, Express, MongoDB, and vanilla HTML/CSS/JS**.

---

## 📁 Folder Structure

```
personal-finance-tracker/
├── backend/
│   ├── models/
│   │   └── Transaction.js          # Mongoose schema for transactions
│   ├── routes/
│   │   └── transactions.js         # Express route handlers
│   ├── .env                        # Environment variables
│   ├── package.json                # Backend dependencies
│   └── server.js                   # Express app setup
├── frontend/
│   ├── index.html                  # Main HTML structure
│   ├── style.css                   # App styling
│   └── script.js                   # Frontend logic and API interaction
```

---

## 🌐 Live Demo

[click here](https://gautam23145032.github.io/FnanaceTracker/)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/personal-finance-tracker.git
cd personal-finance-tracker
```

### 2. Setup Backend

#### a. Navigate to backend folder

```bash
cd backend
```

#### b. Create `.env` file

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/finance
PORT=3000
```

#### c. Install dependencies

```bash
npm install
```

#### d. Start the server

```bash
node server.js
```

The backend server should now be running at `http://localhost:3000`.

### 3. Open Frontend

Navigate to the `frontend/` directory and open `index.html` in your browser. You can also use Live Server in VSCode for better experience.

---

## 📦 Backend Dependencies (`backend/package.json`)

```json
{
  "name": "finance-tracker-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "mongoose": "^7.6.1"
  }
}
```

---

## 🧠 Features

### ✅ Add Transaction
- Form with:
  - Description (`text`)
  - Amount (positive or negative)
  - Date
  - Type (`income` or `expense`)

### 🧾 View Transactions
- List of all transactions with:
  - Amount (colored + or -)
  - Date
  - Delete icon 🗑️

### 📊 Summary Calculation
- Total Balance
- Total Income
- Total Expense

### 📅 Filter by Date
- Filter by **year** and **month**
- Year options are **dynamically populated** from data

---

## 🧰 API Endpoints

Base URL: `/api/transactions`

- `GET /` → Fetch all transactions
- `POST /` → Add new transaction
- `DELETE /:id` → Delete a transaction by ID

---

## 💻 Example Mongoose Schema

```js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
```

---

## 🔧 Future Enhancements

- [ ] Add category-based filtering
- [ ] Chart.js pie chart & bar graph visualizations
- [ ] Export to CSV or PDF
- [ ] User authentication (JWT)
- [ ] Progressive Web App (PWA) support

---

## 📸 UI Preview (Optional)

You can add screenshots or a Loom video link here to showcase the UI.

---

## 🙋‍♂️ Author

Made with ❤️ by **Gautam Yadav**

---


