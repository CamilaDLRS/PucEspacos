import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { BuildingDto } from "../dtos/building.dto";
import { BuildingsRepository } from "../repositories/buildings.repository";

export class BuildingsServices {

  public static async getAll(): Promise<BuildingDto[]> {
    const buildings: BuildingDto[] = await BuildingsRepository.getAll();

    if (buildings.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }
    return buildings;
  }
}