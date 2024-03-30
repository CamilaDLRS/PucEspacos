import { IdbServices } from "../../shared/infra/db/Idb.services";
import MysqlDbServices from "../../shared/infra/db/mysql/mysqlDB.services";
import { FacilityType } from "../entities/facilityType.entity";

export class FacilityTypesRepository {

  private static readonly CONNECTION: IdbServices = new MysqlDbServices();

  public static async getAll(): Promise<FacilityType[]> {

    const sql = `SELECT * FROM tb_tipos_espaco;`;
    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.execute(sql);
    await this.CONNECTION.disconnect

    if (rows && rows.length > 0) {
      const facilities: FacilityType[] = rows.map((row: any) => {
        return FacilityType.fromDataRow(row);
      });
      return facilities;
    }
    else {
      return [];
    }
  }

}