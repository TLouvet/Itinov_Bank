import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';
import { TransactionProvider } from '../../context/TransactionProvider';
import { TransactionAmountSelection } from './TransactionAmountSelection';
import { TransactionAmountDetail } from '../TransactionMenu/TransactionAmountDetail';
import { TransactionMenuItem } from '../TransactionMenu/TransactionMenuItem';
import content from '../../content.json';

describe('Transaction Amount and Reference', () => {
  beforeEach(() => {
    render(
      <TransactionProvider>
        <TransactionMenuItem
          Component={TransactionAmountDetail}
          componentProps={{ error: true }}
          onClick={() => null}
          title={content.menu.amount}
          selected={false}
        />
        <TransactionAmountSelection />
      </TransactionProvider>
    );
  });

  describe('TransactionAmountSelection', () => {
    it('should render correctly', () => {
      expect(getInputScreen()).toBeInTheDocument();
      expect(screen.getByLabelText(content.labels.motive)).toBeInTheDocument();
    });

    it('should register the value in the context', async () => {
      addAmount(100);
      expect(getInputScreen()).toHaveValue(100);
    });

    it('should render correctly when input is valid', async () => {
      addAmount(100);
      expect(screen.queryByText(content.errors.amount)).toBeNull();
    });

    it('should render an error message if the amount is negative', async () => {
      addAmount(-100);
      expect(await screen.findByText(content.errors.amount)).toBeInTheDocument();
    });
  });

  describe('TransactionAmountDetail', () => {
    it('should render', () => {
      expect(screen.getByText(content.menu.amount)).toBeInTheDocument();
    });

    it('should display a message on error if the error props was passed', () => {
      addAmount(-100);
      expect(screen.getByText(content.errors.generic)).toBeInTheDocument();
    });
  });
});

function getInputScreen() {
  return screen.getByLabelText(content.labels.amount);
}

function addAmount(value: number) {
  const input = getInputScreen();
  act(() => {
    fireEvent.change(input, { target: { value } });
  });
}
