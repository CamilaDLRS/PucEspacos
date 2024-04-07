
import { IdbServices } from "../../shared/infra/db/Idb.services";
import MysqlDbServices from "../../shared/infra/db/mysql/mysqlDB.services";
import { Campus } from "../entities/campus.entity";

export class CampusesRepository {

  private static readonly CONNECTION: IdbServices = new MysqlDbServices();

  public static async getAll(): Promise<Campus[]> {

    const sql = `SELECT * FROM tbCampuses;`;
    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.execute(sql);
    await this.CONNECTION.disconnect();

    if (rows && rows.length > 0) {
      return rows as Campus[];
    }
    else{
      return [];
    }
  }
}
