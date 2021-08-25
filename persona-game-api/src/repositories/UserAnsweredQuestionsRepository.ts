import { EntityRepository, Repository } from "typeorm";
import { UserAnsweredQuestions } from "../entities/UserAnsweredQuestions";

@EntityRepository(UserAnsweredQuestions)
export class UserAnsweredQuestionsRepository extends Repository<UserAnsweredQuestions> {
  findAllByUser(userId) {
    return this.find({
      where: {
        userId,
      },
    });
  }
}
