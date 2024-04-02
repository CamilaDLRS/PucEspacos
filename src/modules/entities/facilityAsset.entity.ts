export class FacilityAsset {

  facilityId: string;
  assetId: string;
  quantity: number;

  createdDate: Date;
  updatedDate: Date;

  constructor(
    facilityId: string,
    assetId: boolean,
    quantity: number,

    createdDate?: Date,
    updatedDate?: Date
  ) {
    this.facilityId = facilityId;
    this.quantity = quantity;

    this.createdDate = createdDate || new Date();
    this.updatedDate = updatedDate || new Date();
  }
}