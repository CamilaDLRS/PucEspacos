export class BuildingDto {
  buildingId?: string;
  campusId: string;
  schoolId: string;
  buildingName: string;
  
  createdDate?: Date;
  updatedDate?: Date;

  constructor(data: any) {
    this.campusId = data.campusId;
    this.schoolId = data.schoolId;
    this.buildingName = data.buildingName;
    this.buildingId = data.buildingId;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
  }
}
