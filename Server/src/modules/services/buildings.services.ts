import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { BuildingDto } from "../dtos/building.dto";
import { FacilityDto } from "../dtos/facility/facility.dto";
import { BuildingsRepository } from "../repositories/buildings.repository";
import { FacilitiesRepository } from "../repositories/facilities.repository";

export class BuildingsServices {

  public static async getAll(): Promise<BuildingDto[]> {
    const buildings: BuildingDto[] = await BuildingsRepository.getAll();

    if (buildings.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }
    return buildings;
  }

  public static async getById(id: string, options: { getFacilities: boolean } = { getFacilities: false }): Promise<BuildingDto> {
    const building = await BuildingsRepository.getById(id);

    if (!building) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }

    if (options.getFacilities) {
      //TO DO
      //verificar possibilidade de fazer um getby mais generico a partir de prorpriedade
      let facilities: FacilityDto[] = await FacilitiesRepository.getAllByBuilding(id);

      if (facilities) {
        building.facilities = [];
        for await (const facility of facilities) {
          building.facilities.push(facility);
        }
      }
    }

    return building;
  }
}