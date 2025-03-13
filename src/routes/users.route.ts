import { Router, Request, Response, NextFunction } from "express";

import { BASE_URL } from "../utils/constants";
import { parseSchema } from "../utils/parseSchema";
import { usersPostSchema } from "../schemas/users.schema";
import authenticationMiddleware from "../utils/authentication.middleware";
import { userService } from "../services/users.service";

const router = Router();

router.post(
  `${BASE_URL}/user`,
  authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = await parseSchema(usersPostSchema, req.body);
    const response = await userService.createUser(payload);
    res.send(response);
  },
);

export default router;
