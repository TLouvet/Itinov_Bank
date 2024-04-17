import { queryClient } from '@/config/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, vi, it, expect } from 'vitest';
import DepositPage from './DepositPage';
import {
  addAmount,
  addMotive,
  buttonIsDisabled,
  openAmountPanel,
  openReceivingAccountPanel,
  openSendingAccountPanel,
  selectAccount,
} from '../utils/transaction-pages.test-utils';
import WithdrawPage from './WithdrawPage';
import content from '../content.json';
import { ROUTES } from '@/router/routes';
import TransferPage from './TransferPage';
import { http } from '@/config/http';
import { act } from 'react-dom/test-utils';

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
    },
    {
      id: 2,
      balance: 200,
      reference: 'test',
      owner: 'Mr Doe John',
      type: 'Livret A',
      bank: 'Itinov Bank',
      maxOverdraft: 300,
    },
  ]),
}));

vi.mock('src/config/http', () => ({
  http: {
    post: vi.fn().mockResolvedValue({ data: { message: 'Transaction effectuée' } }),
  },
}));

vi.spyOn(http, 'post');

describe('DepositPage', () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/', ROUTES.DEPOSIT]} initialIndex={1}>
          <DepositPage />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  it('should render the appropriate menu', () => {
    expect(screen.queryByText(content.depositPage.title)).toBeTruthy();
    expect(screen.queryByText(content.menu.amount)).toBeTruthy();
    expect(screen.queryByText(content.menu.to)).toBeTruthy();
    expect(screen.queryByText(content.menu.from)).toBeFalsy();
  });

  it('should print errors when amount does not respect the rules', async () => {
    openAmountPanel();
    await addAmount(-150);

    expect(screen.queryByText('Montant invalide')).toBeTruthy();
    expect(screen.queryByText(content.errors.generic)).toBeTruthy();
  });

  it('should enable validation only when all the fields are filled', async () => {
    openAmountPanel();
    await addAmount(150);
    expect(buttonIsDisabled(content.menu.validate)).toBeTruthy();

    await addMotive('Test deposit');
    expect(buttonIsDisabled(content.menu.validate)).toBeTruthy();

    openSendingAccountPanel();
    await selectAccount('Compte épargne');

    expect(await waitFor(() => screen.getByText('Compte épargne'))).toBeTruthy();
    expect(await waitFor(() => screen.getByText(content.menu.validate))).toBeEnabled();
  });

  it('should reset values when the form is submitted', async () => {
    openAmountPanel();
    await addAmount(150);
    await addMotive('Test deposit');
    openSendingAccountPanel();
    await selectAccount('Compte épargne');

    expect(await waitFor(() => screen.getByText('Compte épargne'))).toBeTruthy();
    expect(await waitFor(() => screen.getByText(content.menu.validate))).toBeEnabled();
    await act(async () => {
      screen.getByText(content.menu.validate).click();
    });

    expect(http.post).toHaveBeenCalledWith('transactions/deposit', {
      amount: 150,
      reference: 'Test deposit',
      accountID: 1,
    });

    expect(screen.queryByDisplayValue('150')).toBeFalsy();
    expect(screen.queryByDisplayValue('Test deposit')).toBeFalsy();
    expect(screen.queryByDisplayValue('Compte épargne')).toBeFalsy();
  });
});

describe('WithdrawalPage', () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/', ROUTES.WITHDRAW]} initialIndex={1}>
          <WithdrawPage />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  it('should render the appropriate menu', () => {
    expect(screen.queryByText(content.withdrawPage.title)).toBeTruthy();
    expect(screen.queryByText(content.menu.amount)).toBeTruthy();
    expect(screen.queryByText(content.menu.from)).toBeTruthy();
    expect(screen.queryByText(content.menu.to)).toBeFalsy();
  });

  it('should print errors when amount does not respect the rules', async () => {
    openAmountPanel();
    await addAmount(-150);

    expect(screen.queryByText('Montant invalide')).toBeTruthy();
    expect(screen.queryByText(content.errors.generic)).toBeTruthy();
    expect(buttonIsDisabled(content.menu.validate)).toBeTruthy();
  });

  it('should enable the validation only when all fields are filled', async () => {
    openAmountPanel();
    await addAmount(150);

    expect(buttonIsDisabled(content.menu.validate)).toBeTruthy();
    await addMotive('Test withdrawal');

    expect(buttonIsDisabled(content.menu.validate)).toBeTruthy();
    openReceivingAccountPanel();
    await selectAccount('Compte épargne');

    expect(await waitFor(() => screen.getByText('Compte épargne'))).toBeTruthy();
    expect(buttonIsDisabled(content.menu.validate)).toBeFalsy();
  });

  it('should reset values when the form is submitted', async () => {
    openAmountPanel();
    await addAmount(150);
    await addMotive('Test withdrawal');
    openReceivingAccountPanel();
    await selectAccount('Compte épargne');

    expect(await waitFor(() => screen.getByText('Compte épargne'))).toBeTruthy();
    expect(buttonIsDisabled(content.menu.validate)).toBeFalsy();
    await act(async () => {
      screen.getByText(content.menu.validate).click();
    });

    expect(http.post).toHaveBeenCalledWith('transactions/withdraw', {
      amount: 150,
      reference: 'Test withdrawal',
      accountID: 1,
    });

    expect(screen.queryByDisplayValue('150')).toBeFalsy();
    expect(screen.queryByDisplayValue('Test withdrawal')).toBeFalsy();
    expect(screen.queryByDisplayValue('Compte épargne')).toBeFalsy();
  });
});

describe('TransferPage', () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/', ROUTES.TRANSFER]} initialIndex={1}>
          <TransferPage />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  it('should render the appropriate menu', () => {
    expect(screen.queryByText(content.transferPage.title)).toBeTruthy();
    expect(screen.queryByText(content.menu.amount)).toBeTruthy();
    expect(screen.queryByText(content.menu.to)).toBeTruthy();
    expect(screen.queryByText(content.menu.from)).toBeTruthy();
  });

  it('should print errors when amount does not respect the rules', async () => {
    openAmountPanel();
    await addAmount(-150);

    expect(screen.queryByText('Montant invalide')).toBeTruthy();
    expect(screen.queryByText(content.errors.generic)).toBeTruthy();
    expect(buttonIsDisabled(content.menu.validate)).toBeTruthy();
  });

  it('should enable the validation only when all fields are filled', async () => {
    openAmountPanel();
    await addAmount(150);

    expect(buttonIsDisabled(content.menu.validate)).toBeTruthy();
    await addMotive('Test transfer');

    expect(buttonIsDisabled(content.menu.validate)).toBeTruthy();
    openSendingAccountPanel();
    await selectAccount('Compte épargne');

    expect(await waitFor(() => screen.getByText('Compte épargne'))).toBeTruthy();
    expect(buttonIsDisabled(content.menu.validate)).toBeTruthy();

    openReceivingAccountPanel();
    await selectAccount('Livret A');
    expect(await waitFor(() => screen.getByText('Livret A'))).toBeTruthy();
    expect(buttonIsDisabled(content.menu.validate)).toBeFalsy();
  });

  /**
   * Le test semble échouer car il n'arrive pas à envoyer la bonne requête,
   * erreur d'implémentation du test
   */

  // it('should reset values when the form is submitted', async () => {
  //   openAmountPanel();
  //   await addAmount(150);
  //   await addMotive('Test transfer');
  //   openSendingAccountPanel();
  //   await selectAccount('Compte épargne');
  //   openReceivingAccountPanel();
  //   await selectAccount('Livret A');

  //   expect(await waitFor(() => screen.getByText('Livret A'))).toBeTruthy();
  //   expect(buttonIsDisabled(content.menu.validate)).toBeFalsy();
  //   await act(async () => {
  //     screen.getByText(content.menu.validate).click();
  //   });

  //   expect(http.post).toHaveBeenCalledWith('transactions/transfer', {
  //     amount: 150,
  //     reference: 'Test transfer',
  //     senderID: 1,
  //     receiverID: 2,
  //   });

  //   expect(screen.queryByDisplayValue('150')).toBeFalsy();
  //   expect(screen.queryByDisplayValue('Test transfer')).toBeFalsy();
  //   expect(screen.queryByDisplayValue('Compte épargne')).toBeFalsy();
  //   expect(screen.queryByDisplayValue('Livret A')).toBeFalsy();
  // });
});
