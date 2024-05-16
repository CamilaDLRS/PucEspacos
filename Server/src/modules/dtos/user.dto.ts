import { UserType } from "../enums/userType.enum";

export class UserDto {

  userId?: string;
  schoolId: string | null;
  schoolName: string | null; //passar o dto school?
  email?: string;
  password?: string;
  userName?: string;
  userType?: UserType;
  isActive?: boolean;

  createdDate?: number;
  updatedDate?: number;

  constructor(data: any, userId?: string) {
    this.schoolId = data.schoolId || null;
    this.schoolName = data.nameSchool || null;
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
    if (data.userType) {
      this.userType = data.userType;
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