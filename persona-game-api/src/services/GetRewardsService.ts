import { getCustomRepository } from "typeorm";

import { RewardRepository } from "../repositories/RewardRepository";
import { success } from "./helpers/success";
import { ServiceResponseInterface } from "./protocols/ServiceResponseInterface";

export const getRewardsService = async ():Promise<ServiceResponseInterface> => {
  const rewardRepository = getCustomRepository(RewardRepository);
  const rewards = await rewardRepository.find({});
  return success(rewards);
};
