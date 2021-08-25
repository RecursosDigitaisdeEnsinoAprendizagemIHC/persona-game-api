import { EntityRepository, Repository } from "typeorm";
import { UserStepsLog } from "../entities/UserStepsLog";

@EntityRepository(UserStepsLog)
export class UserStepsLogRepository extends Repository<UserStepsLog> {}
