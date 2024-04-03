import { IdbServices } from "../../shared/infra/db/Idb.services";
import MysqlDbServices from "../../shared/infra/db/mysql/mysqlDB.services";
import { FacilityDto } from "../dtos/facility.dto";
import { FacilityAssetDto } from "../dtos/facilityAsset.dto";
import { FacilityTypeDto } from "../dtos/facilityType.dto";

export class FacilitiesRepository {

  private static readonly CONNECTION: IdbServices = new MysqlDbServices();

  public static async getAll(buildingId? : string, facilityTypeId? : string): Promise<FacilityDto[]> {

    let sql = `SELECT * FROM tbFacilities f`;
    const bindParams = [];

    if (buildingId && facilityTypeId) {
      sql += ` WHERE f.buildingId = ? AND f.facilityTypeId = ?`;
      bindParams.push(buildingId, facilityTypeId);
    } else if (buildingId) {
      sql += ` WHERE f.buildingId = ?`;
      bindParams.push(buildingId);
    } else if (facilityTypeId) {
      sql += ` WHERE f.facilityTypeId = ?`;
      bindParams.push(facilityTypeId);
    }

    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();

    if (rows && rows.length > 0) {
      const facilities: FacilityDto[] = rows.map((row: any) => {
        return new FacilityDto(row, row.facilityId)
      });
      return facilities;
    }
    else {
      return [];
    }
  }

  public static async getById(id: string): Promise<FacilityDto | null> {

    const sql = `SELECT * FROM tbFacilities WHERE facilityId = ?;`;
    const bindParams = [id];

    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();

    if (rows[0]) {
      return new FacilityDto(rows[0], id);
    }
    else {
      return null; 
    }
  }

  public static async create(facility: FacilityDto): Promise<void> {
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
      new Date(),
      new Date()
    ];

    await this.CONNECTION.connect();
    await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();
  }

  public static async update(facility: FacilityDto): Promise<void> {
    const sql = `UPDATE tbFacilities SET
                  buildingId = ?,
                  facilityTypeId = ?, 
                  isActive = ?,
                  facilityName = ?,
                  capacity = ?,
                  note = ?,
                  updatedDate = ?
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

  public static async getAllTypes(): Promise<FacilityTypeDto[]> {

    const sql = `SELECT * FROM tbFacilityTypes;`;
    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.execute(sql);
    await this.CONNECTION.disconnect

    if (rows && rows.length > 0) {
      const facilityTypes: FacilityTypeDto[] = rows.map((row: any) => {
        return new FacilityTypeDto(row)
      });
      return facilityTypes;   
    }
    else {
      return [];
    }
  }

  public static async getAllFacilityAssets(facilityId: string): Promise<FacilityAssetDto[]> {

    const sql = `SELECT fa.*, a.assetDescription  
                  FROM tbFacilityAssets fa
                  INNER JOIN tbassets a ON a.assetId = fa.assetId
                  WHERE fa.facilityId = ?;`;
    const bindParams = [facilityId];

    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();

    if (rows && rows.length > 0) {
      const facilityAssets: FacilityAssetDto[] = rows.map((row: any) => {
        return new FacilityAssetDto(row, facilityId)
      });
      return facilityAssets;
    }
    else {
      return [];
    }
  }

  public static async getFacilityAssetByIds(facilityId: string, assetId: string): Promise<FacilityAssetDto | null> {

    const sql = `SELECT fa.*, a.assetDescription  
                  FROM tbFacilityAssets fa
                  INNER JOIN tbassets a ON a.assetId = fa.assetId
                  WHERE fa.facilityId = ? AND fa.assetId = ?;`;
    const bindParams = [facilityId, assetId];

    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();

    if (rows[0]) {
      return new FacilityAssetDto(rows[0], facilityId);
    }
    else {
      return null;
    }
  }

  public static async createFacilityAsset(facilityAsset: FacilityAssetDto): Promise<void> {
    const sql = `INSERT INTO tbFacilityAssets (
                  facilityId,
                  assetId, 
                  quantity, 
                  updatedDate, 
                  createdDate)
                VALUES (?, ?, ?, ?, ?);`;
    const bindParams = [
      facilityAsset.facilityId,
      facilityAsset.assetId,
      facilityAsset.quantity,
      new Date(),
      new Date()
    ];

    await this.CONNECTION.connect();
    await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();
  }

  public static async updateFacilityAsset(facilityAsset: FacilityAssetDto): Promise<void> {
    const sql = `UPDATE tbFacilityAssets SET
                  quantity = ?,
                  updatedDate = ?
                 WHERE facilityId = ? AND assetId = ?;`;

    const bindParams = [
      facilityAsset.quantity,
      new Date(),
      facilityAsset.facilityId,
      facilityAsset.assetId
    ];

    await this.CONNECTION.connect();
    await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();
  }
}
