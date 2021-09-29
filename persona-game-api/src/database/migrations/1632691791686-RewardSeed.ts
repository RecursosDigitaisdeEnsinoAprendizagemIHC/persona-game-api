import { getRepository, MigrationInterface } from "typeorm";

// seeds
import { RewardSeed } from "../seeds/rewards.seed";

export class RewardSeed1632691791686 implements MigrationInterface {
  public async up(): Promise<void> {
    await getRepository("rewards").save(RewardSeed);
  }

  public async down(): Promise<void> {
    // do nothing
  }
}
