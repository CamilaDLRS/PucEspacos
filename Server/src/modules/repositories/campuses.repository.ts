
import { IdbServices } from "../../shared/infra/db/Idb.services";
import MysqlDbServices from "../../shared/infra/db/mysql/mysqlDB.services";
import { CampusDto } from "../dtos/campus.dto";

export class CampusesRepository {

  private static readonly CONNECTION: IdbServices = new MysqlDbServices();

  public static async getAll(): Promise<CampusDto[]> {

    const sql = `SELECT * FROM tbCampuses;`;
    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.execute(sql);
    await this.CONNECTION.disconnect();

    if (rows && rows.length > 0) {
      const campuses:CampusDto[] = rows.map((row: any) => {
        return new CampusDto(row);
      });
      return campuses;
    }
    else{
      return [];
    }
  }
}
