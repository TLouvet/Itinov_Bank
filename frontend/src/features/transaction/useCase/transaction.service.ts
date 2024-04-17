import { http } from '@/config/http';
import { DepositMutation, TransferMutation, WithdrawMutation } from '../types';

const apiEndpoint = 'transactions';

export async function withdraw(data: WithdrawMutation) {
  await http.post(`${apiEndpoint}/withdraw`, data);
  return data;
}

export async function deposit(data: DepositMutation) {
  await http.post(`${apiEndpoint}/deposit`, data);
  return data;
}

export async function transfer(data: TransferMutation) {
  await http.post(`${apiEndpoint}/transfer`, data);
  return data;
}
