import { IdbServices } from "../../shared/infra/db/Idb.services";
import MysqlDbServices from "../../shared/infra/db/mysql/mysqlDB.services";
import { Facility } from "../entities/facility.entity";
import { FacilityType } from "../entities/facilityType.entity";

export class FacilitiesRepository {

  private static readonly CONNECTION: IdbServices = new MysqlDbServices();

  public static async getAll(): Promise<Facility[]> {

    const sql = `SELECT * FROM tbFacilities;`;
    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.execute(sql);
    await this.CONNECTION.disconnect();

    if (rows && rows.length > 0) {
      return rows as Facility[];
    }
    else {
      return [];
    }
  }

  public static async getById(id: string): Promise<Facility | null> {

    const sql = `SELECT * FROM tbFacilities WHERE facilityId = ?;`;
    const bindParams = [id];

    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();

    if (rows[0]) {
      return rows[0] as Facility;
    }
    else {
      return null;
    }
  }

  public static async create(facility: Facility): Promise<void> {
    const sql = `INSERT INTO tbFacilities (
                  facilityId,
                  buildingId, 
                  facilityTypeId, 
                  isActive, 
                  facilityName, 
                  capacity, 
                  note, 
                  updatedDate, 
                  createdDate)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const bindParams = [
      facility.facilityId,
      facility.buildingId,
      facility.facilityTypeId,
      facility.isActive,
      facility.facilityName,
      facility.capacity,
      facility.note,
      facility.updatedDate,
      facility.createdDate
    ];

    await this.CONNECTION.connect();
    await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();
  }

  public static async update(facility: Facility): Promise<void> {
    const sql = `UPDATE tbFacilities SET
                  buildingId = ?,
                  facilityTypeId = ?, 
                  isActive = ?,
                  facilityName = ?,
                  capacity = ?,
                  note = ?,
                  updatedDate = ?,
                 WHERE facilityId = ?;`;

    const bindParams = [
      facility.buildingId,
      facility.facilityTypeId,
      facility.isActive,
      facility.facilityName,
      facility.capacity,
      facility.note,
      new Date(),
      facility.facilityId
    ];

    await this.CONNECTION.connect();
    await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();
  }

  public static async getAllTypes(): Promise<FacilityType[]> {

    const sql = `SELECT * FROM tbFacilityTypes;`;
    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.execute(sql);
    await this.CONNECTION.disconnect

    if (rows && rows.length > 0) {
      return rows as FacilityType[];      
    }
    else {
      return [];
    }
  }
}
