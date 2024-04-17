import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

export const useTransactionContext = () => useContext(TransactionContext);
