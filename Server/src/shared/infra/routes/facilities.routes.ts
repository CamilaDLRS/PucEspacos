import express from "express";
import { FacilitiesController } from "../../../modules/controllers/facilities.controller";
import { ValidationMiddleware } from "../../utils/validationMiddleware";
import { createFacilitySchema, updateFacilitySchema, updateStatusFacilitySchema } from "../../../modules/schemas/facility.schemas";

const facilityRouter = express.Router();


facilityRouter.get(
  "/types/",
  FacilitiesController.getAllTypes
)

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
  ValidationMiddleware.validateRequest(createFacilitySchema),
  FacilitiesController.create
);

facilityRouter.put(
  "/:id",
  ValidationMiddleware.validateRequest(updateFacilitySchema),
  FacilitiesController.update
);

facilityRouter.patch(
  "/:id",
  ValidationMiddleware.validateRequest(updateStatusFacilitySchema),
  FacilitiesController.updateStatus
);


export default facilityRouter;
