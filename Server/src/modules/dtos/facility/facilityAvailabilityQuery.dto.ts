export class FacilityAvailabilityQuery {
  
  checkinDate: Date;
  checkoutDate: Date;
  buildingId: string;
  facilityTypeId: string;
  capacity: number;

  constructor(data: any) {
      this.buildingId = data.buildingId;
      this.checkinDate = data.checkinDate;
      this.checkoutDate = data.checkoutDate;
      this.capacity = data.capacity;
  }
}