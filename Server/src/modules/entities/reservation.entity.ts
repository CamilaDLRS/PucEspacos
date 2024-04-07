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
}