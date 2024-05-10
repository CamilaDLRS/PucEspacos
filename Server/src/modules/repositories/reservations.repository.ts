import { IdbServices } from "../../shared/infra/db/Idb.services";
import MysqlDbServices from "../../shared/infra/db/mysql/mysqlDB.services";
import { ReservationDto } from "../dtos/reservation/reservation.dto";
import { ReservationQueryOptionsDto } from "../dtos/reservation/reservationOptions.dto";

export class ReservationsRepository {

  private static readonly CONNECTION: IdbServices = new MysqlDbServices();

  public static async getAll(options: ReservationQueryOptionsDto): Promise<ReservationDto[]> {
    
  const conditions = [];
  const bindParams = [];

  if (options.requestingUserId) {
      conditions.push('r.requestingUserId = ?');
      bindParams.push(options.requestingUserId);
  }
  if (options.reservationStatus) {
      conditions.push('r.reservationStatus = ?');
      bindParams.push(options.reservationStatus);
  }
  if (options.buildingId) {
      conditions.push('b.buildingId = ?');
      bindParams.push(options.buildingId);
  }
  if (options.checkinDate) {
      conditions.push('DATE(r.checkinDate) >= ?');
      bindParams.push(options.checkinDate);
  }
  if (options.checkoutDate) {
      conditions.push('DATE(r.checkoutDate) <= ?');
      bindParams.push(options.checkoutDate);
  }
  if (options.facilityIds && options.facilityIds.length > 0) {
      conditions.push(`r.facilityId IN (${options.facilityIds.map(() => '?').join(',')})`);
      bindParams.push(...options.facilityIds);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const sql = `
      SELECT 
          r.*, 
          ureq.userName AS 'requestingUserName', 
          uresp.userName AS 'responsibleUserName', 
          f.facilityName, 
          b.buildingName 
      FROM 
          tbReservations r
          INNER JOIN tbUsers ureq ON r.requestingUserId = ureq.userId
          INNER JOIN tbUsers uresp ON r.responsibleUserId = uresp.userId
          INNER JOIN tbFacilities f ON r.facilityId = f.facilityId
          INNER JOIN tbBuildings b ON f.buildingId = b.buildingId
      ${whereClause};`;

    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();

    if (rows && rows.length > 0) {
      const facilities: ReservationDto[] = rows.map((row: any) => {
        return new ReservationDto(row);
      });
      return facilities;
    } else {
      return [];
    }
  }

  public static async getById(id: string): Promise<ReservationDto | null> {
    const sql = `SELECT * FROM tbReservations 
                  WHERE reservationId = ?;`;
    const bindParams = [id];

    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();

    if (rows[0]) {
      return new ReservationDto(rows[0]);
    } else {
      return null;
    }
  }

  public static async create(reservation: ReservationDto): Promise<void> {
    const sql = `INSERT INTO tbReservations (
                  reservationId,
                  requestingUserId, 
                  responsibleUserId, 
                  facilityId, 
                  reservationStatus, 
                  reservationPurpose, 
                  checkinDate, 
                  checkoutDate,
                  updatedDate, 
                  createdDate)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const bindParams = [
      reservation.facilityId,
      reservation.requestingUserId,
      reservation.responsibleUserId,
      reservation.facilityId,
      reservation.reservationStatus,
      reservation.reservationPurpose,
      reservation.checkinDate,
      reservation.checkoutDate,
      new Date(),
      new Date()
    ];

    await this.CONNECTION.connect();
    await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();
  }

  public static async update(reservation: ReservationDto): Promise<void> {
    const sql = `UPDATE tbReservations SET
                  reservationPurpose = ?,
                  checkinDate = ?, 
                  checkoutDate = ?,
                  updatedDate = ?
                 WHERE reservationId = ?;`;

    const bindParams = [
      reservation.reservationPurpose,
      reservation.checkinDate,
      reservation.checkoutDate,
      reservation.updatedDate,
      new Date(),
      reservation.reservationId
    ];

    await this.CONNECTION.connect();
    await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();
  }

  public static async delete(id: string): Promise<void> {
    const sql = `DELETE SET tbReservations
                 WHERE reservationId = ?;`;

    const bindParams = [id];

    await this.CONNECTION.connect();
    await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();
  }
}