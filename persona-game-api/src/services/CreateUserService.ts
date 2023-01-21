import { getCustomRepository } from "typeorm";
import { sign } from "jsonwebtoken";

import { UserRepository } from "../repositories/UserRepository";
import { success } from "./helpers/success";
import { ServiceResponseInterface } from "./protocols/ServiceResponseInterface";
import { createUserPreferencesService } from "./CreateUserPreferencesService";

export const createUserService = async (): Promise<ServiceResponseInterface> => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.create({});
  await userRepository.save(user);

  await createUserPreferencesService(user.id)

  const token = sign(
    {
      id: user.id
    },
    process.env.AUTH_SECRET,
    {
      subject: user.id.toString(),
    }
  );

  return success(token);
}
