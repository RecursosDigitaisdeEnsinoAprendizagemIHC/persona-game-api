import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { PhaseSeed } from "../seeds/phase.seed";
import { StepSeed } from "../seeds/steps.seed";

export class PhaseStepSeed1629316724527 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository("phases").save(PhaseSeed);
    await getRepository("steps").save(StepSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
