import { getCustomRepository } from "typeorm";

import { UserFinishedStepRepository } from "../repositories/UserFinishedStepRepository";
import { UserStepsLogRepository } from "../repositories/UserStepsLogRepository";

export const startStepService = async (userId: number, stepId: number) => {
  const userStepsLogRepository = getCustomRepository(UserStepsLogRepository);
  const userFinishedStepRepository = getCustomRepository(
    UserFinishedStepRepository
  );

  const lastFinishedStep = await userFinishedStepRepository.findLastStepByUser(
    userId
  );
  if (lastFinishedStep && stepId > lastFinishedStep.stepId + 1) {
    throw new Error("You don't have this step unlocked yet!");
  }

  await userStepsLogRepository.update({ userId }, { current_step: false });

  const user = userStepsLogRepository.create({
    userId,
    stepId,
    current_step: true,
  });

  await userStepsLogRepository.save(user);
};
