export class FacilityAssetDto { //herdar Asset

  facilityId: string;
  assetId: string;
  quantity: number;
  assetDescription?: string;

  createdDate?: number;
  updatedDate?: number;

  constructor(data: any, facilityId: string) {
    this.facilityId = facilityId;
    this.quantity = data.quantity;
    this.assetId = data.assetId;

    if (data.assetDescription) {
      this.assetDescription = data.assetDescription;
    }
    if (data.createdDate) {
      this.createdDate = data.createdDate;
    }
    if (data.updatedDate) {
      this.updatedDate = data.updatedDate;
    }
  }

  public update(data: any) : void {
    this.quantity = data.quantity;
  }
}