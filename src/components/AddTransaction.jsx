import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [isCredit, setIsCredit] = useState(true); 

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: isCredit ? Math.abs(amount) : -Math.abs(amount),
      isCredit,
    }

    addTransaction(newTransaction);
    setText("");
    setAmount(0);
  }

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Reason</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="toggle-container">
          <label className={`toggle-label ${isCredit ? "credit" : "debit"}`}>
            {isCredit ? "Credit (Income)" : "Debit (Expense)"}
          </label>
          <button
            type="button"
            className={`toggle-btn ${isCredit ? "credit-btn" : "debit-btn"}`}
            onClick={() => setIsCredit(!isCredit)}
          >
            {isCredit ? "Switch to Debit" : "Switch to Credit"}
          </button>
        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >Amount <br />
            (negative - expense, positive - income)</label
          >
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  )
}