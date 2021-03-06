import { getCustomRepository } from "typeorm";

import { UserHasRewardRepository } from "../repositories/UserHasRewardRepository";

export const getUserRewardsService = async (userId: number) => {
  const userHasRewardRepository = getCustomRepository(UserHasRewardRepository);

  const userRewards = await userHasRewardRepository.find({
    userId,
  });

  return userRewards;
};
