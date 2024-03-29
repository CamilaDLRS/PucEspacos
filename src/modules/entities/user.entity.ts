import *  as uuid from 'uuid';
import { UserTypes } from '../enums/usersTypes.enum';

export class User {

  userId: string;
  schoolId: string | null;
  email: string;
  password: string;
  name: string;
  userType: UserTypes;
  isActive: boolean;

  createdDate: Date;
  updatedDate: Date;

  constructor(
    schoolId: string | null,
    email: string,
    password: string,
    name: string,
    userType: UserTypes,
    isActive: boolean,
    userId?: string,
    createdDate?: Date,
    updatedDate?: Date
  ) {
    this.schoolId = schoolId;
    this.email = email;
    this.password = password;
    this.name = name;
    this.userType = userType;
    this.isActive = isActive;

    this.userId = userId || uuid.v4();
    this.createdDate = createdDate || new Date();
    this.updatedDate = updatedDate || new Date();
  }

  static fromDataRow(dataRow: any): User {
    return new User(
      dataRow.escola_id,
      dataRow.email,
      dataRow.senha,
      dataRow.nome_usuario,
      dataRow.tipo_usuario,
      dataRow.esta_ativo,
      dataRow.usuario_id,
      new Date(dataRow.data_hora_criacao),
      new Date(dataRow.data_hora_alteracao)
    );
  }

  static fromBody(body : any): User {
    return new User(
      body.schoolId,
      body.email,
      body.password,
      body.name,
      body.userType,
      body.isActive
    );
  }
}