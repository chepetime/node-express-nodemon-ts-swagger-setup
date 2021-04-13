import express, { Application } from "express";
import { OpenApi } from "ts-openapi";

export class CommonRoutesConfig {
  app: Application;
  name: string;
  openApi: OpenApi;

  constructor(app: Application, name: string, openApi: OpenApi) {
    this.app = app;
    this.name = name;
    this.openApi = openApi;
  }

  getName() {
    return this.name;
  }
}

export interface configureRoutes {}
