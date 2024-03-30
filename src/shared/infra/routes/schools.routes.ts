import express from "express"
import { SchoolsController } from "../../../modules/controllers/schools.controller";

const schoolsRouter = express.Router();

schoolsRouter.get(
  "/",
  SchoolsController.getAll
)

export default schoolsRouter;