import { IdbServices } from "../../shared/infra/db/Idb.services";
import MysqlDbServices from "../../shared/infra/db/mysql/mysqlDB.services";
import { BuildingDto } from "../dtos/building.dto";

export class BuildingsRepository {

  private static readonly CONNECTION: IdbServices = new MysqlDbServices();

  public static async getAll(): Promise<BuildingDto[]> {

    const sql = `SELECT * FROM tbBuildings;`;
    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.execute(sql);
    await this.CONNECTION.disconnect();

    if (rows && rows.length > 0) {
      const buldings: BuildingDto[] = rows.map((row:any) => {
        return new BuildingDto(row);
      });
      return buldings;
    }
    else {
      return [];
    }
  }
}