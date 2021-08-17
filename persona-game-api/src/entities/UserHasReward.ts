import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { User } from "./User";
import { Reward } from "./Reward";

@Entity("user_has_reward")
export class UserHasReward {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @JoinColumn({ name: "user_id" })
  user: User;

  @JoinColumn({ name: "reward_id" })
  reward: Reward;

  @Column()
  level: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
