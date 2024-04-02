import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { Facility } from "../entities/facility.entity";
import { FacilityType } from "../entities/facilityType.entity";
import { FacilitiesRepository } from "../repositories/facilities.repository";

export class FacilitiesServices {

  public static async getAll(): Promise<Facility[]> {
    const facilities: Facility[] = await FacilitiesRepository.getAll();

    if (facilities.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }
    return facilities;
  }

  public static async getById(id: string): Promise<Facility | null> {
    const facility = await FacilitiesRepository.getById(id);

    if (!facility) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }

    return facility;
  }

  public static async create(facility: Facility): Promise<void> {

    await FacilitiesRepository.create(facility);
  }

  public static async update(facilityEdited: Facility): Promise<void> {

    let facility = await FacilitiesRepository.getById(facilityEdited.facilityId);

    if (!facility) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }

    //EDIÇAO

    await FacilitiesRepository.update(facility);
  }

  public static async getAllTypes(): Promise<FacilityType[]> {
    const facilityTypes: FacilityType[] = await FacilitiesRepository.getAllTypes();

    if (facilityTypes.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }
    return facilityTypes;
  }
}