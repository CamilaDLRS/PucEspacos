
export class CampusDto {
  campusId: string;
  campusName: string;

  createdDate: Date;
  updatedDate: Date;

  constructor(data: any) {
    this.campusId = data.campusId;
    this.campusName = data.campusName;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
  }
}