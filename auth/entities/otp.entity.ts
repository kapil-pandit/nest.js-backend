import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('otp')
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;
  default : 1;

  @Column()
  email: string;

  @Column()
  otp: string;

  @Column()
  createdAt: Date;

  @Column()
  expiryTime: Date;

  @Column({ default: true })
  status: boolean;
}
