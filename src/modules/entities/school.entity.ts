import *  as uuid from 'uuid';

export class School {
  schoolId: string;
  name: string;

  createdDate: Date;
  updatedDate: Date;

  constructor(
    schoolId: string,
    name: string,
    createdDate?: Date,
    updatedDate?: Date
  ) {
    this.schoolId = schoolId || uuid.v4();
    this.name = name;

    this.createdDate = createdDate || new Date();
    this.updatedDate = updatedDate || new Date();
  }

  static fromDataRow(dataRow: any): School {
    return new School(
      dataRow.escola_id,
      dataRow.nome_escola,
      new Date(dataRow.data_hora_criacao),
      new Date(dataRow.data_hora_alteracao)
    );
  };
}