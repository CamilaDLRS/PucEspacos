export class SchoolDto {
  schoolId: string;
  nameSchool: string;

  createdDate: Date;
  updatedDate: Date;

  constructor(data: any) {
    this.schoolId = data.schoolId;
    this.nameSchool = data.nameScholl;

    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
  }
}