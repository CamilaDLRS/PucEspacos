import { ApiError } from "../../shared/utils/apiError";
import { ExpressHandlers } from "../../shared/utils/expressHandles";
import { Facility } from "../entities/facility.entity";
import { FacilitiesServices } from "../services/facilities.services";
import { InternalCode } from "../../shared/utils/internalCodes";
import { Request, Response } from "express";

export class FacilitiesController {

  public static async getAll(req: Request, res: Response) {
    try {
      const Facilities: Facility[] = await FacilitiesServices.getAll();

      await ExpressHandlers.handleResponse(req, res, Facilities);
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const id = (req.params.id);
      const facility = await FacilitiesServices.getById(id);

      await ExpressHandlers.handleResponse(req, res, facility);
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      const facility = Facility.fromBody(req.body);
      await FacilitiesServices.create(facility);

      await ExpressHandlers.handleResponse(req, res, facility, "Espaço criado com sucesso!"); 
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      /*       
      const id = req.params.id;
      await FacilitiesServices.update(); 

      const facility = await FacilitiesServices.getById(id);
      
      await ExpressHandlers.handleResponse(req, res, facility, "Espaço editado com sucesso!");
      */
      throw new ApiError(404, InternalCode.NOT_IMPLEMENTED);
    } catch (error) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }
}