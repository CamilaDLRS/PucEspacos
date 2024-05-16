import express from "express"
import { BuildingsController } from "../../../modules/controllers/buildings.controller";

const buildingsRouter = express.Router();

buildingsRouter.get(
  "/",
  BuildingsController.getAll
);

buildingsRouter.get(
  ":id",
  BuildingsController.getById
);

export default buildingsRouter;