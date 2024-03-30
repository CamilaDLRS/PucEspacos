import *  as uuid from 'uuid';

export class Facility {

  facilityId: string;
  buildingId: string;
  facilityTypeId: string;
  isActive: boolean;
  facilityName: string;
  capacity: string;
  note: string;

  createdDate: Date;
  updatedDate: Date;

  constructor(
    buildingId: string,
    facilityTypeId: string,
    isActive: boolean,
    facilityName: string,
    capacity: string,
    note: string,
    facilityId?: string,
    createdDate?: Date,
    updatedDate?: Date
  ) {
    this.buildingId = buildingId;
    this.facilityTypeId = facilityTypeId;
    this.isActive = isActive;
    this.facilityName = facilityName;
    this.capacity = capacity;
    this.note = note;

    this.facilityId = facilityId || uuid.v4();
    this.createdDate = createdDate || new Date();
    this.updatedDate = updatedDate || new Date();
  }

  static fromDataRow(dataRow: any): Facility {
    return new Facility(
      dataRow.bloco_id,
      dataRow.tipo_espaco_id,
      dataRow.esta_ativo,
      dataRow.nome_espaco,
      dataRow.capacidade,
      dataRow.observacao,
      dataRow.espaco_id,
      new Date(dataRow.data_hora_criacao),
      new Date(dataRow.data_hora_alteracao)
    );
  }

  static fromBody(body : any): Facility {
    return new Facility(
      body.buildingId,
      body.facilityTypeId,
      body.isActive,
      body.facilityName,
      body.capacity,
      body.note
    );
  }
}