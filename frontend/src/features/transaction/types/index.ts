export type TransactionPanel = 'sending' | 'receiving' | 'amount';
export type EPanelAction = 'SEND' | 'RECEIVE' | 'AMOUNT';
export const PANEL_TYPE: Record<EPanelAction, TransactionPanel> = {
  SEND: 'sending',
  RECEIVE: 'receiving',
  AMOUNT: 'amount',
};

export type TransactionType = 'withdrawal' | 'deposit' | 'transfer' | '';

export type Transaction = Readonly<{
  transaction_id: number;
  amount: string;
  date: Date;
  description: string;
  transaction_type: string;
}>;

export type DepositMutation = Readonly<{
  amount: number;
  accountID: number;
  reference: string;
}>;

export type TransferMutation = Readonly<{
  amount: number;
  senderID: number;
  receiverID: number;
  reference: string;
}>;

export type WithdrawMutation = Readonly<{
  amount: number;
  accountID: number;
  reference: string;
}>;
