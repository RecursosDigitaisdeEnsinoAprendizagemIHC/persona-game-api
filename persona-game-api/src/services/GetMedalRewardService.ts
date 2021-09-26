import { getCustomRepository } from "typeorm";
import { UserFinishedStep } from "../entities/UserFinishedStep";

import { RewardRepository } from "../repositories/RewardRepository";
import { UserHasRewardRepository } from "../repositories/UserHasRewardRepository";

// if set difficulty, change this
const MINUTES_TO_FINISH_STEP = 5;

export const getMedalRewardService = async (
  userId,
  finishedStep: UserFinishedStep
) => {
  const rewards = [];

  const timeReward = await getAnswerTimeReward(userId, finishedStep);
  if (timeReward) {
    rewards.push(timeReward);
  }

  return rewards;
};

const getAnswerTimeReward = async (userId, finishedStep) => {
  const rewardRepository = getCustomRepository(RewardRepository);
  const userHasRewardRepository = getCustomRepository(UserHasRewardRepository);
  const rewardType = "TIME_MEDAL";

  const reward = await rewardRepository.findOne({ type: rewardType });
  let userHasReward = await userHasRewardRepository.findOne({
    userId,
    rewardId: reward.id,
  });

  let hasReward = false;
  let rewardLevel: string;
  if (finishedStep.time_to_finish < 90) {
    hasReward = true;
    rewardLevel = "gold";
  } else if (finishedStep.time_to_finish < 180) {
    hasReward = true;
    rewardLevel = "silver";
  } else if (finishedStep.time_to_finish < 240) {
    hasReward = true;
    rewardLevel = "bronze";
  }

  if (hasReward) {
    const medalRarityNumber = getMedalRarityNumber(rewardLevel);
    if (
      userHasReward &&
      medalRarityNumber > getMedalRarityNumber(userHasReward.level)
    ) {
      userHasReward = await userHasRewardRepository.save({
        id: userHasReward.id,
        level: rewardLevel,
      });
      return {
        reward,
        level: rewardLevel,
      };
    }
  }
};

const getMedalRarityNumber = (level) => {
  const obj = {
    bronze: 1,
    silver: 2,
    gold: 3,
  };
  return obj[level];
};
