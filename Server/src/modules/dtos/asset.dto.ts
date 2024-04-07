
export class AssetDto {
  assetId: string;
  assetDescription: string;

  constructor(data: any) {
    this.assetId = data.assetId;
    this.assetDescription = data.assetDescription;
  }
}
