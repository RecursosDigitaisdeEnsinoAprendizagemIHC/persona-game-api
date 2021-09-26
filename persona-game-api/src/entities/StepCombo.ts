import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./User";

@Entity("step_combo")
export class StepCombo {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column({ name: "user_id" })
  userId: number;

  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  combo: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
