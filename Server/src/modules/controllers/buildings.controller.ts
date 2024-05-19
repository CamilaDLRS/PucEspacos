import { ExpressHandlers } from "../../shared/utils/expressHandles";
import { BuildingDto } from "../dtos/building.dto";
import { BuildingsServices } from "../services/buildings.services";
import { Request, Response } from "express";

export class BuildingsController {

  public static async getAll(req: Request, res: Response) {
    try{
      const buildings: BuildingDto[] = await BuildingsServices.getAll();
      
      await ExpressHandlers.handleResponse(req, res, buildings);
    } catch (error: any){
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const option = {getFacilities:  Boolean(req.params.facilities)};

      const building: BuildingDto = await BuildingsServices.getById(id, option);

      await ExpressHandlers.handleResponse(req, res, building);
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }
}