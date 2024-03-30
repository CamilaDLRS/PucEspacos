import { ExpressHandlers } from "../../shared/utils/expressHandles";
import { Request, Response } from "express";
import { SchoolsServices } from "../services/schools.services";
import { School } from "../entities/school.entity";

export class SchoolsController {

  public static async getAll(req: Request, res: Response) {
    try{
      const schools: School[] = await SchoolsServices.getAll();
      
      await ExpressHandlers.handleResponse(req, res, schools);
    } catch (error: any){
      await ExpressHandlers.handleError(req, res, error);
    }
  }
}