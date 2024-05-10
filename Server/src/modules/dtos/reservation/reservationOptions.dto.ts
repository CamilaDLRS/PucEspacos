export class ReservationQueryOptions {
  
  requestingUserId?: string;
  reservationStatus?: string;
  buildingId?: string;
  checkinDate?: Date;
  checkoutDate?: Date;
  facilityIds?: string[];

  constructor(options: any) {
      this.requestingUserId = options.requestingUserId;
      this.reservationStatus = options.reservationStatus;
      this.buildingId = options.buildingId;
      this.checkinDate = options.checkinDate;
      this.checkoutDate = options.checkoutDate;
      this.facilityIds = options.facilityIds;
  }
}