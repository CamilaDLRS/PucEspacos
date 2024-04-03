import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { FacilityDto } from "../dtos/facility.dto";
import { FacilityAssetDto } from "../dtos/facilityAsset.dto";
import { FacilityTypeDto } from "../dtos/facilityType.dto";
import { FacilitiesRepository } from "../repositories/facilities.repository";
import *  as uuid from 'uuid';


export class FacilitiesServices {

  public static async getAll(): Promise<FacilityDto[]> {
    const facilities: FacilityDto[] = await FacilitiesRepository.getAll();

    if (facilities.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }

    for await (const facility of facilities) {

      let facilityAssets: FacilityAssetDto[] = await FacilitiesRepository.getAllFacilityAssets(facility.facilityId!);
      if (facilityAssets) {
        facility.assets = [];
        for await (const asset of facilityAssets) {
          facility.assets.push(new FacilityAssetDto(asset, asset.assetId!))
        }
      }
    }
    return facilities;
  }

  public static async getById(id: string): Promise<FacilityDto> {
    const facility = await FacilitiesRepository.getById(id);

    if (!facility) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }

    let facilityAssets: FacilityAssetDto[] = await FacilitiesRepository.getAllFacilityAssets(id);

    if (facilityAssets) {
      facility.assets = [];
      for await (const asset of facilityAssets) {
        facility.assets.push(new FacilityAssetDto(asset, asset.assetId!))
      }
    }
    return facility;
  }

  public static async create(facility: FacilityDto): Promise<string> {

    facility.facilityId = uuid.v4();
    await FacilitiesRepository.create(facility);

    if (facility.assets && facility.assets.length > 0) {
      for await (const asset of facility.assets) {
        const facilityAsset: FacilityAssetDto = new FacilityAssetDto(asset, facility.facilityId);
        await FacilitiesRepository.createFacilityAsset(facilityAsset);
      }
    }
    return facility.facilityId;
  }

  public static async update(facility: FacilityDto): Promise<void> {

    const facilityFromDb = await FacilitiesRepository.getById(facility.facilityId!);

    if (!facilityFromDb) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }
    facilityFromDb.update(facility);

    await FacilitiesRepository.update(facilityFromDb);

    if (facility.assets && facility.assets.length > 0) {

      for await (const asset of facility.assets) {
        let facilityAsset = await FacilitiesRepository.getFacilityAssetByIds(facility.facilityId!, asset.assetId!);

        if (facilityAsset) {
          facilityAsset.update(asset);
          await FacilitiesRepository.updateFacilityAsset(facilityAsset);
        }
        else {
          facilityAsset = new FacilityAssetDto(asset, facility.facilityId!);
          await FacilitiesRepository.createFacilityAsset(facilityAsset);
        }
      }
    }
  }

  public static async getAllTypes(): Promise<FacilityTypeDto[]> {
    const facilityTypes: FacilityTypeDto[] = await FacilitiesRepository.getAllTypes();

    if (facilityTypes.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }
    return facilityTypes;
  }
}