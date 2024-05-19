import express from "express"
import { BuildingsController } from "../../../modules/controllers/buildings.controller";

const buildingsRouter = express.Router();

buildingsRouter.get(
  "/",
  BuildingsController.getAll
);

buildingsRouter.get(
  "/:id/:facilities?",
  BuildingsController.getById
);

export default buildingsRouter;