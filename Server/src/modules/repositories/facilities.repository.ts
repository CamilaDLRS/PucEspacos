import { IdbServices } from "../../shared/infra/db/Idb.services";
import MysqlDbServices from "../../shared/infra/db/mysql/mysqlDB.services";
import { FacilityDto } from "../dtos/facility/facility.dto";
import { FacilityAssetDto } from "../dtos/facility/facilityAsset.dto";
import { FacilityAvailabilityQuery } from "../dtos/facility/facilityAvailabilityQuery.dto";
import { FacilityTypeDto } from "../dtos/facility/facilityType.dto";

export class FacilitiesRepository {
  private static readonly CONNECTION: IdbServices = new MysqlDbServices();

  private static readonly selectQuery = `SELECT f.*, t.facilityTypeDescription, b.buildingName  
  FROM tbFacilities f
  INNER JOIN tbBuildings b ON b.buildingId = f.buildingId
  INNER JOIN tbFacilityTypes t ON t.facilityTypeId = f.facilityTypeId`;

  public static async getAll(buildingId: string | null, facilityTypeId: string | null, minimumCapacity: number | null): Promise<FacilityDto[]> {
    
    const conditions = [];
    const bindParams = [];

    if (buildingId) {
      conditions.push("f.buildingId = ?");
      bindParams.push(buildingId);
    }
    if (facilityTypeId) {
      conditions.push("f.facilityTypeId = ?");
      bindParams.push(facilityTypeId);
    }
    if (minimumCapacity) {
      conditions.push("f.capacity >= ?");
      bindParams.push(minimumCapacity);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const sql = `${this.selectQuery} ${whereClause};`;

    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();

    if (rows && rows.length > 0) {
      const facilities: FacilityDto[] = rows.map((row: any) => {
        return new FacilityDto(row, row.facilityId);
      });
      return facilities;
    } else {
      return [];
    }
  }

  public static async getById(id: string): Promise<FacilityDto | null> {
    const sql = `${this.selectQuery} WHERE f.facilityId = ?;`;
    const bindParams = [id];

    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();

    if (rows[0]) {
      return new FacilityDto(rows[0], id);
    } else {
      return null;
    }
  }

  public static async getAllByBuilding(buildingId: string): Promise<FacilityDto[]> {
    const sql = ` ${this.selectQuery} WHERE f.buildingId = ?;`;
    const bindParams = [buildingId];

    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();

    if (rows && rows.length > 0) {
      const facilities: FacilityDto[] = rows.map((row: any) => {
        return new FacilityDto(row, row.facilityId);
      });
      return facilities;
    } else {
      return [];
    }
  }

  public static async getAvailables(query: FacilityAvailabilityQuery): Promise<FacilityDto[]> {
    
    let bindParams: any = [];
    let sqlCapacity = '';
    
    if (query.minimumCapacity) {
      sqlCapacity = ' f.capacity >= ? AND ';
      bindParams.push(query.minimumCapacity);
    };

    let sql = ` SELECT DISTINCT  
                    f.*, 
                    t.facilityTypeDescription, 
                    b.buildingName
                FROM 
                    tbreservations r
                    INNER JOIN tbFacilities f ON r.facilityId = f.facilityId
                    INNER JOIN tbBuildings b ON f.buildingId = b.buildingId
                    INNER JOIN tbFacilityTypes t ON t.facilityTypeId = f.facilityTypeId
                WHERE 
                    !(
                      ${sqlCapacity}
                      r.checkinDate >= ? AND 
                      r.checkoutDate <= ? AND 
                      f.facilityTypeId = ? AND
                      f.buildingId = ?
                    ) AND
                    ${sqlCapacity}
                    f.facilityTypeId = ? AND
                    f.buildingId = ?
                `;
                      
    bindParams.push(query.checkinDate);
    bindParams.push(query.checkoutDate);
    bindParams.push(query.facilityTypeId);
    bindParams.push(query.buildingId);
    if (query.minimumCapacity) {
      bindParams.push(query.minimumCapacity);
    }
    bindParams.push(query.facilityTypeId);
    bindParams.push(query.buildingId);

    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();

    if (rows && rows.length > 0) {
      const facilities: FacilityDto[] = rows.map((row: any) => {
        return new FacilityDto(row, row.facilityId);
      });
      return facilities;
    } else {
      return [];
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
      new Date().getTime(),
      new Date().getTime(),
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
      new Date().getTime(),
      facility.facilityId,
    ];

    await this.CONNECTION.connect();
    await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();
  }

  public static async getAllTypes(): Promise<FacilityTypeDto[]> {
    const sql = `SELECT * FROM tbFacilityTypes order by facilityTypeDescription;`;
    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.execute(sql);
    await this.CONNECTION.disconnect;

    if (rows && rows.length > 0) {
      const facilityTypes: FacilityTypeDto[] = rows.map((row: any) => {
        return new FacilityTypeDto(row);
      });
      return facilityTypes;
    } else {
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
        return new FacilityAssetDto(row, facilityId);
      });
      return facilityAssets;
    } else {
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
    } else {
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
      new Date().getTime(),
      new Date().getTime(),
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
      new Date().getTime(),
      facilityAsset.facilityId,
      facilityAsset.assetId,
    ];

    await this.CONNECTION.connect();
    await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();
  }

  public static async deleteFacilityAsset(facilityId: string, assetId: string): Promise<void> {
    const sql = `DELETE FROM tbFacilityAssets
                 WHERE facilityId = ? AND assetId = ?;`;

    const bindParams = [
      facilityId,
      assetId,
    ];

    await this.CONNECTION.connect();
    await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();
  }
}