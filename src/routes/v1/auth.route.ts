import { Router, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { PrismaClient, users } from "@prisma/client";
import { secretKey } from "../../utils/constants";
import { genericError } from "../../utils/error.middleware";
import { GEN_UNAUTHORIZED } from "../../utils/messages/messages";
import { authService } from "../../services/auth.service";

const router = Router();

router.post("", async (req: Request, res: Response) => {
  const { username, pwd } = req.body as { username: string; pwd: string };

  const { refreshToken, accessToken } = await authService.authenticateUser(
    username,
    pwd,
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.send({ accessToken });
});

router.post("/refresh", async (req: Request, res: Response) => {
  if (!req.cookies?.jwt) {
    return genericError(GEN_UNAUTHORIZED);
  }

  const refreshToken = req.cookies.jwt;

  const accessToken = await authService.refreshToken(refreshToken);
  res.send({ accessToken });
});

export default router;
