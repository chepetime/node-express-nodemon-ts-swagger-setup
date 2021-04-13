import { Application } from "express";
import { bearerAuth, OpenApi } from "ts-openapi";
import swaggerUi from "swagger-ui-express";

// create an OpenApi instance to store definitions
export const openApiInstance = new OpenApi(
  "v1.0",
  "KingTide Naval",
  "Describing how to keep APIs documented.",
  "jose@kingtide.com"
);

// declare servers for the API
openApiInstance.setServers([{ url: "http://localhost:8000" }]);

// set API license
openApiInstance.setLicense(
  "Apache License, Version 2.0", // API license name
  "http://www.apache.org/licenses/LICENSE-2.0", // API license url
  "http://dummy.io/terms/" // API terms of service
);

export function initOpenApi(app: Application, openApi: OpenApi) {
  const openApiJson = openApi.generateJson();

  app.get("/openapi.json", (_req, res) => {
    res.json(openApiJson);
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiJson));
}
