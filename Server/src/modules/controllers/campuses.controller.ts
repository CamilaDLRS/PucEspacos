import { Request, Response } from "express";
import { CampusesService } from "../services/campuses.services";
import { CampusDto } from "../dtos/campus.dto";
import { ExpressHandlers } from "../../shared/utils/expressHandles";

export class CampusesController {

  public static async getAll(req: Request, res: Response) {
    try {
      const campuses: CampusDto[] = await CampusesService.getAll();
      
      await ExpressHandlers.handleResponse(req, res, campuses);
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error)
    }
  }
}