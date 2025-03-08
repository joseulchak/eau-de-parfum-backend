import { UsersPostSchema } from "../schemas/users.schema";
import { saltRounds } from "../utils/constants";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

async function createUser(userPayload: UsersPostSchema) {
  const hash = await bcrypt.hash(userPayload.password, saltRounds);
  const prisma = new PrismaClient();
  const newUser = await prisma.users.create({
    data: {
      ...userPayload,
      password: hash,
      active: true,
    },
  });
  return newUser;
}

export const userService = {
  createUser,
};
