import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn
} from "typeorm";
import { PreferenceType } from "./PreferenceType";

import { User } from "./User";

@Entity("user_preferences")
export class UserPreferences {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column({ name: "user_id" })
  userId: number;

  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: 'varchar', default: 'Padrão'})
  name: string;

  @OneToMany(() => PreferenceType, (preferenceType) => preferenceType.userPreferences)
  preferenceTypes: PreferenceType[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
