import { FacilityAssetDto } from "./facilityAsset.dto";

export class FacilityDto {

  facilityId?: string;
  buildingId?: string;
  buildingName?: string;
  facilityTypeId: string;
  facilityTypeDescription: string;
  isActive: boolean;
  facilityName: string;
  capacity: string | null;
  note: string;
  assets: FacilityAssetDto[];

  constructor(data: any, facilityId?: string) {

    this.facilityTypeId = data.facilityTypeId;
    this.isActive = data.isActive;
    this.facilityName = data.facilityName;
    this.capacity = data.capacity || null;
    this.note = data.note || "";

    if (facilityId) {
      this.facilityId = facilityId;
    }
    if (data.buildingId) {
      this.buildingId = data.buildingId;
    }
    if (data.buildingName) {
      this.buildingName = data.buildingName;
    }
    if (data.facilityTypeDescription) {
      this.facilityTypeDescription = data.facilityTypeDescription;
    }
    if (data.assets) {
      this.assets = data.assets;
    }
  }

  public update(data: any) {
    this.facilityTypeId = data.facilityTypeId;
    this.isActive = data.isActive;
    this.facilityName = data.facilityName;
    this.capacity = data.capacity || null;
    this.note = data.note || "";
    this.buildingId = data.buildingId || "";

    if (data.assets) {
      this.assets = data.assets;
    }
  }
}