import { getCustomRepository } from "typeorm";

import { UserFinishedStepRepository } from "../repositories/UserFinishedStepRepository";
import { success } from "./helpers/success";
import { ServiceResponseInterface } from "./protocols/ServiceResponseInterface";

export const userFinishedStepService = async (userId): Promise<ServiceResponseInterface> => {
  const userFinishedStepRepository = getCustomRepository(
    UserFinishedStepRepository
  );

  const userFinishedSteps = await userFinishedStepRepository.findAllByUser(
    userId
  );

  return success(userFinishedSteps);
};
