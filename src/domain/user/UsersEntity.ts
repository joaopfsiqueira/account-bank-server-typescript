import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Accounts } from '../account/AccountsEntity';
import bcrypt = require('bcrypt');

@Entity()
export class Users {
  constructor(username: string, password: string, account: Accounts) {
    this.username = username;
    this.password = password;
    this.account = account;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @BeforeInsert() //antes de inserir a senha
  @BeforeUpdate() // depois de inserir a senha (caso precisa atualizar a senha.)
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  @OneToOne(() => Accounts)
  @JoinColumn()
  account: Accounts;
}
