const list = document.getElementById('list');
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const date = document.getElementById('date');
const type = document.getElementById('type');

const filterYear = document.getElementById('filter-year');
const filterMonth = document.getElementById('filter-month');

const API_URL = 'https://personalfinancetracker-p7pk.onrender.com/api/transactions';

let allTransactions = [];

async function getTransactions() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    allTransactions = data;
    populateYearOptions(allTransactions);
    applyFilters();
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

function updateUI(transactions) {
  list.innerHTML = '';

  const amounts = transactions.map(tx => tx.amount);
  const total = amounts.reduce((acc, num) => acc + num, 0).toFixed(2);
  const inc = amounts.filter(x => x > 0).reduce((acc, x) => acc + x, 0).toFixed(2);
  const exp = (amounts.filter(x => x < 0).reduce((acc, x) => acc + x, 0) * -1).toFixed(2);

  balance.innerText = `₹${total}`;
  income.innerText = `₹${inc}`;
  expense.innerText = `₹${exp}`;

  transactions.forEach(tx => addTransaction(tx));
}

function addTransaction(tx) {
  const sign = tx.amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  item.classList.add(tx.amount < 0 ? 'minus' : 'plus');
  const dateObj = new Date(tx.createdAt);
  const formattedDate = dateObj.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  item.innerHTML = `
    ${tx.text} <span>${sign}₹${Math.abs(tx.amount)}</span>
    <br><small>${formattedDate}</small>
    <button onclick="deleteTransaction('${tx._id}')">🗑️</button>
  `;

  list.appendChild(item);
}

async function addTransactionHandler(e) {
  e.preventDefault();

  let amt = +amount.value;
  if (type.value === 'expense') {
    amt *= -1;
  }

  const newTx = {
    text: text.value,
    amount: amt,
    createdAt: date.value ? new Date(date.value) : new Date()
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTx)
    });

    const data = await res.json();
    getTransactions();
    text.value = '';
    amount.value = '';
    type.value = '';
    date.value = '';
  } catch (err) {
    console.error('Add error:', err);
  }
}

async function deleteTransaction(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    getTransactions();
  } catch (err) {
    console.error('Delete error:', err);
  }
}

// ⭐ Filtering logic
function applyFilters() {
  const selectedYear = filterYear.value;
  const selectedMonth = filterMonth.value;

  const filtered = allTransactions.filter(tx => {
    const txDate = new Date(tx.createdAt);
    const matchYear = selectedYear ? txDate.getFullYear().toString() === selectedYear : true;
    const matchMonth = selectedMonth ? txDate.getMonth().toString() === selectedMonth : true;
    return matchYear && matchMonth;
  });

  updateUI(filtered);
}

// ⭐ Populate available years dynamically from data
function populateYearOptions(transactions) {
  const years = [...new Set(transactions.map(tx => new Date(tx.createdAt).getFullYear()))];
  filterYear.innerHTML = '<option value="">All</option>';
  years.forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.innerText = year;
    filterYear.appendChild(option);
  });
}

// ⭐ Add listeners to filters
filterYear.addEventListener('change', applyFilters);
filterMonth.addEventListener('change', applyFilters);

form.addEventListener('submit', addTransactionHandler);
getTransactions();
