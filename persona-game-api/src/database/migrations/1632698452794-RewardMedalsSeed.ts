import { getRepository, MigrationInterface, QueryRunner } from "typeorm";

// seeds
import { MedalRewardSeed } from "../seeds/rewards.seed";

export class RewardMedalsSeed1632698452794 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository("rewards").save(MedalRewardSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
