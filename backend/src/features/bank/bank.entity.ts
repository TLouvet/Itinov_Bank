import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('bank')
export class Bank {
  @PrimaryColumn()
  bank_id: number;

  @Column()
  name: string;
}
