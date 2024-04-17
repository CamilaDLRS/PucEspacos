export class FacilityTypeDto {

  facilityTypeId: string;
  facilityTypeDescription: string;

  constructor(data: any) {
    this.facilityTypeId = data.facilityTypeId;
    this.facilityTypeDescription = data.facilityTypeDescription;
  }
}