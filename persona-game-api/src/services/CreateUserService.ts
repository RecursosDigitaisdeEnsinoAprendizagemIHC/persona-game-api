import { getCustomRepository } from "typeorm";
import { sign } from "jsonwebtoken";

import { UserRepository } from "../repositories/UserRepository";

export const createUserService = async () => {
  const userRepository = getCustomRepository(UserRepository);

  const user = userRepository.create({});

  await userRepository.save(user);

  const token = sign(
    {
      id: user.id
    },
    process.env.AUTH_SECRET,
    {
      subject: user.id.toString(),
    }
  );

  return token;
}
