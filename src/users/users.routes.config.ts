import { Application } from "express";
import { OpenApi, textPlain, Types, bodySchema } from "ts-openapi";

import {
  CommonRoutesConfig,
  configureRoutes,
} from "../common/common.routes.config";

import { UsersController } from "./controllers/users.controller";
import { UsersSwagger } from "./user.swagger";

export class UsersRoutes extends CommonRoutesConfig implements configureRoutes {
  constructor(app: Application, openApi: OpenApi) {
    super(app, "UsersRoute", openApi);
    this.configureRoutes();
  }
  configureRoutes() {
    const usersController = new UsersController();
    const usersswagger = new UsersSwagger();

    this.app.get(`/users`, [usersController.listUsers]);

    this.app.post(`/users`, [usersController.createUser]);

    this.app.put(`/users/:userId`, [usersController.put]);

    this.app.patch(`/users/:userId`, [usersController.patch]);

    this.app.delete(`/users/:userId`, [usersController.removeUser]);

    this.app.get(`/users/:userId`, [usersController.getUserById]);

    this.openApi.addPath(
      "/users",
      {
        get: usersswagger.listUsers,
        post: usersswagger.createUser,
      },
      true
    );

    this.openApi.addPath(
      "/users/:userId",
      {
        get: usersswagger.getUserById,
      },
      true
    );
  }
}
