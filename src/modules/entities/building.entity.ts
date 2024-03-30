import *  as uuid from 'uuid';

export class Building {
  buildingId: string;
  campusId: string;
  schoolId: string;
  buildingName: string;
  
  createdDate?: Date;
  updatedDate?: Date;

  constructor(
    campusId: string,
    schoolId: string,
    buildingName: string,
    buildingId?: string,
    createdDate?: Date,
    updatedDate?: Date
  ) {
    this.campusId = campusId;
    this.schoolId = schoolId;
    this.buildingName = buildingName;

    this.buildingId = buildingId || uuid.v4();
    this.createdDate = createdDate || new Date();
    this.updatedDate = updatedDate || new Date();
  }

  static fromDataRow(dataRow: any): Building {
    return new Building(
      dataRow.campus_id,
      dataRow.escola_id,
      dataRow.nome_bloco,
      dataRow.bloco_id,
      new Date(dataRow.data_hora_criacao),
      new Date(dataRow.data_hora_alteracao)
    )
  }
}
