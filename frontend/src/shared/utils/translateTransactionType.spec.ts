import { describe, it, expect } from 'vitest';
import { translateTransactionType } from './translateTransactionType';

describe('translateTransactionType', () => {
  it("should return 'Dépôt' when given 'deposit'", () => {
    const transactionType = 'deposit';
    const result = translateTransactionType(transactionType);
    expect(result).toBe('Dépôt');
  });

  it("should return 'Retrait' when given 'withdrawal'", () => {
    const transactionType = 'withdrawal';
    const result = translateTransactionType(transactionType);
    expect(result).toBe('Retrait');
  });

  it("should return 'Virement' when given 'transfer'", () => {
    const transactionType = 'transfer';
    const result = translateTransactionType(transactionType);
    expect(result).toBe('Virement');
  });

  it("should return 'Inconnu' when given an unknown transaction type", () => {
    const transactionType = 'unknown';
    const result = translateTransactionType(transactionType);
    expect(result).toBe('Inconnu');
  });
});
