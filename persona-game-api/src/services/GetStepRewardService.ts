import { getCustomRepository } from "typeorm";
import { Reward } from "../entities/Reward";

import { RewardRepository } from "../repositories/RewardRepository";
import { StepRepository } from "../repositories/StepRepository";
import { UserHasRewardRepository } from "../repositories/UserHasRewardRepository";

const REWARD_BY_STEP = {
  "1:1": ["Identidade"],
  "1:2": ["Objetivos"],
  "1:3": ["Habilidades"],
  "2:1": ["Tarefas"],
  "2:2": ["Relacionamento"],
  "2:3": ["Requisitos", "Expectativas"],
};

export const getStepRewardService = async (userId, stepId) => {
  const rewardRepository = getCustomRepository(RewardRepository);
  const stepRepository = getCustomRepository(StepRepository);

  const rewards = [];
  const step = await stepRepository.findStepWithPhase(stepId);
  const phaseStep = `${step.phase.number}:${step.number}`;

  for (const rewardName of REWARD_BY_STEP[phaseStep]) {
    const reward = await rewardRepository.findOne({ name: rewardName });
    await updateUserHasReward(userId, reward);
    rewards.push({ reward, level: null });
  }

  return rewards;
};

const updateUserHasReward = async (userId: number, reward: Reward) => {
  const userHasRewardRepository = getCustomRepository(UserHasRewardRepository);

  let userHasReward = await userHasRewardRepository.findOne({
    userId,
    rewardId: reward.id,
  });

  if (!userHasReward) {
    userHasReward = userHasRewardRepository.create({
      userId,
      rewardId: reward.id,
    });
    userHasReward = await userHasRewardRepository.save(userHasReward);
  }
};
