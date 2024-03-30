import *  as uuid from 'uuid';
import { ReservationStatus } from '../enums/reservationStatus.enum';
import { ReservationPurpose } from '../enums/reservationPurpose.enum';

export class Reservation {

  reservationId: string;
  responsibleUserId: string;
  requestingUserId: string;
  facilityId: string;
  reservationStatus: ReservationStatus;
  reservationPurpose: ReservationPurpose;
  checkinDate: Date;
  checkoutDate: Date;

  createdDate: Date;
  updatedDate: Date;

  constructor(
    responsibleUserId: string,
    requestingUserId: string,
    facilityId: string,
    reservationStatus: ReservationStatus,
    reservationPurpose: ReservationPurpose,
    checkinDate: Date,
    checkoutDate: Date,
    reservationId?: string,
    createdDate?: Date,
    updatedDate?: Date
  ) {
    this.responsibleUserId = responsibleUserId,
      this.requestingUserId = requestingUserId,
      this.facilityId = facilityId,
      this.reservationStatus  = reservationStatus,
      this.reservationPurpose = reservationPurpose,
      this.checkinDate = checkinDate,
      this.checkoutDate = checkoutDate,

      this.reservationId = reservationId || uuid.v4();
    this.createdDate = createdDate || new Date();
    this.updatedDate = updatedDate || new Date();
  }

  static fromDataRow(dataRow: any): Reservation {
    return new Reservation(
      dataRow.usuario_responsavel_id,
      dataRow.usuario_solicitante_id,
      dataRow.espaco_id,
      dataRow.status_reserva,
      dataRow.finalidade,
      dataRow.data_hora_inicio_reserva,
      dataRow.data_hora_fim_reserva,

      dataRow.reserva_id,
      new Date(dataRow.data_hora_criacao),
      new Date(dataRow.data_hora_alteracao)
    );
  }

  static fromBody(body: any): Reservation {
    return new Reservation(
      body.responsibleUser,
      body.requestingUser,
      body.facilityId,
      body.reservationStatus,
      body.reservationPurpose,
      body.checkinDate,
      body.checkoutDate
    )
  }
}