import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ColumnNumericTransformer } from '../../common/TransformersNumerics';
import { Transactions } from '../transaction/TransactionsEntity';

@Entity()
export class Accounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 100,
    transformer: new ColumnNumericTransformer(),
  })
  balance: number;

  @OneToMany(
    () => Transactions,
    (transaction) => {
      transaction.creditedAccount, transaction.debitedAccount;
    }
  )
  transaction: Transactions[];
}
