import *  as uuid from 'uuid';

export class School {
  schoolId: string;
  nameSchool: string;

  createdDate: Date;
  updatedDate: Date;

  constructor(
    schoolId: string,
    name: string,
    createdDate?: Date,
    updatedDate?: Date
  ) {
    this.schoolId = schoolId || uuid.v4();
    this.nameSchool = name;

    this.createdDate = createdDate || new Date();
    this.updatedDate = updatedDate || new Date();
  }
}