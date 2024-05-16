import express from "express";
import { FacilitiesController } from "../../../modules/controllers/facilities.controller";
import { ValidationMiddleware } from "../../utils/validationMiddleware";
import { createFacilitySchema, getAvalableFacilitiesSchema, updateFacilitySchema, updateStatusFacilitySchema } from "../../../modules/schemas/facility.schemas";

const facilitiesRouter = express.Router();


facilitiesRouter.get(
  "/types/",
  FacilitiesController.getAllTypes
)

facilitiesRouter.post(
  "/availables",
  ValidationMiddleware.validateRequest(getAvalableFacilitiesSchema),
  FacilitiesController.getAvailables
);

facilitiesRouter.get(
  "/:id",
  FacilitiesController.getById
);

facilitiesRouter.get(
  "/",
  FacilitiesController.getAll
);

facilitiesRouter.post(
  "/",
  ValidationMiddleware.validateRequest(createFacilitySchema),
  FacilitiesController.create
);

facilitiesRouter.put(
  "/:id",
  ValidationMiddleware.validateRequest(updateFacilitySchema),
  FacilitiesController.update
);

facilitiesRouter.patch(
  "/:id",
  ValidationMiddleware.validateRequest(updateStatusFacilitySchema),
  FacilitiesController.updateStatus
);


export default facilitiesRouter;
