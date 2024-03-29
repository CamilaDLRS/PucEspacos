import { ExpressHandlers } from "../../shared/utils/expressHandles";
import { Asset } from "../entities/asset.entity";
import { AssetServices } from "../services/assets.services";
import { Request, Response } from "express";

export class AssetsController {

  public static async getAll(req: Request, res: Response) {
    try{
      const assets: Asset[] = await AssetServices.getAll();
      await ExpressHandlers.handleResponse(req, res, assets);
    } catch (error: any){
      await ExpressHandlers.handleError(req, res, error);
    }
  }

}