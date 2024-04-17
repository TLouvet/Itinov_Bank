export class TransactionResponseDTO {
  readonly transaction_id: number;
  readonly amount: string;
  readonly date: string;
  readonly description: string;
  readonly transaction_type: string;

  constructor(transaction: any) {
    this.transaction_id = transaction.transaction_id;
    this.amount = transaction.amount;
    this.date = transaction.date;
    this.description = transaction.description;
    this.transaction_type = transaction.transaction_type?.name ?? transaction.transaction_type;
  }
}
