import express from "express";
import { CampusesController } from "../../../modules/controllers/campuses.controller";

const campusesRouter = express.Router();

campusesRouter.get(
  "/",
  CampusesController.getAll
);

export default campusesRouter;