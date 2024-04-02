import *  as uuid from 'uuid';
import { UserType } from '../enums/userType.enum';

export class User {

  userId: string;
  schoolId: string | null;
  email: string;
  password: string;
  userName: string;
  userType: UserType;
  isActive: boolean;

  createdDate: Date;
  updatedDate: Date;

  constructor(
    schoolId: string | null,
    email: string,
    password: string,
    userName: string,
    userType: UserType,
    isActive: boolean,
    userId?: string,
    createdDate?: Date,
    updatedDate?: Date
  ) {
    this.schoolId = schoolId;
    this.email = email;
    this.password = password;
    this.userName = userName;
    this.userType = userType;
    this.isActive = isActive;

    this.userId = userId || uuid.v4();
    this.createdDate = createdDate || new Date();
    this.updatedDate = updatedDate || new Date();
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