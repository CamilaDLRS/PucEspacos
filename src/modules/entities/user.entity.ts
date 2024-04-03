import *  as uuid from 'uuid';
import { UserType } from '../enums/userType.enum';
import { UpdateUserDto } from '../dtos/user/updateUser.dto';

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

  constructor(data: any) {
    this.schoolId = data.schoolId;
    this.email = data.email;
    this.password = data.password;
    this.userName = data.userName;
    this.userType = data.userType;
    this.isActive = data.isActive;

    this.userId = data.userId || uuid.v4();
    this.createdDate = data.createdDate || new Date();
    this.updatedDate = data.updatedDate || new Date();
  }

  public update(updateDto: UpdateUserDto) : void {
    this.schoolId = updateDto.schoolId;
    this.isActive = updateDto.isActive;
    this.userType = updateDto.userType;
    this.updatedDate = new Date();
  }
}