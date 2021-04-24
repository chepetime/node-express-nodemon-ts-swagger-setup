import { Application } from "express";
import { OpenApi } from "ts-openapi";

import {
  CommonRoutesConfig,
  configureRoutes,
} from "@/common/common.routes.config";

import { AuthController } from "@/modules/auth/controllers/auth.controller";
import { AuthMiddleware } from "@/modules/auth/middlewares/auth.middleware";
import { JwtMiddleware } from "@/modules/auth/middlewares/jwt.middleware";
import { AuthDocs } from "@/modules/auth/docs/auth.docs";

export class AuthRoutes extends CommonRoutesConfig implements configureRoutes {
  constructor(app: Application, openApi: OpenApi) {
    super(app, "AuthRoute", openApi);
    this.configureRoutes();
  }

  configureRoutes() {
    const usersController = new AuthController();
    const authMiddleware = AuthMiddleware.getInstance();
    const jwtMiddleware = JwtMiddleware.getInstance();
    const authDocs = new AuthDocs();

    /**
     *
     */
    this.app.post(`/auth`, [
      authMiddleware.validateBodyRequest,
      authMiddleware.verifyUserPassword,
      usersController.createJWT,
    ]);

    /**
     *
     */
    this.app.post(`/auth/refresh-token`, [
      jwtMiddleware.validJWTNeeded,
      jwtMiddleware.verifyRefreshBodyField,
      jwtMiddleware.validRefreshNeeded,
      usersController.createJWT,
    ]);

    /**
     * Docs
     */

    this.openApi.addPath(
      "/auth",
      {
        post: authDocs.generateJWT,
      },
      true
    );

    this.openApi.addPath(
      "/auth/refresh-token",
      {
        post: authDocs.refreshJWT,
      },
      true
    );

    // EOC
  }
}
