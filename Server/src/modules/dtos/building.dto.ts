import { FacilityDto } from "./facility/facility.dto";

export class BuildingDto {
  buildingId: string;
  campusId: string;
  schoolId: string;
  buildingName: string;
  
  createdDate: Date;
  updatedDate: Date;

  //from join
  facilities: FacilityDto[];

  constructor(data: any) {
    this.campusId = data.campusId;
    this.schoolId = data.schoolId;
    this.buildingName = data.buildingName;
    this.buildingId = data.buildingId;
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;

    if (data.facilities) {
      this.facilities = data.facilities.map((facility: any) => {
        return new FacilityDto(facility, facility.facilityId!);
      });
    }
  }
}