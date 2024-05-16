export class SchoolDto {
  schoolId: string;
  nameSchool: string;

  createdDate: number;
  updatedDate: number;

  constructor(data: any) {
    this.schoolId = data.schoolId;
    this.nameSchool = data.nameSchool;

    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
  }
}