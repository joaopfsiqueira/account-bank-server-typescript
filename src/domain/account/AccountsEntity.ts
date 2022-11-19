import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ColumnNumericTransformer } from '../../common/TransformersNumerics';

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
}
