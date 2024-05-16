export class ReservationQueryOptionsDto {
  
  requestingUserId?: string;
  responsibleUserId?: string;
  onlyByResponsibleUserId?: boolean;
  onlyByRequestingUserId?: boolean;
  reservationStatus?: string;
  buildingId?: string;
  checkinDate?: number;
  checkoutDate?: number;
  facilityIds?: string[];

  constructor(options: any) {
      this.requestingUserId = options.requestingUserId;
      this.responsibleUserId = options.responsibleUserId;
      this.onlyByResponsibleUserId = options.onlyByResponsibleUserId;
      this.onlyByRequestingUserId = options.onlyByRequestingUserId;
      this.reservationStatus = options.reservationStatus;
      this.buildingId = options.buildingId;
      this.checkinDate = options.checkinDate;
      this.checkoutDate = options.checkoutDate;
      this.facilityIds = options.facilityIds;
  }
}