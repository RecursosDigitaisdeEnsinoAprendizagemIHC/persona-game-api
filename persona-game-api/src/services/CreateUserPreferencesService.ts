import { getCustomRepository } from "typeorm";
import { PreferenceTypeSeed } from "../database/seeds/preference_type.seed";
import { PreferenceTypeRepository } from "../repositories/PreferenceTypeRepository";

import { UserPreferencesRepository } from "../repositories/UserPreferencesRepository";

export const createUserPreferencesService = async (userId: number):Promise<void> => {
  const userPreferencesRepository = getCustomRepository(UserPreferencesRepository);
  const preferenceTypeRepository = getCustomRepository(PreferenceTypeRepository);

  const defaultUserPreferences = {
    userId
  }

  const userPreferences = await userPreferencesRepository.create(defaultUserPreferences);
  await userPreferencesRepository.save(userPreferences);

  const defaultPreferenceTypes = PreferenceTypeSeed.map(preferenceType => ({
    ...preferenceType,
    userPreferenceId: userPreferences.id
  }))

  const preferenceType = await preferenceTypeRepository.create(defaultPreferenceTypes);
  await preferenceTypeRepository.save(preferenceType);
};
