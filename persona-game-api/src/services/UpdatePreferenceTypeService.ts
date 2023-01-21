import { getCustomRepository } from "typeorm";

import { PreferenceTypeRepository } from "../repositories/PreferenceTypeRepository";
import { updateError } from "./helpers/erros";
import { success } from "./helpers/success";
import { ServiceResponseInterface } from "./protocols/ServiceResponseInterface";

export const updatePreferenceTypeService = async (id: number, value: string):Promise<ServiceResponseInterface> => {
  try {
    const preferenceTypeRepository = getCustomRepository(PreferenceTypeRepository);
    await preferenceTypeRepository.update(id, {value});

    return success({ success: true });
  } catch (error) {
    return updateError('preferência')
  }
};
