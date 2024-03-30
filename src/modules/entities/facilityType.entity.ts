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

  static fromDataRow(dataRow: any): FacilityType {
    return new FacilityType(
      dataRow.tipo_espaco_id,
      dataRow.descricao_tipo_espaco
    )
  }
}