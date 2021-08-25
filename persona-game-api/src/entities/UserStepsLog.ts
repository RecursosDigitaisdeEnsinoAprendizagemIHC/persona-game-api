import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Step } from "./Step";
import { User } from "./User";

@Entity("user_steps_log")
export class UserStepsLog {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column({ name: "user_id" })
  userId: number;

  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "step_id" })
  stepId: number;

  @JoinColumn({ name: "step_id" })
  step: Step;

  @Column()
  current_step: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
