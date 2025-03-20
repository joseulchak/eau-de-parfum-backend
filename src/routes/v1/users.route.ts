import { Router, Request, Response, NextFunction } from "express";
import authenticationMiddleware from "../../utils/authentication.middleware";
import { parseSchema } from "../../utils/parseSchema";
import { usersPostSchema } from "../../schemas/users.schema";
import { userService } from "../../services/users.service";

const router = Router();

router.post(
  "",
  authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = await parseSchema(usersPostSchema, req.body);
    const response = await userService.createUser(payload);
    res.send(response);
  },
);

export default router;
