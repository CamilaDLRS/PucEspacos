import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { FacilityType } from "../entities/facilityType.entity";
import { FacilityTypesRepository } from "../repositories/facilityTypes.repository";

export class FacilityTypesServices {
  public static async getAll() {
    const facilityTypes: FacilityType[] = await FacilityTypesRepository.getAll();
    if (facilityTypes.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }
    return facilityTypes;
  }

}