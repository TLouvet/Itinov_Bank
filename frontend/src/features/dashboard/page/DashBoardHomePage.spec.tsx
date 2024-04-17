import { queryClient } from '@/config/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import DashBoardHomePage from './DashBoardHomePage';
import content from '../content.json';

import { ROUTES } from '@/router/routes';

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.mock('src/features/account/useCase/account.service', () => ({
  findAll: vi.fn().mockResolvedValue([
    {
      id: 1,
      balance: 100,
      reference: 'test',
      owner: 'Mr Doe John',
      type: 'Compte épargne',
      bank: 'Itinov Bank',
      maxOverdraft: 200,
      transactions: [
        {
          transaction_id: 123,
          amount: '-150.00',
          date: '24-04-17',
          description: 'Test withdrawal',
          transaction_type: 'Withdrawal',
        },
        {
          transaction_id: 122,
          amount: '150.00',
          date: '24-04-17',
          description: 'Test deposit',
          transaction_type: 'Deposit',
        },
        {
          transaction_id: 121,
          amount: '-150.00',
          date: '24-04-17',
          description: 'Test withdrawal',
          transaction_type: 'Withdrawal',
        },
      ],
    },
    {
      id: 2,
      balance: 200,
      reference: 'test',
      owner: 'Mr Doe John',
      type: 'Livret A',
      bank: 'Itinov Bank',
      maxOverdraft: 300,
      transactions: [
        {
          transaction_id: 109,
          amount: '-150.00',
          date: '24-04-17',
          description: 'Test transfer',
          transaction_type: 'Transfer',
        },
        {
          transaction_id: 105,
          amount: '-150.00',
          date: '24-04-17',
          description: 'Test transfer',
          transaction_type: 'Transfer',
        },
        {
          transaction_id: 101,
          amount: '-150.00',
          date: '24-04-17',
          description: 'Test transfer',
          transaction_type: 'Transfer',
        },
      ],
    },
  ]),
}));

vi.mock('src/features/statistics/useCase/statistics.service', () => ({
  getByAccount: vi.fn().mockResolvedValue([
    {
      name: '24-04-17',
      income: 150,
      outcome: 300,
      balance: 1500,
    },
    {
      name: '25-04-17',
      income: 150,
      outcome: 300,
      balance: 1500,
    },
    {
      name: '26-04-17',
      income: 150,
      outcome: 300,
      balance: 1500,
    },
  ]),
}));

describe('DashBoardHomePage', () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/', ROUTES.HISTORY]} initialIndex={0}>
          <DashBoardHomePage />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  it('should render the page', () => {
    expect(screen.getByText(content.page.title)).toBeTruthy();
  });

  it('should display all of the accounts cards', async () => {
    const accountTitle = await waitFor(() => screen.getByRole('heading', { name: 'Mes comptes' }));
    const list = accountTitle.parentElement?.querySelector('ul');
    expect(list).toContainElement(await waitFor(() => screen.getByText('Compte épargne')));
    expect(list).toContainElement(await waitFor(() => screen.getByText('Livret A')));
  });

  it('should display the statistics chart', async () => {
    expect(screen.getByText('Mon Récap Mensuel')).toBeTruthy();
  });
});
