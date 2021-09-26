import { getCustomRepository } from "typeorm";

import { RewardRepository } from "../repositories/RewardRepository";
import { StepRepository } from "../repositories/StepRepository";

const REWARD_BY_STEP = {
  "1:1": ["Identidade"],
  "1:2": ["Objetivos"],
  "1:3": ["Habilidades"],
  "2:1": ["Tarefas"],
  "2:2": ["Relacionamento"],
  "2:3": ["Requisitos", "Expectativas"],
};

export const getStepRewardService = async (stepId) => {
  const rewardRepository = getCustomRepository(RewardRepository);
  const stepRepository = getCustomRepository(StepRepository);

  const rewards = [];
  const step = await stepRepository.findStepWithPhase(stepId);
  const phaseStep = `${step.phase.number}:${step.number}`;

  for (let rewardName of REWARD_BY_STEP[phaseStep]) {
    const reward = await rewardRepository.findOne({ name: rewardName });
    rewards.push(reward);
  }

  return rewards;
};
