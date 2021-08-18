import { getCustomRepository } from "typeorm";

import { PhaseRepository } from "../repositories/PhaseRepository";

export const listPhasesService = async () => {
  const phaseRepository = getCustomRepository(PhaseRepository);

  const phases = await phaseRepository.findAll();

  return phases;
};
