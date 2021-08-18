import { EntityRepository, Repository } from "typeorm";
import { Phase } from "../entities/Phase";

@EntityRepository(Phase)
export class PhaseRepository extends Repository<Phase> {
  findAll() {
    return this.find({
      relations: ["steps"],
    });
  }
}
