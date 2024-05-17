export class ReservationAvailabilityQueryOptionsDto {
  
  requestingUserId?: string;
  responsibleUserId?: string;
  facilityId?: string;
  reservationId?: string;

  checkinDate: number;
  checkoutDate: number;

  constructor(options: any) {
    this.requestingUserId = options.requestingUserId;
    this.responsibleUserId = options.responsibleUserId;
    this.facilityId = options.facilityId;
    this.reservationId = options.reservationId;

    this.checkinDate = options.checkinDate;
    this.checkoutDate = options.checkoutDate;
  }
}