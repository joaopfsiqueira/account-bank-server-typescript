import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Accounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  balance: number;
}
