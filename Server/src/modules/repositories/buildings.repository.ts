import { IdbServices } from "../../shared/infra/db/Idb.services";
import MysqlDbServices from "../../shared/infra/db/mysql/mysqlDB.services";
import { BuildingDto } from "../dtos/building.dto";

export class BuildingsRepository {

  private static readonly CONNECTION: IdbServices = new MysqlDbServices();

  public static async getAll(): Promise<BuildingDto[]> {

    const sql = `SELECT * FROM tbBuildings order by buildingName;`;
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

  public static async getById(id: string): Promise<BuildingDto | null> {
    const sql = `SELECT * FROM tbBuildings 
                  WHERE buildingId = ?;`;
    const bindParams = [id];

    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();

    if (rows[0]) {
      return new BuildingDto({...rows[0], buildingId: id});
    } else {
      return null;
    }
  }
}