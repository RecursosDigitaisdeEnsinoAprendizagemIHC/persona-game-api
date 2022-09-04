import { getCustomRepository } from "typeorm";
import moment from "moment";

import { UserRepository } from "../repositories/UserRepository";
import { ServiceResponseInterface } from "./protocols/ServiceResponseInterface";
import { updateError } from "./helpers/erros";
import { success } from "./helpers/success";

export const authUserService = async (userId: number): Promise<ServiceResponseInterface> => {
  try {
    const userRepository = getCustomRepository(UserRepository);
    const now = moment().format("YYYY-MM-DD hh:mm:ss");
    await userRepository.update(userId, { last_login: now });
    return success({ success: true })
  } catch (error) {
    return updateError('usuário')
  }
  
};
