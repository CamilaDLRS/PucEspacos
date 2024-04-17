import { ExpressHandlers } from "../../shared/utils/expressHandles";
import { AssetDto } from "../dtos/asset.dto";
import { AssetsServices } from "../services/assets.services";
import { Request, Response } from "express";

export class AssetsController {

  public static async getAll(req: Request, res: Response) {
    try{
      const assets: AssetDto[] = await AssetsServices.getAll();
      
      await ExpressHandlers.handleResponse(req, res, assets);
    } catch (error: any){
      await ExpressHandlers.handleError(req, res, error);
    }
  }

}