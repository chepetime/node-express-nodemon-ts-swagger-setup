import { Request, Response, NextFunction } from "express";

import { UsersService } from "@/modules/users/services/user.services";

export class UsersMiddleware {
  private static instance: UsersMiddleware;

  static getInstance() {
    if (!UsersMiddleware.instance) {
      UsersMiddleware.instance = new UsersMiddleware();
    }
    return UsersMiddleware.instance;
  }

  validateRequiredCreateUserBodyFields(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (req.body && req.body.email && req.body.password) {
      next();
    } else {
      res
        .status(400)
        .send({ error: `Missing required fields email and password` });
    }
  }

  async validateSameEmailDoesntExist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userService = UsersService.getInstance();
    const user = await userService.getByEmail(req.body.email);

    if (user) {
      res.status(400).send({ error: `User email already exists` });
    } else {
      next();
    }
  }

  async validateUserExists(req: Request, res: Response, next: NextFunction) {
    const userService = UsersService.getInstance();

    try {
      const user = await userService.readById(req.params.userId);

      if (user) {
        next();
      } else {
        res
          .status(404)
          .send({ error: `User ${req.params.userId} not found 2` });
      }
    } catch (error) {
      res.status(404).send({ error: `User ${req.params.userId} not found 2` });
    }
  }

  async extractUserId(req: Request, _res: Response, next: NextFunction) {
    req.body.id = req.params.userId;
    next();
  }
}
