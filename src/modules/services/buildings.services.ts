import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { Building } from "../entities/building.entity";
import { BuildingsRepository } from "../repositories/buildings.repository";

export class BuildingsServices {

  public static async getAll(): Promise<Building[]> {
    const buildings: Building[] = await BuildingsRepository.getAll();

    if (buildings.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }
    return buildings;
  }
}