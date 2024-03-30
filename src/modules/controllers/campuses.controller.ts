import { Request, Response } from "express";
import { CampusesService } from "../services/campuses.services";
import { Campus } from "../entities/campus.entity";
import { ExpressHandlers } from "../../shared/utils/expressHandles";

export class CampusesController {

  public static async getAll(req: Request, res: Response) {
    try {
      const campuses: Campus[] = await CampusesService.getAll();
      
      await ExpressHandlers.handleResponse(req, res, campuses);
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error)
    }
  }
}