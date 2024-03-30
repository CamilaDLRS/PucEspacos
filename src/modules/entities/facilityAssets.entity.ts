export class FacilityAssets {

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

  static fromDataRow(dataRow: any): FacilityAssets {
    return new FacilityAssets(
      dataRow.espaco_id,
      dataRow.ativo_id,
      dataRow.quantidade,

      new Date(dataRow.data_hora_criacao),
      new Date(dataRow.data_hora_alteracao)
    );
  }
}