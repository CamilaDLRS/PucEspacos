import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { SchoolDto } from "../dtos/school.dto";
import { SchoolsRepository } from "../repositories/schools.repository";

export class SchoolsServices {

  public static async getAll(): Promise<SchoolDto[]> {
    const schools: SchoolDto[] = await SchoolsRepository.getAll();

    if (schools.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }
    return schools;
  }
}