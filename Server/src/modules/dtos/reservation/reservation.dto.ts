import { ReservationStatus } from '../../enums/reservationStatus.enum';
import { ReservationPurpose } from '../../enums/reservationPurpose.enum';

export class ReservationDto {

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

  //from joins
  requestingUserName: string;
  responsibleUserName: string;
  facilityName: string;
  buildingName: string;


  constructor(data: any) {
    this.responsibleUserId = data.responsibleUserId,
    this.requestingUserId = data.requestingUserId,
    this.facilityId = data.facilityId,
    this.reservationStatus  = data.reservationStatus,
    this.reservationPurpose = data.reservationPurpose,
    this.checkinDate = data.checkinDate,
    this.checkoutDate = data.checkoutDate,

    this.reservationId = data.reservationId;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;

    this.requestingUserName = data.requestingUserName;
    this.responsibleUserName = data.responsibleUserName;
    this.facilityName = data.facilityName;
    this.buildingName = data.buildingName;
  }

  public update(data: any) {
    this.reservationPurpose = data.reservationPurpose;
    this.checkinDate = data.checkinDate;
    this.checkoutDate = data.checkoutDate;
  }
}