import { getCustomRepository } from "typeorm";

import { UserFinishedStepRepository } from "../repositories/UserFinishedStepRepository";

export const userFinishedStepService = async (userId) => {
  const userFinishedStepRepository = getCustomRepository(
    UserFinishedStepRepository
  );

  const availableSteps = await userFinishedStepRepository.findAllByUser(userId);

  return availableSteps;
};
