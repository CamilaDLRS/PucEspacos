import express from "express";
import { ReservationsController } from "../../../modules/controllers/reservations.controller";
import { ValidationMiddleware } from "../../utils/validationMiddleware";
import { createReservationSchema, deleteReservationSchema, getReservationSchema, updateReservationSchema } from "../../../modules/schemas/reservation.schemas";

const reservationsRouter = express.Router();

reservationsRouter.post(
  "/query",
  ValidationMiddleware.validateRequest(getReservationSchema),
  ReservationsController.getAll
);

reservationsRouter.get(
  "/purposes",
  ReservationsController.getAllPurposes
);

reservationsRouter.get(
  "/:id",
  ReservationsController.getById
);

reservationsRouter.post(
  "/",
  ValidationMiddleware.validateRequest(createReservationSchema),
  ReservationsController.create
);

reservationsRouter.put(
  "/:id",
  ValidationMiddleware.validateRequest(updateReservationSchema),
  ReservationsController.update
);


reservationsRouter.delete(
  "/:id",
  ValidationMiddleware.validateRequest(deleteReservationSchema),
  ReservationsController.delete
)

export default reservationsRouter;