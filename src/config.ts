// config.js
const dotenv = require("dotenv").config();

export type Environment = {
  NODE_ENV: string;
  HOST: string;
  PORT: number;
  JWT_SECRET: string;
};

export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 3000,
};
