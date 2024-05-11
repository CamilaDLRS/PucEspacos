export class FacilityAvailabilityQuery {
  
  checkinDate: Date;
  checkoutDate: Date;
  buildingId: string;
  facilityTypeId: string;
  minimumCapacity: number | null;

  constructor(data: any) {
      this.buildingId = data.buildingId;
      this.checkinDate = new Date(data.checkinDate);
      this.checkoutDate = new Date(data.checkoutDate);
      this.facilityTypeId = data.facilityTypeId;
      this.minimumCapacity = data.minimumCapacity || null;
  }
}