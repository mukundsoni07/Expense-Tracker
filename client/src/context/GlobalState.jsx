import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';

const initialState = {
  transactions: [],
  loading: true,
  error: null,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // GET Transactions
  const getTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:8080/transactions');
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error || err.message,
      });
    }
  };

  // DELETE Transaction
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/transactions/${id}`);
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error || err.message,
      });
    }
  };

  // ADD Transaction
  const addTransaction = async (transaction) => {
    try {
      const res = await axios.post('http://localhost:8080/transactions', transaction);
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error || err.message,
      });
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        loading: state.loading,
        error: state.error,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
