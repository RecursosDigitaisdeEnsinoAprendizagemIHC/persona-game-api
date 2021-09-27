import { getCustomRepository } from "typeorm";
import { Reward } from "../entities/Reward";
import { UserFinishedStep } from "../entities/UserFinishedStep";
import { UserHasReward } from "../entities/UserHasReward";
import { QuestionComboRepository } from "../repositories/QuestionComboRepository";

import { RewardRepository } from "../repositories/RewardRepository";
import { StepComboRepository } from "../repositories/StepComboRepository";
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

  const questionComboReward = await getQuestionComboReward(userId);
  if (questionComboReward) {
    rewards.push(questionComboReward);
  }

  const stepComboReward = await getStepComboReward(userId);
  if (stepComboReward) {
    rewards.push(stepComboReward);
  }

  return rewards;
};

const getAnswerTimeReward = async (userId, finishedStep) => {
  if (!finishedStep) return;
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
  if (finishedStep.time_to_finish <= (MINUTES_TO_FINISH_STEP * 60 * 30) / 100) {
    // 30% of step time or less
    hasReward = true;
    rewardLevel = "gold";
  } else if (
    finishedStep.time_to_finish <=
    (MINUTES_TO_FINISH_STEP * 60 * 60) / 100
  ) {
    // 60% of step time or less
    hasReward = true;
    rewardLevel = "silver";
  } else if (
    finishedStep.time_to_finish <=
    MINUTES_TO_FINISH_STEP * 60 * 80 * 100
  ) {
    // 80% of step time or less
    hasReward = true;
    rewardLevel = "bronze";
  }

  return await updateUserHasReward(
    userId,
    reward,
    userHasReward,
    hasReward,
    rewardLevel
  );
};

const getQuestionComboReward = async (userId) => {
  const questionComboRepository = getCustomRepository(QuestionComboRepository);
  const rewardRepository = getCustomRepository(RewardRepository);
  const userHasRewardRepository = getCustomRepository(UserHasRewardRepository);
  const rewardType = "QUESTION_COMBO_MEDAL";

  const reward = await rewardRepository.findOne({ type: rewardType });
  let userHasReward = await userHasRewardRepository.findOne({
    userId,
    rewardId: reward.id,
  });
  const userQuestionCombo = await questionComboRepository.findOne({ userId });

  let hasReward = false;
  let rewardLevel: string;
  if (userQuestionCombo.combo >= 15) {
    hasReward = true;
    rewardLevel = "gold";
  } else if (userQuestionCombo.combo >= 10) {
    hasReward = true;
    rewardLevel = "silver";
  } else if (userQuestionCombo.combo >= 5) {
    hasReward = true;
    rewardLevel = "bronze";
  }

  return await updateUserHasReward(
    userId,
    reward,
    userHasReward,
    hasReward,
    rewardLevel
  );
};

const getStepComboReward = async (userId) => {
  const stepComboRepository = getCustomRepository(StepComboRepository);
  const rewardRepository = getCustomRepository(RewardRepository);
  const userHasRewardRepository = getCustomRepository(UserHasRewardRepository);
  const rewardType = "STEP_COMBO_MEDAL";

  const reward = await rewardRepository.findOne({ type: rewardType });
  let userHasReward = await userHasRewardRepository.findOne({
    userId,
    rewardId: reward.id,
  });
  const userStepCombo = await stepComboRepository.findOne({ userId });

  let hasReward = false;
  let rewardLevel: string;
  if (userStepCombo.combo >= 5) {
    hasReward = true;
    rewardLevel = "gold";
  } else if (userStepCombo.combo >= 3) {
    hasReward = true;
    rewardLevel = "silver";
  } else if (userStepCombo.combo >= 2) {
    hasReward = true;
    rewardLevel = "bronze";
  }

  return await updateUserHasReward(
    userId,
    reward,
    userHasReward,
    hasReward,
    rewardLevel
  );
};

const getMedalRarityNumber = (level) => {
  const obj = {
    bronze: 1,
    silver: 2,
    gold: 3,
  };
  return obj[level];
};

const updateUserHasReward = async (
  userId: number,
  reward: Reward,
  userHasReward: UserHasReward,
  hasReward: boolean,
  rewardLevel: string
) => {
  const userHasRewardRepository = getCustomRepository(UserHasRewardRepository);

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
    } else {
      userHasReward = userHasRewardRepository.create({
        userId,
        rewardId: reward.id,
        level: rewardLevel,
      });
      userHasReward = await userHasRewardRepository.save(userHasReward);
    }
    return {
      reward,
      level: rewardLevel,
    };
  }
};
