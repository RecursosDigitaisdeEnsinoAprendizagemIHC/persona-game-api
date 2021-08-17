import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Phase } from "./Phase";

@Entity("steps")
export class Step {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @JoinColumn({ name: "phase_id" })
  @ManyToOne(() => Phase, (phase) => phase.steps)
  phase: Phase;

  @Column()
  description: string;

  @Column()
  number: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
