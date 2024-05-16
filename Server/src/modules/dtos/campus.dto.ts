
export class CampusDto {
  campusId: string;
  campusName: string;

  createdDate: number;
  updatedDate: number;

  constructor(data: any) {
    this.campusId = data.campusId;
    this.campusName = data.campusName;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
  }
}