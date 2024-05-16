import { IdbServices } from "../../shared/infra/db/Idb.services";
import MysqlDbServices from "../../shared/infra/db/mysql/mysqlDB.services";
import { UserDto } from "../dtos/user.dto";

export class UsersRepository {

  private static readonly CONNECTION: IdbServices = new MysqlDbServices();

  public static async getAll(): Promise<UserDto[]> {

    const sql = `SELECT u.*
                  FROM tbUsers u`;
    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.execute(sql);
    await this.CONNECTION.disconnect();

    if (rows && rows.length > 0) {
      const users: UserDto[] = rows.map((row: any) => {
        return new UserDto(row, row.userId)
      });
      return users;   
    }
    else {
      return [];
    }
  }

  public static async getUserSchoolName(user: UserDto): Promise<string | null> {
    const sql = `SELECT s.nameSchool 
                  FROM tbUsers u 
                  INNER JOIN tbSchools s ON s.schoolId = ?`;
    const bindParams = [user.schoolId];

    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();

    if (rows && rows.length > 0) {
      return rows[0].nameSchool;
    } else {
      return null;
    }
  }

  public static async getById(id: string): Promise<UserDto | null> {
    const sql = `SELECT * 
                  FROM tbUsers 
                  WHERE userId = ?`;
    const bindParams = [id];

    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();

    if (rows[0]) {
      return new UserDto(rows[0], rows[0].userId);
    }
    else {
      return null;
    }
  }

  public static async signIn(email: string, password: string): Promise<UserDto | null> {
    const sql = `SELECT * FROM tbUsers 
                  WHERE email = ? AND password = ?`;
    const bindParams = [email, password];

    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();

    if (rows[0]) {
      return new UserDto(rows[0], rows[0].userId);
    }
    else {
      return null;
    }
  }
  public static async getByEmail(email: string): Promise<UserDto | null> {
    const sql = `SELECT * FROM tbUsers 
                  WHERE email = ?`;
    const bindParams = [email];

    await this.CONNECTION.connect();
    const rows = await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();

    if (rows[0]) { 
      return new UserDto(rows[0]);
    }
    else {
      return null;
    }
  }

  public static async create(user: UserDto): Promise<void> {
    const sql = `INSERT INTO tbUsers (
                  userId, 
                  schoolId, 
                  email, 
                  password, 
                  userName, 
                  userType, 
                  isActive, 
                  createdDate, 
                  updatedDate)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const bindParams = [
      user.userId,
      user.schoolId,
      user.email,
      user.password,
      user.userName,
      user.userType,
      user.isActive,
      new Date().getTime(),
      new Date().getTime()
    ];

    await this.CONNECTION.connect();
    await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();
  }

  public static async update(user: UserDto): Promise<void> {
    const sql = `UPDATE tbUsers SET  
                  schoolId = ?,
                  isActive = ?, 
                  userType = ?, 
                  updatedDate = ?
                 WHERE userId = ?`;

    const bindParams = [
      user.schoolId, 
      user.isActive, 
      user.userType, 
      new Date().getTime(), 
      user.userId
    ];

    await this.CONNECTION.connect();
    await this.CONNECTION.executeWithParams(sql, bindParams);
    await this.CONNECTION.disconnect();
  }
}