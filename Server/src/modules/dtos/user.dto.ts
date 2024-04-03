import { UserType } from "../enums/userType.enum";

export class UserDto {

  userId?: string;
  schoolId: string | null;
  email: string;
  password: string;
  userName?: string;
  userType: UserType;
  isActive: boolean;

  createdDate: Date;
  updatedDate: Date;

  constructor(data: any, userId?: string) {
    this.schoolId = data.schoolId || null;
    this.userType = data.userType;
    this.isActive = data.isActive;

    if (data.email) {
      this.email = data.email;
    }
    if (data.password) {
      this.password = data.password;
    }
    if (data.userName) {
      this.userName = data.userName;
    }
    if (userId) {
      this.userId = userId;
    }
    if (data.createdDate) {
      this.createdDate = data.createdDate;
    }
    if (data.updatedDate) {
      this.updatedDate = data.updatedDate;
    }
  }

  public update(data: any) : void {
    this.schoolId = data.schoolId || null;
    this.isActive = data.isActive;
    this.userType = data.userType;
  }
}