import { getCustomRepository } from "typeorm";

import { PhaseRepository } from "../repositories/PhaseRepository";
import { notFoundError } from "./helpers/erros";
import { success } from "./helpers/success";
import { ServiceResponseInterface } from "./protocols/ServiceResponseInterface";

export const listPhasesService = async (): Promise<ServiceResponseInterface> => {
  const phaseRepository = getCustomRepository(PhaseRepository);
  const phases = await phaseRepository.findAll();
  if(!phases){
    return notFoundError('Fases')
  }

  return success(phases);
};
