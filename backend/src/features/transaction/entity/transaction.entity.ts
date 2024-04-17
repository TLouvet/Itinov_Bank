import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../../account/entities/account.entity';
import { TransactionTypeEntity } from './transaction-type.entity';

@Entity('transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  transaction_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @ManyToOne(() => TransactionTypeEntity, (transactionType) => transactionType.transaction_type_id)
  @JoinColumn({ name: 'transaction_type_id', referencedColumnName: 'transaction_type_id' })
  transaction_type: TransactionTypeEntity;

  @ManyToOne(() => Account, (account) => account.account_id)
  @JoinColumn([{ name: 'account_id', referencedColumnName: 'account_id' }])
  account: Account;
}
