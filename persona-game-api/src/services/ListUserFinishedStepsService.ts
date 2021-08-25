import { getCustomRepository } from "typeorm";

import { UserFinishedStepRepository } from "../repositories/UserFinishedStepRepository";

export const userFinishedStepService = async (userId) => {
  const userFinishedStepRepository = getCustomRepository(
    UserFinishedStepRepository
  );

  const userFinishedSteps = await userFinishedStepRepository.findAllByUser(
    userId
  );

  return userFinishedSteps;
};
