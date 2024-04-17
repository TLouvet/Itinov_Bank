import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transaction_type')
export class TransactionTypeEntity {
  @PrimaryGeneratedColumn()
  transaction_type_id: number;

  @Column()
  name: string;
}
