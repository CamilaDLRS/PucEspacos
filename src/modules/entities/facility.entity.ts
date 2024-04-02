import *  as uuid from 'uuid';

export class Facility {

  facilityId: string;
  buildingId: string;
  facilityTypeId: string;
  isActive: boolean;
  facilityName: string;
  capacity: string;
  note: string;

  createdDate: Date;
  updatedDate: Date;

  constructor(
    buildingId: string,
    facilityTypeId: string,
    isActive: boolean,
    facilityName: string,
    capacity: string,
    note: string,
    facilityId?: string,
    createdDate?: Date,
    updatedDate?: Date
  ) {
    this.buildingId = buildingId;
    this.facilityTypeId = facilityTypeId;
    this.isActive = isActive;
    this.facilityName = facilityName;
    this.capacity = capacity;
    this.note = note;

    this.facilityId = facilityId || uuid.v4();
    this.createdDate = createdDate || new Date();
    this.updatedDate = updatedDate || new Date();
  }

  static fromBody(body : any): Facility {
    return new Facility(
      body.buildingId,
      body.facilityTypeId,
      body.isActive,
      body.facilityName,
      body.capacity,
      body.note
    );
  }
}