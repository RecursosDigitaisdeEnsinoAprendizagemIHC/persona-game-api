import { getCustomRepository } from "typeorm";

import { UserStepsLogRepository } from "../repositories/UserStepsLogRepository";

export const startStepService = async (userId, stepId) => {
  const userStepsLogRepository = getCustomRepository(UserStepsLogRepository);

  await userStepsLogRepository.update({ userId }, { current_step: false });

  const user = userStepsLogRepository.create({
    userId,
    stepId,
    current_step: true,
  });

  await userStepsLogRepository.save(user);
};
