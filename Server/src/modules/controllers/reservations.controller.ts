import { ExpressHandlers } from "../../shared/utils/expressHandles";
import { Request, Response } from "express";
import { ReservationsServices } from "../services/reservations.services";
import { ReservationDto } from "../dtos/reservation/reservation.dto";
import { ReservationQueryOptionsDto } from "../dtos/reservation/reservationOptions.dto";
import { ReservationPurpose } from "../enums/reservationPurpose.enum";

export class ReservationsController {

  public static async getAll(req: Request, res: Response) {
    try {
      const options: ReservationQueryOptionsDto = new ReservationQueryOptionsDto(req.body);
      const reservations: ReservationDto[] = await ReservationsServices.getAll(options);

      await ExpressHandlers.handleResponse(req, res, reservations);
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const reservation: ReservationDto = await ReservationsServices.getById(id);

      await ExpressHandlers.handleResponse(req, res, reservation);
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      let reservation: ReservationDto = new ReservationDto(req.body);
      const newReservationId: string = await ReservationsServices.create(reservation);

      reservation = await ReservationsServices.getById(newReservationId);

      await ExpressHandlers.handleResponse(req, res, reservation, "Reserva criada com sucesso!");
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      let reservation: ReservationDto = new ReservationDto({ ...req.body, reservationId: req.params.id });
      await ReservationsServices.update(reservation);

      reservation = await ReservationsServices.getById(req.params.id);

      await ExpressHandlers.handleResponse(req, res, reservation, "Reserva editada com sucesso!");
    } catch (error) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      let reservationId = String(req.params.id);
      let userId = String(req.query.userId);
      await ReservationsServices.delete(reservationId, userId);

      await ExpressHandlers.handleResponse(req, res, null, "Reserva excluida com sucesso!");
    } catch (error) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async getAllPurposes(req: Request, res: Response) {
    try {
      const reservationPurposes: string[] = Object.values(ReservationPurpose);

      await ExpressHandlers.handleResponse(req, res, reservationPurposes);
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }
}