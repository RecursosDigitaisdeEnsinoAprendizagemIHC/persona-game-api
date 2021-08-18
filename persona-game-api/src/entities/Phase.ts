import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Step } from "./Step";

@Entity("phases")
export class Phase {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column()
  topic: string;

  @Column()
  description: string;

  @Column()
  number: number;

  @OneToMany(() => Step, (step) => step.phase)
  steps: Step[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
