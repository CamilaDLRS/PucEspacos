import { IdbServices } from "../../shared/infra/db/Idb.services";
import MysqlDbServices from "../../shared/infra/db/mysql/mysqlDB.services";
import { Building } from "../entities/building.entity";

export class BuildingsRepository {

  private static readonly CONNECTION: IdbServices = new MysqlDbServices();

  public static async getAll(): Promise<Building[]> {

    const sql = `SELECT * FROM tbBuildings;`;
    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.execute(sql);
    await this.CONNECTION.disconnect();

    if (rows && rows.length > 0) {
      return rows as Building[];
    }
    else {
      return [];
    }
  }
}