import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./User";

@Entity("user_answered_questions")
export class UserAnsweredQuestions {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column({ name: "user_id" })
  userId: number;

  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "question_id" })
  questionId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
