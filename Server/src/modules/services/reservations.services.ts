import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { ReservationDto } from "../dtos/reservation/reservation.dto";
import { ReservationQueryOptionsDto } from "../dtos/reservation/reservationOptions.dto";
import * as uuid from "uuid";
import { ReservationsRepository } from "../repositories/reservations.repository";

export class ReservationsServices {
  public static async getAll(options: ReservationQueryOptionsDto): Promise<ReservationDto[]> {
    const reservations: ReservationDto[] = await ReservationsRepository.getAll(options);

    if (reservations.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }
    return reservations;
  }

  public static async getById(id: string): Promise<ReservationDto> {
    const reservation = await ReservationsRepository.getById(id);

    if (!reservation) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }

    return reservation;
  }

  public static async create(reservation: ReservationDto): Promise<string> {
    //TO DO
    //verificar id do facility
    //verificar id dos usuários se estes estão ativos
    //verificar datas
    //adicionar verificação de regras de negócio
    reservation.reservationId = uuid.v4();
    await ReservationsRepository.create(reservation);
    return reservation.reservationId;
  }

  public static async update(reservationUpdated: ReservationDto): Promise<void> {
    
    const reservation = await this.getById(reservationUpdated.reservationId!);
    //TO DO
    //adicionar verificação de regras de negócio
    reservation.update(reservationUpdated);

    await ReservationsRepository.update(reservation);
  }

  public static async delete(id: string): Promise<void> {
    const reservation = await this.getById(id);
    console.log(reservation);
    //TO DO
    //adicionar verificação de regras de negócio
    await ReservationsRepository.delete(id);
  }
  //TO DO
  //criar métodos privados de verificação de reserva
}