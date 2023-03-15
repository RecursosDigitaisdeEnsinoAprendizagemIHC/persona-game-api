import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
} from "typeorm";

import { UserPreferences } from "./UserPreferences";

@Entity("preferences_type")
export class PreferenceType {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column({ name: "user_preference_id" })
  userPreferenceId: number;

  @JoinColumn({ name: "user_preference_id" })
  @ManyToOne(() => UserPreferences, (userPreference) => userPreference.preferenceTypes)
  userPreferences: UserPreferences;

  @Column()
  name: string;

  @Column({ name: "input_type" })
  inputType: string;

  @Column({nullable: true})
  options: string | null;

  @Column()
  value: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
