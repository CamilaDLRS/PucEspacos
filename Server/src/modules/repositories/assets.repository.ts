import { IdbServices } from "../../shared/infra/db/Idb.services";
import MysqlDbServices from "../../shared/infra/db/mysql/mysqlDB.services";
import { AssetDto } from "../dtos/asset.dto";

export class AssetsRepository {

  private static readonly CONNECTION: IdbServices = new MysqlDbServices();

  public static async getAll(): Promise<AssetDto[]> {

    const sql = `SELECT * FROM tbAssets;`;
    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.execute(sql);
    await this.CONNECTION.disconnect();

    if (rows && rows.length > 0){
      const assets: AssetDto[] = rows.map((row:any) => {
        return new AssetDto(row);
      });
      return assets;
    }
    else{
      return [];
    }
  }
}