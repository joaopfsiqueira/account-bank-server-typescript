import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Accounts } from '../account/AccountsEntity';
import { ColumnNumericTransformer } from '../../common/TransformersNumerics';

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

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Accounts)
  @JoinColumn()
  debitedAccount: Accounts;

  @ManyToOne(() => Accounts)
  @JoinColumn()
  creditedAccount: Accounts;
}
