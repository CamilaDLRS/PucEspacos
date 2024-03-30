import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { School } from "../entities/school.entity";
import { SchoolsRepository } from "../repositories/schools.repository";

export class SchoolsServices {
  
  public static async getAll(): Promise<School[]>{
    const schools : School[] = await SchoolsRepository.getAll();

    if (schools.length == 0){
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }
    return schools;
  }
}