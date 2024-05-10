import express from "express";
import { ReservationsController } from "../../../modules/controllers/reservations.controller";

const reservationsRouter = express.Router();


reservationsRouter.get(
  "/:id",
  ReservationsController.getById
);

reservationsRouter.get(
  "/",
  ReservationsController.getAll
);

reservationsRouter.post(
  "/",
  //ValidationMiddleware.validateRequest(createReservationSchema),
  ReservationsController.create
);

reservationsRouter.put(
  "/:id",
  //ValidationMiddleware.validateRequest(updateReservationSchema),
  ReservationsController.update
);

reservationsRouter.delete(
  "/:id",
  //adicionar claims?
  ReservationsController.delete
);


export default reservationsRouter;
