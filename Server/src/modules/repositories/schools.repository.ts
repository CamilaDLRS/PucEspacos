import { IdbServices } from "../../shared/infra/db/Idb.services";
import MysqlDbServices from "../../shared/infra/db/mysql/mysqlDB.services";
import { School } from "../entities/school.entity";

export class SchoolsRepository {

  private static readonly CONNECTION: IdbServices = new MysqlDbServices();

  public static async getAll(): Promise<School[]> {

    const sql = `SELECT * FROM tbSchools;`;
    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.execute(sql);
    await this.CONNECTION.disconnect();

    if (rows && rows.length > 0) {
      return rows as School[];
    }
    else {
      return [];
    }
  }
}