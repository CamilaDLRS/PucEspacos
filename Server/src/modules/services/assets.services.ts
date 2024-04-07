import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { Asset } from "../entities/asset.entity";
import { AssetsRepository } from "../repositories/assets.repository";

export class AssetsServices {

  public static async getAll(): Promise<Asset[]> {
    const assets: Asset[] = await AssetsRepository.getAll();

    if (assets.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }
    return assets;
  }
}