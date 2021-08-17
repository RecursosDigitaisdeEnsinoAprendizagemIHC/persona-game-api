import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Step } from "./Step";
import { User } from "./User";

@Entity("user_finished_steps")
export class UserFinishedStep {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @JoinColumn({ name: "user_id" })
  user: User;
  
  @JoinColumn({ name: "step_id" })
  step: Step;

  @Column()
  time_to_finish: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
