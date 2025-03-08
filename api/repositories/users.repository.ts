import { PrismaClient, users } from "@prisma/client";
async function getOneByEmailAndActive(email: string): Promise<users | null> {
  const prisma = new PrismaClient();
  return await prisma.users.findFirst({
    where: {
      email,
      active: true,
    },
  });
}

async function getOneByEmail(email: string): Promise<users | null> {
  const prisma = new PrismaClient();
  return await prisma.users.findFirst({
    where: {
      email,
      active: true,
    },
  });
}

async function getOneByIdAndActive(id: number): Promise<users | null> {
  const prisma = new PrismaClient();
  return await prisma.users.findFirst({
    where: {
      id,
    },
  });
}

// async function getOneByKey<T extends string | number>(
//   key: string,
//   value: T,
// ): Promise<users | null> {
//   const prisma = new PrismaClient();
//   return await prisma.users.findFirst({
//     where: {
//       [key]: value,
//     },
//   });
// }

async function createUser(user: Omit<users, "id">): Promise<users> {
  const prisma = new PrismaClient();
  return await prisma.users.create({
    data: {
      ...user,
    },
  });
}

export const usersRepository = {
  getOneByEmailAndActive,
  getOneByEmail,
  getOneByIdAndActive,
  createUser,
};
