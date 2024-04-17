import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccountType } from './account-type.entity';
import { Customer } from '../../customer/customer.entity';
import { Bank } from '../..//bank/bank.entity';
import { TransactionEntity } from '../../transaction/entity/transaction.entity';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn()
  account_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  balance: number;

  @Column()
  max_overdraft: number;

  @Column()
  account_number: string;

  @ManyToOne(() => AccountType, (accountType) => accountType.acc_type_id)
  @JoinColumn({ name: 'account_type_id', referencedColumnName: 'acc_type_id' })
  account_type: AccountType;

  @ManyToOne(() => Customer, (c) => c.customer_id)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Bank, (b) => b.bank_id)
  @JoinColumn({ name: 'bank_id', referencedColumnName: 'bank_id' })
  bank: Bank;

  @OneToMany(() => TransactionEntity, (t) => t.account)
  transactions: TransactionEntity[];
}
