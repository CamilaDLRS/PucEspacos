import express from "express";
import { FacilityTypesController } from "../../../modules/controllers/facilityTypes.controller";

const facilityTypeRouter = express.Router();

facilityTypeRouter.get(
  "/",
  FacilityTypesController.getAll
)

export default facilityTypeRouter;