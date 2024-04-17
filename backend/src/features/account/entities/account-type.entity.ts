import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AccountType {
  @PrimaryGeneratedColumn()
  acc_type_id: number;

  @Column()
  name: string;
}
