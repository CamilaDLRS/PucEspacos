import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { Campus } from "../entities/campus.entity"
import { CampusesRepository } from "../repositories/campuses.repository";

export class CampusesService {

  public static async getAll(): Promise<Campus[]> {
    const campusList: Campus[] = await CampusesRepository.getAll();

    if (campusList.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }

    return campusList
  }
}
