import { getCustomRepository } from "typeorm";

import { RewardRepository } from "../repositories/RewardRepository";

export const getRewardsService = async () => {
  const rewardRepository = getCustomRepository(RewardRepository);

  const rewards = await rewardRepository.find({});

  return rewards;
};
