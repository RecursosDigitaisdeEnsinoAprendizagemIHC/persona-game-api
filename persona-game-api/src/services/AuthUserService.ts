import { getCustomRepository } from "typeorm";
import moment from "moment";

import { UserRepository } from "../repositories/UserRepository";

export const authUserService = async (userId: number) => {
  const userRepository = getCustomRepository(UserRepository);

  const now = moment().format("YYYY-MM-DD hh:mm:ss");
  await userRepository.update(userId, { last_login: now });
};
