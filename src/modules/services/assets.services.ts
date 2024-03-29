import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { Asset } from "../entities/asset.entity";
import { AssetsRepository } from "../repositories/assets.repository";

export class AssetServices {
  public static async getAll(): Promise<Asset[]>{
    const assetList : Asset[] = await AssetsRepository.getAll();

    if (assetList.length == 0){
      throw new ApiError(404, InternalCode.ASSET_NOT_FOUND);
    }
    return assetList;
  }
}