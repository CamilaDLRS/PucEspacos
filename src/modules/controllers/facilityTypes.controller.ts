import { Request, Response } from "express";import { ExpressHandlers } from "../../shared/utils/expressHandles";
import { FacilityType } from "../entities/facilityType.entity"
import { FacilityTypesServices } from "../services/facilityTypes.services"


export class FacilityTypesController {
  public static async getAll(req: Request, res: Response){
    try{
      const facilityTypes: FacilityType[] = await FacilityTypesServices.getAll();

      await ExpressHandlers.handleResponse(req, res, facilityTypes);
    }catch(error: any){
      await ExpressHandlers.handleError(req, res, error);
    }
  }
}