import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

function moneyFormatter(num) {
  let p = num.toFixed(2).split('.');
  return (
    '₹ ' +
    p[0]
      .split('')
      .reverse()
      .reduce((acc, num, i) => (num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc), '') +
    '.' +
    p[1]
  );
}

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const income = transactions
    .filter(transaction => transaction.isCredit)
    .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);

  const expense = transactions
    .filter(transaction => !transaction.isCredit)
    .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">{moneyFormatter(income)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">{moneyFormatter(expense)}</p>
      </div>
    </div>
  );
};
