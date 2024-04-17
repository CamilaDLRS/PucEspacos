import { IdbServices } from "../../shared/infra/db/Idb.services";
import MysqlDbServices from "../../shared/infra/db/mysql/mysqlDB.services";
import { SchoolDto } from "../dtos/school.dto";

export class SchoolsRepository {
  private static readonly CONNECTION: IdbServices = new MysqlDbServices();

  public static async getAll(): Promise<SchoolDto[]> {
    const sql = `SELECT * FROM tbSchools;`;
    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.execute(sql);
    await this.CONNECTION.disconnect();

    if (rows && rows.length > 0) {
      const schools: SchoolDto[] = rows.map((row: any) => {
        return new SchoolDto(row);
      });
      return schools;
    } else {
      return [];
    }
  }
}
