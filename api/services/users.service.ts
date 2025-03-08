import { UsersPostSchema } from "../schemas/users.schema";
import { saltRounds } from "../utils/constants";
import bcrypt from "bcrypt";
import { genericError } from "../utils/error.middleware";
import { USER_DUPLICATED_USER } from "../utils/messages/users.messages";
import { usersRepository } from "../repositories/users.repository";

async function createUser(userPayload: UsersPostSchema) {
  const dbUser = await usersRepository.getOneByEmail(userPayload.email);

  if (dbUser) {
    return genericError(USER_DUPLICATED_USER);
  }

  const hash = await bcrypt.hash(userPayload.password, saltRounds);
  const newUser = await usersRepository.createUser({
    ...userPayload,
    password: hash,
    active: true,
  });

  return newUser;
}

export const userService = {
  createUser,
};
