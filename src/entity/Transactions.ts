import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Accounts } from './Accounts';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  //   @OneToOne(() => Accounts)
  //   @JoinColumn()
  //   account: Accounts;
}
