import { getRepository, MigrationInterface } from "typeorm";

// seeds
import { MedalRewardSeed } from "../seeds/rewards.seed";

export class RewardMedalsSeed1632698452794 implements MigrationInterface {
  public async up(): Promise<void> {
    await getRepository("rewards").save(MedalRewardSeed);
  }

  public async down(): Promise<void> {
    // do nothing
  }
}
