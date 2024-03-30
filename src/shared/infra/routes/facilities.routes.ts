import express from "express";
import { FacilitiesController } from "../../../modules/controllers/facilities.controller";

const facilityRouter = express.Router();

facilityRouter.get(
  "/:id",
  FacilitiesController.getById
);

facilityRouter.get(
  "/",
  FacilitiesController.getAll
);

facilityRouter.post(
  "/",
  FacilitiesController.create
);

facilityRouter.put(
  "/",
  FacilitiesController.update
);

export default facilityRouter;
