import { EntityRepository, Repository } from "typeorm";
import { Reward } from "../entities/Reward";

@EntityRepository(Reward)
export class RewardRepository extends Repository<Reward> {}
