import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from "./config/swagger.json";
import { Routes } from "./config/routes";

class App {
  public app: express.Application;
  public routes: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.routes.routes(this.app);
  }

  private config(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(bodyParser());
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

export default new App().app;