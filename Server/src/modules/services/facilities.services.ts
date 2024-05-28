import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { FacilityDto } from "../dtos/facility/facility.dto";
import { FacilityAssetDto } from "../dtos/facility/facilityAsset.dto";
import { FacilityAvailabilityQuery } from "../dtos/facility/facilityAvailabilityQuery.dto";
import { FacilityTypeDto } from "../dtos/facility/facilityType.dto";
import { FacilitiesRepository } from "../repositories/facilities.repository";
import * as uuid from "uuid";
import { ReservationsServices } from "./reservations.services";
import { ReservationAvailabilityQueryOptionsDto } from "../dtos/reservation/reservationAvailabilityOptions.dto";

export class FacilitiesServices {
  public static async getAll(buildingId: string | null, facilityTypeId: string | null, minimumCapacity: number | null, onlyActive: boolean | null): Promise<FacilityDto[]> {
    
    const facilities: FacilityDto[] = await FacilitiesRepository.getAll(buildingId, facilityTypeId, minimumCapacity, onlyActive);

    if (facilities.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }

    for await (const facility of facilities) {
      let facilityAssets: FacilityAssetDto[] = await FacilitiesRepository.getAllFacilityAssets(facility.facilityId!);
      if (facilityAssets) {
        facility.assets = [];
        for await (const asset of facilityAssets) {
          facility.assets.push(new FacilityAssetDto(asset, asset.assetId!));
        }
      }
    }
    return facilities;
  }

  public static async getById(id: string, options: { getAssets: boolean } = { getAssets: true }): Promise<FacilityDto> {
    const facility = await FacilitiesRepository.getById(id);

    if (!facility) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }

    if (options.getAssets) {
      let facilityAssets: FacilityAssetDto[] = await FacilitiesRepository.getAllFacilityAssets(id);

      if (facilityAssets) {
        facility.assets = [];
        for await (const asset of facilityAssets) {
          facility.assets.push(asset);
        }
      }
    }

    return facility;
  }

  public static async getAvailables(query: FacilityAvailabilityQuery): Promise<FacilityDto[]> {
    
    const facilities: FacilityDto[] = await this.getAll(query.buildingId, query.facilityTypeId, query.minimumCapacity, true);
    const facilitiesAvailable: FacilityDto[] = [];

    for await (const facility of facilities) {

      const options: ReservationAvailabilityQueryOptionsDto = {
        checkinDate: query.checkinDate,
        checkoutDate: query.checkoutDate,
        facilityId: facility.facilityId!
      };
      const facilityAvailable = await ReservationsServices.isAvailable(options);

      if (facilityAvailable) {
        facilitiesAvailable.push(facility);
      }
    }

    if (facilitiesAvailable.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND, "Não há espaços disponíveis com base nos filtros de busca.");
    }

    return facilitiesAvailable;
  }

  public static async create(facility: FacilityDto): Promise<string> {
    //validar unicidade
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

  public static async update(facilityUpdated: FacilityDto): Promise<void> {
    const facility = await this.getById(facilityUpdated.facilityId!);
    facility.update(facilityUpdated);

    await FacilitiesRepository.update(facility);

    for (let asset of facilityUpdated.assets) {
      let existingAsset = facility.assets.find((dbAsset) => dbAsset.assetId === asset.assetId);

      if (existingAsset) {
        existingAsset.update(asset);
        await FacilitiesRepository.updateFacilityAsset(existingAsset);
      } else {
        let newFacilityAsset = new FacilityAssetDto(asset, facilityUpdated.facilityId!);
        await FacilitiesRepository.createFacilityAsset(newFacilityAsset);
      }
    }

    for (let originalAsset of facility.assets) {
      if (!facilityUpdated.assets.some((assetUpdate) => assetUpdate.assetId === originalAsset.assetId)) {
        await FacilitiesRepository.deleteFacilityAsset(originalAsset.facilityId, originalAsset.assetId);
      }
    }
  }

  public static async updateStatus(id: string, status: boolean): Promise<void> {
    const facility = await this.getById(id, { getAssets: false });
    facility.isActive = status;

    await FacilitiesRepository.update(facility);
  }

  public static async getAllTypes(): Promise<FacilityTypeDto[]> {
    const facilityTypes: FacilityTypeDto[] = await FacilitiesRepository.getAllTypes();

    if (facilityTypes.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }
    return facilityTypes;
  }
}
