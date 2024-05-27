import { ExpressHandlers } from "../../shared/utils/expressHandles";
import { FacilitiesServices } from "../services/facilities.services";
import { Request, Response } from "express";
import { FacilityDto } from "../dtos/facility/facility.dto";
import { FacilityTypeDto } from "../dtos/facility/facilityType.dto";
import { FacilityAvailabilityQuery } from "../dtos/facility/facilityAvailabilityQuery.dto";

export class FacilitiesController {
  public static async getAll(req: Request, res: Response) {
    try {
      const buildingId: string | null = req.query.buildingId
        ? String(req.query.buildingId)
        : null;
      const facilityTypeId: string | null = req.query.facilityTypeId
        ? String(req.query.facilityTypeId)
        : null;
      const minimumCapacity: number | null = req.query.minimumCapacity
        ? Number(req.query.minimumCapacity)
        : null;

      const facilities: FacilityDto[] = await FacilitiesServices.getAll(buildingId,facilityTypeId, minimumCapacity);

      await ExpressHandlers.handleResponse(req, res, facilities);
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const facility: FacilityDto = await FacilitiesServices.getById(id);

      await ExpressHandlers.handleResponse(req, res, facility);
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async getAvailables(req: Request, res: Response) {
    try {
      const query: FacilityAvailabilityQuery = new FacilityAvailabilityQuery(req.body);
      const facilities: FacilityDto[] = await FacilitiesServices.getAvailables(query);

      await ExpressHandlers.handleResponse(req, res, facilities);
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      let facility: FacilityDto = new FacilityDto(req.body);
      const newFacilityId: string = await FacilitiesServices.create(facility);

      facility = await FacilitiesServices.getById(newFacilityId);

      await ExpressHandlers.handleResponse(req,res,facility,"Espaço criado com sucesso!");
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      let facility: FacilityDto = new FacilityDto(req.body, req.params.id);
      await FacilitiesServices.update(facility);

      facility = await FacilitiesServices.getById(req.params.id);

      await ExpressHandlers.handleResponse(req, res, facility, "Espaço editado com sucesso!");
    } catch (error) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async updateStatus(req: Request, res: Response) {
    try {
      let facilityId = String(req.params.id);
      let newStatus = Boolean(req.body.isActive);
      await FacilitiesServices.updateStatus(facilityId, newStatus);

      const facility = await FacilitiesServices.getById(req.params.id);

      await ExpressHandlers.handleResponse(req, res, facility, "Status do espaço editado com sucesso!");
    } catch (error) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }

  public static async getAllTypes(req: Request, res: Response) {
    try {
      const facilityTypes: FacilityTypeDto[] =
        await FacilitiesServices.getAllTypes();

      await ExpressHandlers.handleResponse(req, res, facilityTypes);
    } catch (error: any) {
      await ExpressHandlers.handleError(req, res, error);
    }
  }
}
