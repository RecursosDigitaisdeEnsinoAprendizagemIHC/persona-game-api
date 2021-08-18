import { EntityRepository, Repository } from "typeorm";
import { Step } from "../entities/Step";

@EntityRepository(Step)
export class StepRepository extends Repository<Step> {}
