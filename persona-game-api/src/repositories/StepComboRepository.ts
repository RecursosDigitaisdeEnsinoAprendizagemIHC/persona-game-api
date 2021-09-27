import { EntityRepository, Repository } from "typeorm";
import { StepCombo } from "../entities/StepCombo";

@EntityRepository(StepCombo)
export class StepComboRepository extends Repository<StepCombo> {}
