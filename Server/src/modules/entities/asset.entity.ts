
export class Asset {
  assetId: string;
  assetDescription: string;

  constructor(
    assetId: string,
    assetDescription: string
  ){
    this.assetId = assetId;
    this.assetDescription = assetDescription;
  }
}
