import { EntityRepository, Repository } from "typeorm";
import { UserHasReward } from "../entities/UserHasReward";

@EntityRepository(UserHasReward)
export class UserHasRewardRepository extends Repository<UserHasReward> {}
