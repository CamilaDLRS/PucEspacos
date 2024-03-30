import *  as uuid from 'uuid';

export class Campus {
  campusId: string;
  campusName: string;

  createdDate: Date;
  updatedDate: Date;

  constructor(
    campusId: string,
    campusName: string,
    createdDate?: Date,
    updatedDate?: Date
  ) {
    this.campusId = campusId || uuid.v4();
    this.campusName = campusName;
    this.createdDate = createdDate || new Date();
    this.updatedDate = updatedDate || new Date();
  }

  static fromDataRow(dataRow: any): Campus {
    return new Campus(
      dataRow.campus_id,
      dataRow.nome_campus,
      new Date(dataRow.data_hora_criacao),
      new Date(dataRow.data_hora_alteracao)
    )
  }

  static fromBody(body: any): Campus {
    return new Campus(
      body.campusId,
      body.nome_campus,
    )
  }
}
