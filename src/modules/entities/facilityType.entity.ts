export class FacilityType {

  facilityTypeId: string;
  facilityTypeDescription: string;

  constructor(
    facilityTypeId: string,
    facilityTypeDescription: string
  ) {
    this.facilityTypeId = facilityTypeId;
    this.facilityTypeDescription = facilityTypeDescription;
  }
}