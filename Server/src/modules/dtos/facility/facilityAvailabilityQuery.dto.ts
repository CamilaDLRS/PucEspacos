export class FacilityAvailabilityQuery {
  
  checkinDate: number;
  checkoutDate: number;
  buildingId: string;
  facilityTypeId: string;
  minimumCapacity: number | null;

  constructor(data: any) {
      this.buildingId = data.buildingId;
      this.checkinDate = data.checkinDate;
      this.checkoutDate = data.checkoutDate;
      this.facilityTypeId = data.facilityTypeId;
      this.minimumCapacity = data.minimumCapacity || null;
  }
}