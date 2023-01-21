import { getCustomRepository } from "typeorm";

import { UserPreferencesRepository } from "../repositories/UserPreferencesRepository";
import { success } from "./helpers/success";
import { ServiceResponseInterface } from "./protocols/ServiceResponseInterface";

export const getUserPreferencesService = async (userId: number):Promise<ServiceResponseInterface> => {
  const userPreferencesRepository = getCustomRepository(UserPreferencesRepository);
  const userPreferences = await userPreferencesRepository.findPreferencesByUserId(userId);

  return success(userPreferences);
};
