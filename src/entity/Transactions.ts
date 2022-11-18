import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Accounts } from './Accounts';
import { ColumnNumericTransformer } from '../common/transformersNumerics';

@Entity()
export class Transactions {
  constructor(
    value: number,
    debitedAccount: Accounts,
    creditedUsernameAccount: Accounts
  ) {
    this.value = value;
    this.debitedAccount = debitedAccount;
    this.creditedAccount = creditedUsernameAccount;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  value: number;

  @Column({ type: 'timestamptz', nullable: true })
  createdAt: Date;

  @ManyToOne(() => Accounts)
  @JoinColumn()
  debitedAccount: Accounts;

  @ManyToOne(() => Accounts)
  @JoinColumn()
  creditedAccount: Accounts;
}
