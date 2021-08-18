import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Phase } from "./Phase";
import { UserFinishedStep } from "./UserFinishedStep";

@Entity("steps")
export class Step {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column()
  phase_id: number;

  @JoinColumn({ name: "phase_id" })
  @ManyToOne(() => Phase, (phase) => phase.steps)
  phase: Phase;

  @OneToMany(
    () => UserFinishedStep,
    (users_finished_step) => users_finished_step.step
  )
  users_finished_step: UserFinishedStep[];

  @Column()
  description: string;

  @Column()
  number: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
