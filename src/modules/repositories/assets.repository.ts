import { IdbServices } from "../../shared/infra/db/Idb.services";
import MysqlDbServices from "../../shared/infra/db/mysql/mysqlDB.services";
import { Asset } from "../entities/asset.entity";


export class AssetsRepository {

  private static readonly CONNECTION: IdbServices = new MysqlDbServices();

  public static async getAll(): Promise<Asset[]> {

    const sql = `SELECT * FROM tb_ativos`;
    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.execute(sql);
    await this.CONNECTION.disconnect();

    if (rows && rows.length > 0){
      const assets: Asset[] = rows.map((row: any) => {
        return Asset.fromDataRow(row);
      });
      return assets;
    }
    else{
      return [];
    }
  }
}