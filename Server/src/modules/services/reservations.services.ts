import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { ReservationDto } from "../dtos/reservation/reservation.dto";
import { ReservationQueryOptionsDto } from "../dtos/reservation/reservationOptions.dto";
import * as uuid from "uuid";
import { ReservationsRepository } from "../repositories/reservations.repository";
import { FacilityAvailabilityQuery } from "../dtos/facility/facilityAvailabilityQuery.dto";
import { FacilityDto } from "../dtos/facility/facility.dto";

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

  public static async getAvailableFacilities(query: FacilityAvailabilityQuery): Promise<FacilityDto[]> {
    //TO DO
    //pesquisa todas as reservas do periodo da query
    //mapear apenas os facilityIds
    //busca todos os facilitys que não estão nesta lista

    throw new ApiError(500, InternalCode.NOT_IMPLEMENTED);   
  }

  public static async create(reservation: ReservationDto): Promise<string> {
    //TO DO
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