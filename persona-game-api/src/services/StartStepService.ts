import { getCustomRepository } from "typeorm";

import { UserFinishedStepRepository } from "../repositories/UserFinishedStepRepository";
import { UserStepsLogRepository } from "../repositories/UserStepsLogRepository";
import { notFoundError } from "./helpers/erros";
import { success } from "./helpers/success";

export const startStepService = async (userId: number, stepId: number) => {
  const userStepsLogRepository = getCustomRepository(UserStepsLogRepository);
  const userFinishedStepRepository = getCustomRepository(
    UserFinishedStepRepository
  );

  const lastFinishedStep = await userFinishedStepRepository.findLastStepByUser(
    userId
  );
  if (lastFinishedStep && stepId > lastFinishedStep.stepId + 1) {
    return notFoundError('Passos')
  }

  await userStepsLogRepository.update({ userId }, { current_step: false });

  const user = userStepsLogRepository.create({
    userId,
    stepId,
    current_step: true,
  });

  await userStepsLogRepository.save(user);
  return success({success: 'ok'})
};
