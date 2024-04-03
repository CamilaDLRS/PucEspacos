import { FacilityAssetDto } from "./facilityAsset.dto";

export class FacilityDto {

  facilityId?: string;
  buildingId?: string;
  facilityTypeId: string;
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

    if (data.assets) {
      this.assets = data.assets;
    }
  }
}