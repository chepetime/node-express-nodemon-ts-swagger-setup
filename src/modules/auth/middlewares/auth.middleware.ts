import { Request, Response, NextFunction } from "express";
import { verify } from "argon2";

import { UsersService } from "@/modules/users/services/user.services";

const MESSAGES = {
  empty: "Missing body fields: email, password",
  invalid: "Invalid e-mail and/or password",
};

export class AuthMiddleware {
  private static instance: AuthMiddleware;

  static getInstance() {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
  }

  async validateBodyRequest(req: Request, res: Response, next: NextFunction) {
    if (req.body && req.body.email && req.body.password) {
      next();
    } else {
      res.status(400).send({ error: MESSAGES.empty });
    }
  }

  async verifyUserPassword(req: Request, res: Response, next: NextFunction) {
    const userService = UsersService.getInstance();
    const user: any = await userService.getByEmail(req.body.email);

    if (user) {
      const validPassword = await verify(user.password, req.body.password);

      if (validPassword) {
        req.body = {
          userId: user.id,
          email: user.email,
          provider: "email",
          permissionLevel: user.permissionLevel,
        };

        return next();
      } else {
        res.status(400).send({ errors: MESSAGES.invalid });
      }
    } else {
      res.status(400).send({ errors: MESSAGES.invalid });
    }
  }
}
