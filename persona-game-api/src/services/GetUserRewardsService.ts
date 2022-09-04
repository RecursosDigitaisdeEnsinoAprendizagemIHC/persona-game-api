import { getCustomRepository } from "typeorm";

import { UserHasRewardRepository } from "../repositories/UserHasRewardRepository";
import { success } from "./helpers/success";
import { ServiceResponseInterface } from "./protocols/ServiceResponseInterface";

export const getUserRewardsService = async (userId: number): Promise<ServiceResponseInterface> => {
  const userHasRewardRepository = getCustomRepository(UserHasRewardRepository);
  const userRewards = await userHasRewardRepository.find({
    userId,
  });
  return success(userRewards);
};
