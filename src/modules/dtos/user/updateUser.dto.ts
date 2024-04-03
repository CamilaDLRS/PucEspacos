import { UserType } from "../../enums/userType.enum";

export class UpdateUserDto {
  userId: string;
  schoolId: string | null;
  userType: UserType;
  isActive: boolean;

  constructor(data: any, userId: string) {
    this.schoolId = data.schoolId;
    this.userType = data.userType;
    this.isActive = data.isActive;
    this.userId = userId;
  };
}