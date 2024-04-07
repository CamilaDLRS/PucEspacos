import express from "express"
import { BuildingsController } from "../../../modules/controllers/buildings.controller";

const buildingRouter = express.Router();

buildingRouter.get(
  "/",
  BuildingsController.getAll
);

export default buildingRouter;