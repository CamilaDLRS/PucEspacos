import { ApiError } from "../../shared/utils/apiError";
import { InternalCode } from "../../shared/utils/internalCodes";
import { AssetDto } from "../dtos/asset.dto";
import { AssetsRepository } from "../repositories/assets.repository";

export class AssetsServices {

  public static async getAll(): Promise<AssetDto[]> {
    const assets: AssetDto[] = await AssetsRepository.getAll();

    if (assets.length == 0) {
      throw new ApiError(404, InternalCode.REGISTER_NOT_FOUND);
    }
    return assets;
  }
}