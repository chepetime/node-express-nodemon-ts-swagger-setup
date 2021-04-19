import { Application } from "express";
import { OpenApi } from "ts-openapi";

import {
  CommonRoutesConfig,
  configureRoutes,
} from "@/common/common.routes.config";

import { UsersMiddleware } from "@/modules/users/middlewares/users.middleware";
import { UsersController } from "@/modules/users/controllers/users.controller";
import { UserDocs } from "@/modules/users/docs/user.docs";

export class UsersRoutes extends CommonRoutesConfig implements configureRoutes {
  constructor(app: Application, openApi: OpenApi) {
    super(app, "UsersRoute", openApi);
    this.configureRoutes();
  }

  configureRoutes() {
    const usersController = new UsersController();
    const usersMiddleware = UsersMiddleware.getInstance();
    const userDocs = new UserDocs();

    this.app.get(`/users`, [usersController.listUsers]);

    this.app.post(`/users`, [
      usersMiddleware.validateRequiredCreateUserBodyFields,
      usersMiddleware.validateSameEmailDoesntExist,
      usersController.createUser,
    ]);

    this.app.put(`/users/:userId`, [
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.put,
    ]);

    this.app.patch(`/users/:userId`, [
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.patch,
    ]);

    this.app.delete(`/users/:userId`, [
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.removeUser,
    ]);

    this.app.get(`/users/:userId`, [
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.getUserById,
    ]);

    this.openApi.addPath(
      "/users",
      {
        get: userDocs.listUsers,
        post: userDocs.createUser,
      },
      true
    );

    this.openApi.addPath(
      "/users/:userId",
      {
        get: userDocs.getUserById,
      },
      true
    );
  }
}
