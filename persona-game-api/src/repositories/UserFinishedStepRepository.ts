import { EntityRepository, Repository } from "typeorm";
import { UserFinishedStep } from "../entities/UserFinishedStep";

@EntityRepository(UserFinishedStep)
export class UserFinishedStepRepository extends Repository<UserFinishedStep> {
  findAllByUser(userId) {
    return this.find({
      where: {
        userId,
      },
      relations: ["step"],
    });
  }

  findLastStepByUser(userId) {
    return this.findOne({
      where: {
        userId,
      },
      relations: ["step"],
      order: {
        stepId: "DESC",
      },
    });
  }
}
