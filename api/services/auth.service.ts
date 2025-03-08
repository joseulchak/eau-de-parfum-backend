import { users } from "@prisma/client";
import { usersRepository } from "../repositories/users.repository";
import { secretKey } from "../utils/constants";
import { genericError } from "../utils/error.middleware";
import {
  GEN_INVALID_CREDENTIALS,
  GEN_UNAUTHORIZED,
} from "../utils/messages/messages";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

async function authenticateUser(
  email: string,
  payloadPassword: string,
): Promise<{ accessToken: string; refreshToken: string }> {
  const user = await usersRepository.getOneByEmailAndActive(email);

  const pwdMatch = await bcrypt.compare(payloadPassword, user?.password ?? "");
  if (!user || !pwdMatch) {
    genericError(GEN_INVALID_CREDENTIALS);
  }
  const { password, ...userWithoutPassword } = user!;
  const accessToken = generateAccessToken(userWithoutPassword);
  const refreshToken = generateRefreshToken(user!.id);

  return { accessToken, refreshToken };
}

async function refreshToken(refreshToken: string): Promise<string> {
  let accessToken = "";
  await jwt.verify(
    refreshToken,
    secretKey,
    async (err: VerifyErrors | null, decoded: any) => {
      if (err || !decoded) {
        genericError(GEN_UNAUTHORIZED);
      }

      const user = await usersRepository.getOneByIdAndActive(decoded.id);

      if (!user) {
        return genericError(GEN_UNAUTHORIZED);
      }

      const { password, ...userWithoutPassword } = user;
      accessToken = generateAccessToken(userWithoutPassword);
    },
  );
  return accessToken;
}

function generateAccessToken(userData: Omit<users, "password">) {
  return jwt.sign(userData, secretKey, { expiresIn: "90d" });
}
function generateRefreshToken(userId: number) {
  return jwt.sign({ userId }, secretKey, { expiresIn: "90d" });
}

export const authService = {
  authenticateUser,
  refreshToken,
};
