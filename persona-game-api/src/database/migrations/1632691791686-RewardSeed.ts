import { getRepository, MigrationInterface, QueryRunner } from "typeorm";

// seeds
import { RewardSeed } from "../seeds/rewards.seed";

export class RewardSeed1632691791686 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository("rewards").save(RewardSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
