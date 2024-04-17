import { act, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export function openAmountPanel() {
  const amountPanel = screen.getByText('Montant & Motif');
  act(() => {
    userEvent.click(amountPanel);
  });
}

export function openSendingAccountPanel() {
  const accountPanel = screen.getByText('Vers le compte');
  act(() => {
    userEvent.click(accountPanel);
  });
}

export function openReceivingAccountPanel() {
  const accountPanel = screen.getByText('Depuis le compte');
  act(() => {
    userEvent.click(accountPanel);
  });
}

export async function selectAccount(account: string) {
  const accountElement = await waitFor(() => screen.getByText(account));
  act(() => {
    fireEvent.click(accountElement);
  });
}

export async function addAmount(amount: number) {
  const amountInput = await waitFor(() => screen.getByLabelText('Je choisis un montant de'));
  fireEvent.change(amountInput, { target: { value: amount } });
}

export async function addMotive(motive: string) {
  const motiveInput = await waitFor(() => screen.getByLabelText('Motif visible dans mon historique'));
  fireEvent.change(motiveInput, { target: { value: motive } });
}

export function buttonIsDisabled(buttonText: string) {
  return screen.getByText(buttonText)?.hasAttribute('disabled');
}
