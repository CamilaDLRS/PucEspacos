import *  as uuid from 'uuid';
import { UserTypes } from '../enums/usersTypes.enum';

export class User {

  userId: string;
  schoolId: string;
  email: string;
  password: string;
  name: string;
  userType: UserTypes;
  isActive: boolean;

  createdDate: Date;
  updatedDate: Date;

  constructor(
    _userId: string,
    _schoolId: string,
    _email: string,
    _password: string,
    _name: string,
    _userType: UserTypes,
    _isActive: boolean,
    _createdDate: Date,
    _updatedDate: Date
  ) {
    this.schoolId = _schoolId;
    this.email = _email;
    this.password = _password;
    this.name = _name;
    this.userType = _userType;
    this.isActive = _isActive;

    this.userId = _userId || uuid.v4();
    this.createdDate = _createdDate || new Date();
    this.updatedDate = _updatedDate || new Date();
  }

  static fromDataRow(dataRow: any): User {
    return new User(
      dataRow.usuario_id,
      dataRow.escola_id,
      dataRow.email,
      dataRow.senha,
      dataRow.nome_usuario,
      dataRow.tipo_usuario,
      dataRow.esta_ativo,
      new Date(dataRow.data_hora_criacao),
      new Date(dataRow.data_hora_alteracao)
    );
  }
}