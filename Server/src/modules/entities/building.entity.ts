import *  as uuid from 'uuid';

export class Building {
  buildingId: string;
  campusId: string;
  schoolId: string;
  buildingName: string;
  
  createdDate?: Date;
  updatedDate?: Date;

  constructor(
    campusId: string,
    schoolId: string,
    buildingName: string,
    buildingId?: string,
    createdDate?: Date,
    updatedDate?: Date
  ) {
    this.campusId = campusId;
    this.schoolId = schoolId;
    this.buildingName = buildingName;

    this.buildingId = buildingId || uuid.v4();
    this.createdDate = createdDate || new Date();
    this.updatedDate = updatedDate || new Date();
  }
}
