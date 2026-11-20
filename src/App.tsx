import { useState, useEffect, type FormEvent } from 'react';
import './App.css';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

const STORAGE_KEY = 'expense_tracker_transactions';

const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'Monthly Salary',
    amount: 3000,
    type: 'income',
    category: 'Salary',
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: '2',
    title: 'Grocery Shopping',
    amount: 150,
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: '3',
    title: 'Electricity & Internet',
    amount: 85,
    type: 'expense',
    category: 'Utilities',
    date: new Date().toISOString().split('T')[0],
  },
];

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved) as Transaction[];
      } catch {
        return DEFAULT_TRANSACTIONS;
      }
    }
    return DEFAULT_TRANSACTIONS;
  });

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const handleAddTransaction = (e: FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!title.trim() || isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    const newTransaction: Transaction = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      title: title.trim(),
      amount: parsedAmount,
      type,
      category,
      date,
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setTitle('');
    setAmount('');
  };

  const handleDelete = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filter === 'income') return t.type === 'income';
    if (filter === 'expense') return t.type === 'expense';
    return true;
  });

  return (
    <div className="app-container">
      <header className="header">
        <h1>Expense Tracker</h1>
        <p>Keep track of your income, expenses, and current balance</p>
      </header>

      {/* Summary Cards */}
      <section className="summary-grid">
        <div className="card balance">
          <h3>Total Balance</h3>
          <p className={`amount ${balance >= 0 ? 'positive' : 'negative'}`}>
            ${balance.toFixed(2)}
          </p>
        </div>
        <div className="card income">
          <h3>Total Income</h3>
          <p className="amount">+${totalIncome.toFixed(2)}</p>
        </div>
        <div className="card expense">
          <h3>Total Expense</h3>
          <p className="amount">-${totalExpense.toFixed(2)}</p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="main-grid">
        {/* Transaction Form */}
        <section className="form-card">
          <h2>Add Transaction</h2>
          <form onSubmit={handleAddTransaction} className="transaction-form">
            <div className="form-group">
              <label>Type</label>
              <div className="type-toggle">
                <button
                  type="button"
                  className={`type-button ${type === 'expense' ? 'active-expense' : ''}`}
                  onClick={() => setType('expense')}
                >
                  Expense
                </button>
                <button
                  type="button"
                  className={`type-button ${type === 'income' ? 'active-income' : ''}`}
                  onClick={() => setType('income')}
                >
                  Income
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="title">Title / Description</label>
              <input
                id="title"
                type="text"
                placeholder="e.g. Grocery, Salary"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount ($)</label>
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Food">Food & Dining</option>
                <option value="Salary">Salary & Income</option>
                <option value="Utilities">Utilities & Bills</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Add {type === 'income' ? 'Income' : 'Expense'}
            </button>
          </form>
        </section>

        {/* Transaction History */}
        <section className="history-card">
          <div className="history-header">
            <h2>Transaction History</h2>
            <div className="filter-buttons">
              <button
                type="button"
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                type="button"
                className={`filter-btn ${filter === 'income' ? 'active' : ''}`}
                onClick={() => setFilter('income')}
              >
                Income
              </button>
              <button
                type="button"
                className={`filter-btn ${filter === 'expense' ? 'active' : ''}`}
                onClick={() => setFilter('expense')}
              >
                Expenses
              </button>
            </div>
          </div>

          {filteredTransactions.length === 0 ? (
            <p className="empty-state">No transactions recorded yet.</p>
          ) : (
            <ul className="transaction-list">
              {filteredTransactions.map((item) => (
                <li key={item.id} className={`transaction-item ${item.type}`}>
                  <div className="item-details">
                    <span className="item-title">{item.title}</span>
                    <div className="item-meta">
                      <span className="category-tag">{item.category}</span>
                      <span className="item-date">{item.date}</span>
                    </div>
                  </div>
                  <div className="item-right">
                    <span className={`item-amount ${item.type}`}>
                      {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                      title="Delete transaction"
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
