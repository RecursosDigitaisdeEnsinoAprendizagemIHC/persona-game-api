import {getRepository, MigrationInterface} from "typeorm";

import { PhaseSeed } from "../seeds/phase.seed";
import { StepSeed } from "../seeds/steps.seed";

export class PhaseStepSeed1675172899402 implements MigrationInterface {
    public async up(): Promise<void> {
        await getRepository("phases").save(PhaseSeed);
        await getRepository("steps").save(StepSeed);
      }

      public async down(): Promise<void> {
        // do nothing
      }

}
