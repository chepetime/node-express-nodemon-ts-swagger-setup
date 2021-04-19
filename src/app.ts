require("module-alias/register");

import express, { Application, Request, Response } from "express";
import * as http from "http";

import config from "@/config";

import { CommonRoutesConfig } from "@/common/common.routes.config";
import { UsersRoutes } from "@/modules/users/users.routes.config";
import { initOpenApi, openApiInstance } from "@/openapi";

const PORT = config.PORT || 3000;
const app: Application = express();
const server: http.Server = http.createServer(app);

const routes: any = [];

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

routes.push(new UsersRoutes(app, openApiInstance));

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send(`Server running at port ${PORT}`);
});

initOpenApi(app, openApiInstance);

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
  routes.forEach((route: CommonRoutesConfig) => {
    console.log(`Routes configured for: ${route.getName()}`);
  });
});

export default app;
