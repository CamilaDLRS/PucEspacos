export class FacilityAssetDto {

  facilityId: string;
  assetId: string;
  quantity: number;
  assetDescription?: string;

  createdDate?: Date;
  updatedDate?: Date;

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