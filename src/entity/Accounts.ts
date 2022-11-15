import { Entity, PrimaryGeneratedColumn, Column, Double } from 'typeorm';

@Entity()
export class Accounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  balance: number;
}
