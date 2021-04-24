import { Request, Response } from "express";

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

import config from "@/config";
const jwtSecret = config.JWT_SECRET;
const tokenExpirationInSeconds = 3600;

export class AuthController {
  constructor() {}

  async createJWT(req: Request, res: Response) {
    try {
      const refreshId = req.body.userId + jwtSecret;
      const salt = crypto.randomBytes(16).toString("base64");
      const hash = crypto
        .createHmac("sha512", salt)
        .update(refreshId)
        .digest("base64");
      req.body.refreshKey = salt;

      const token = jwt.sign(req.body, jwtSecret, {
        expiresIn: tokenExpirationInSeconds,
      });
      const refreshTokenRaw = Buffer.from(hash);
      const refreshToken = refreshTokenRaw.toString("base64");

      return res
        .status(201)
        .send({ accessToken: token, refreshToken: refreshToken });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}
