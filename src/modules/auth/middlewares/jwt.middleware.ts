import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

import config from "@/config";
const jwtSecret = config.JWT_SECRET;

const MESSAGES = {
  empty: "Need body field: refreshToken",
  invalid: "Invalid refresh token",
};

export class JwtMiddleware {
  private static instance: JwtMiddleware;

  static getInstance() {
    if (!JwtMiddleware.instance) {
      JwtMiddleware.instance = new JwtMiddleware();
    }
    return JwtMiddleware.instance;
  }

  verifyRefreshBodyField(req: Request, res: Response, next: NextFunction) {
    if (req.body && req.body.refreshToken) {
      return next();
    } else {
      return res.status(400).send({ error: MESSAGES.empty });
    }
  }

  validRefreshNeeded(req: any, res: Response, next: NextFunction) {
    const refreshTokenbRaw = Buffer.from(req.body.refreshToken, "base64");
    const refreshToken = refreshTokenbRaw.toString();
    const hash = crypto
      .createHmac("sha512", req.jwt.refreshKey)
      .update(req.jwt.userId + jwtSecret)
      .digest("base64");

    if (hash === refreshToken) {
      delete req.jwt.iat;
      delete req.jwt.exp;
      req.body = req.jwt;
      return next();
    } else {
      return res.status(400).send({ error: MESSAGES.invalid });
    }
  }

  validJWTNeeded(req: any, res: Response, next: NextFunction) {
    if (req.headers["authorization"]) {
      try {
        const authorization = req.headers["authorization"].split(" ");
        if (authorization[0] !== "Bearer") {
          return res.status(401).send();
        } else {
          req.jwt = jwt.verify(authorization[1], jwtSecret);
          next();
        }
      } catch (err) {
        return res.status(403).send();
      }
    } else {
      return res.status(401).send();
    }
  }
}
