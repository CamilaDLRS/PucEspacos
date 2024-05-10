import express from "express";
import { ReservationsController } from "../../../modules/controllers/reservations.controller";

const reservationsRouter = express.Router();

reservationsRouter.get(
  "/available-facilities",
  ReservationsController.getAvailableFacilities
);

reservationsRouter.get(
  "/:id",
  ReservationsController.getById
);

reservationsRouter.get(
  "/",
  //TO DO
  //criar schema
  //ValidationMiddleware.validateRequest(getReservationsSchema),
  ReservationsController.getAll
);

reservationsRouter.post(
  "/",
  //TO DO
  //criar schema
  //ValidationMiddleware.validateRequest(createReservationSchema),
  ReservationsController.create
);

reservationsRouter.put(
  "/:id",
  //TO DO
  //criar schema
  //ValidationMiddleware.validateRequest(updateReservationSchema),
  ReservationsController.update
);

reservationsRouter.delete(
  "/:id",
  //TO DO
  //verificar de adicionar middleware geral de verificação do usuário, por mais que seja simples
  ReservationsController.delete
);


export default reservationsRouter;
