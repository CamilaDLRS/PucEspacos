
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

  static fromDataRow(dataRow : any): Asset{
    return new Asset(
      dataRow.ativo_id,
      dataRow.descricao_ativo
    )
  }
}
